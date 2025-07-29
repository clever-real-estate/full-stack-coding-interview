import subprocess
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings


class Command(BaseCommand):
    help = 'Generate RSA private and public key pair (simple version)'
    
    def handle(self, *args, **options):
        # Create certs directory
        certs_dir = Path(settings.BASE_DIR) / 'certs'
        certs_dir.mkdir(exist_ok=True)
        
        private_key = certs_dir / 'private.pem'
        public_key = certs_dir / 'public.pem'
        
        try:
            # Generate private key
            subprocess.run([
                'openssl', 'genpkey', 
                '-algorithm', 'RSA',
                '-out', str(private_key),
                '-pkeyopt', 'rsa_keygen_bits:2048'
            ], check=True)
            
            # Generate public key
            subprocess.run([
                'openssl', 'rsa',
                '-pubout',
                '-in', str(private_key),
                '-out', str(public_key)
            ], check=True)
            
            self.stdout.write(
                self.style.SUCCESS(f'Keys generated successfully!')
            )
            self.stdout.write(f'Private key: {private_key}')
            self.stdout.write(f'Public key: {public_key}')
            
        except subprocess.CalledProcessError as e:
            raise CommandError(f'OpenSSL command failed: {e}')
        except FileNotFoundError:
            raise CommandError('OpenSSL not found. Please install OpenSSL.')
