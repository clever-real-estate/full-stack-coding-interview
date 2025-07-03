## Running

```sh
uv run fastapi dev
```

### Migration

```sh
uv run alembic revision --autogenerate -m "<message>"

uv run alembic upgrade head
```

### Importing photos

```sh
uv run python -m app.utils.import_photos
```
