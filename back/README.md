## Local development

#### Create a virtual env
```sh
uv venv
```
#### Active it
```sh
source activate...
```

#### Install dependencies
```sh
uv sync --frozen --no-install-project
```

### Run DB container
```sh
docker compose up
```

#### Run Migrations
```sh
uv run alembic upgrade head
```

#### Import photos
```sh
uv run python -m app.utils.import_photos
```

#### Running the App
```sh
uv run fastapi dev
```

#### Testing
```sh
uv run -m pytest tests
```

## How to

#### Build docker image
```sh
docker build -t <image-name>:<image-version> <path--to-docker-file>

docker build -t clever-photos-api:v0 .
```

#### Run image
```sh
docker run -p 8000:8000 --env-file .env.example clever-photos-api:v0
```

#### Create Migration
```sh
uv run alembic revision --autogenerate -m "<message>"
```
