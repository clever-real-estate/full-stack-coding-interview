FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container.
COPY . .

# Install the application dependencies.
RUN uv sync --frozen --no-install-project

# Run the application.
CMD ["uv", "run", "fastapi", "run", "--workers", "4", "app/main.py"]
