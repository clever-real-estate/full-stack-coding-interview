# VERSIONS
Docker Compose version v2.24.5-desktop.1
Docker version 25.0.3, build 4debf41
Python 3.10.0
Django 
Postgres 13

# INIT
- Clone the project
- Set an env with `python -m venv venv`. Initialize the env `source /venv/bin/activate`
- Install the dependencies `poetry install`
- Initialize the database on docker compose `docker compose up`
- Inside the database container `docker exec -it db psql postgres -U clever_user` 
- Inside the container,  create the database and give the user the right permissions to it: `CREATE DATABASE clever_db;` 
    - `GRANT ALL PRIVILEGES ON DATABASE clever_db TO clever_user;`
- Run migrations `poetry run python manage.py migrate`
- Run server `poetry run python manage.py runserver`