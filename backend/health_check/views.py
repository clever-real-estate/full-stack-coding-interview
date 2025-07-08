from django.conf import settings
from django.core.cache import cache
from django.db import connection
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import psutil
import shutil
import time
import logging


# Initialize logger
logger = logging.getLogger(__name__)
# Create your views here.


class HealthCheckView(APIView):
    """
    System Health Check API View

    Monitors critical system components:
    1. Database connectivity (MySQL)
    2. Redis cache connectivity
    3. Email configuration (SMTP)
    4. System resources (memory, disk)
    5. Django configuration validation

    Returns:
    - 200 OK: All systems healthy
    - 503 Service Unavailable: One or more systems failing

    Usage:
    GET /api/health/ - Public endpoint for monitoring
    """

    permission_classes = [permissions.AllowAny]  # Public endpoint for monitoring

    def get(self, request):
        """
        Perform comprehensive system health checks.

        Returns detailed status of all monitored components.
        """
        health_status = {
            "status": "healthy",
            "timestamp": time.time(),
            "version": "1.0.0",
            "checks": {},
        }

        overall_healthy = True

        # 1. Database Health Check
        try:
            start_time = time.time()
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()

            db_response_time = (time.time() - start_time) * 1000  # Convert to ms

            health_status["checks"]["database"] = {
                "status": "healthy",
                "response_time_ms": round(db_response_time, 2),
                "connection": "mysql",
                "message": "Database connection successful",
            }
        except Exception as e:
            health_status["checks"]["database"] = {
                "status": "unhealthy",
                "error": str(e),
                "message": "Database connection failed",
            }
            overall_healthy = False

        # 2. Redis Cache Health Check
        try:
            start_time = time.time()
            cache_key = "health_check_test"
            cache_value = "test_value"

            # Test cache write/read
            cache.set(cache_key, cache_value, timeout=60)
            retrieved_value = cache.get(cache_key)

            if retrieved_value == cache_value:
                cache_response_time = (time.time() - start_time) * 1000
                health_status["checks"]["redis"] = {
                    "status": "healthy",
                    "response_time_ms": round(cache_response_time, 2),
                    "message": "Redis cache read/write successful",
                }
                cache.delete(cache_key)  # Cleanup
            else:
                raise Exception("Cache read/write mismatch")

        except Exception as e:
            health_status["checks"]["redis"] = {
                "status": "unhealthy",
                "error": str(e),
                "message": "Redis cache connection failed",
            }
            overall_healthy = False

        # 3. Email Configuration Health Check
        try:
            # Check if required email settings are configured
            email_settings = {
                "host": getattr(settings, "EMAIL_HOST", None),
                "port": getattr(settings, "EMAIL_PORT", None),
                "use_tls": getattr(settings, "EMAIL_USE_TLS", False),
                "backend": getattr(settings, "EMAIL_BACKEND", None),
            }

            if email_settings["host"] and email_settings["port"]:
                health_status["checks"]["email"] = {
                    "status": "healthy",
                    "configuration": email_settings,
                    "message": "Email configuration valid",
                }
            else:
                raise Exception("Email host or port not configured")

        except Exception as e:
            health_status["checks"]["email"] = {
                "status": "unhealthy",
                "error": str(e),
                "message": "Email configuration invalid",
            }
            overall_healthy = False

        # 4. System Resources Health Check
        try:
            # Memory usage
            memory = psutil.virtual_memory()
            memory_usage_percent = memory.percent

            # Disk usage (for the current directory)
            disk_usage = shutil.disk_usage("/")
            disk_usage_percent = (disk_usage.used / disk_usage.total) * 100

            # Set thresholds
            memory_threshold = 95  # 95% memory usage
            disk_threshold = 85  # 85% disk usage

            resource_status = "healthy"
            warnings = []

            if memory_usage_percent > memory_threshold:
                resource_status = "warning"
                warnings.append(f"High memory usage: {memory_usage_percent}%")

            if disk_usage_percent > disk_threshold:
                resource_status = "warning"
                warnings.append(f"High disk usage: {disk_usage_percent}%")

            health_status["checks"]["system_resources"] = {
                "status": resource_status,
                "memory_usage_percent": round(memory_usage_percent, 2),
                "memory_available_gb": round(memory.available / (1024**3), 2),
                "disk_usage_percent": round(disk_usage_percent, 2),
                "disk_free_gb": round(disk_usage.free / (1024**3), 2),
                "warnings": warnings,
                "message": "System resources monitored",
            }

            if resource_status == "warning":
                logger.warning(f"System resource warnings: {warnings}")

        except Exception as e:
            health_status["checks"]["system_resources"] = {
                "status": "unhealthy",
                "error": str(e),
                "message": "System resource monitoring failed",
            }
            overall_healthy = False

        # 5. Django Configuration Health Check
        try:
            config_issues = []

            # Check critical settings
            if settings.DEBUG and hasattr(settings, "ALLOWED_HOSTS"):
                if "*" in settings.ALLOWED_HOSTS:
                    config_issues.append(
                        "DEBUG=True with ALLOWED_HOSTS=['*'] is insecure"
                    )

            if not getattr(settings, "SECRET_KEY", None):
                config_issues.append("SECRET_KEY not configured")

            if not getattr(settings, "DATABASES", None):
                config_issues.append("DATABASES not configured")

            config_status = "warning" if config_issues else "healthy"

            health_status["checks"]["django_config"] = {
                "status": config_status,
                "debug_mode": settings.DEBUG,
                "issues": config_issues,
                "message": "Django configuration validated",
            }

        except Exception as e:
            health_status["checks"]["django_config"] = {
                "status": "unhealthy",
                "error": str(e),
                "message": "Django configuration check failed",
            }
            overall_healthy = False

        # Set overall status
        if not overall_healthy:
            health_status["status"] = "unhealthy"
            status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        else:
            # Check for any warnings
            has_warnings = any(
                check.get("status") == "warning"
                for check in health_status["checks"].values()
            )
            if has_warnings:
                health_status["status"] = "healthy_with_warnings"

            status_code = status.HTTP_200_OK

        # Log health check results
        logger.info(f"Health check completed: {health_status['status']}")

        return Response(health_status, status=status_code)
