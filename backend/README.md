## Clever Photos backend

#### How to run

1. Initialize a new python3 enviroment with virtualenv

```
python3 -m venv venv
```

2. Activate this virtualenv

```
source venv/bin/activate
```

3. With the virtual enviroment enabled, install the dependencies

```
pip install -r requirements.txt
```

4. Run the Django migrations to create the database

```
python manage.py migrate
```

5. Load the sample data

```
python manage.py loadphotos
python manage.py createuser
```

The first command will load all the photos from the csv file adding it to the database. The default image will be downloaded and added to the model and all the other sizes such as medium, large, or small will be generated latter.

The second command will create a new user with the credentials:
username: **clever**
password: **clever**

6. And finally run the backend

```
python manage.py runserver
```

7. Optionaly you can run the tests just typing

```
pytest
```

#### Available endipoints

| Endpoint          | Protocol | Description                                            |
| ----------------- | -------- | ------------------------------------------------------ |
| /api/photos/      | GET      | Return the list of photos if the user is authenticated |
| /api/photos/like/ | POST     | Allow the authenticated user to like a photo           |
| /api/auth/token/  | POST     | Allow user authentication returning a JWT token        |
