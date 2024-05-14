# Clever Real Estate Coding Challenge

This is the Django/DRF + React coding challenge for Clever Real Estate.

## Running the app locally

### Django/DRF Backend

To run the Django app on your computer, set up a Python development environment.

Create an isolated Python environment, and install dependencies:

LINUX/MACOS
```
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```
WINDOWS
```
virtualenv env
env\scripts\activate
pip install -r requirements.txt
```

Run migrations to set up your models:
`python manage.py migrate`

If `python` command is not working, try `python3` instead.

Use this custom command to create a test user and populate the database with some data:

`python manage.py import_photos_from_csv photos.csv test`

This command will create a user with username `test`, email `test@test.com`
and password `testing123` and populate the database with the data from the `photos.csv`
file, that should be in the root of the project.

If you want to create another users with data, the behavior is the same, just change the username
and the suffix of the email and the password will be the same.

For example: `python manage.py import_photos_from_csv photos.csv myuser`
will create a user with username `myuser`, email `myuser@test.com` and password `testing123`.

If you have already created a user with the API or via frontend, you can use this command
to add photos to this user as well, just replace the username with the one you want created.


Now, you can already run the server
`python manage.py runserver`
and access http://localhost:8000

and play with the [DRF API]().

### Running tests:
Users:
`python manage.py test users.tests`

Photos:
`python manage.py test photos.tests`

### React Frontend

Go to the `frontend` directory and install the dependencies:
`npm install`

Now you can run the frontend app:
`npm start`

The frontend app will be running on http://127.0.0.1:3000

Be sure to use the frontend with 127.0.0.1 and not localhost, because
the cookie session id is set to 127.0.0.1.

Now you can access the frontend and play with the app:
- You can login with the user created by the custom command
- You can register a new user with the register form
- You can create the user in the frontend and then use the custom command to add photos to this user


## Overall Explanations

### Auth
There's a custom user model, and custom validation.
The auth is done with session authentication. A session is
created and stored as a cookie, and its destroyed when the user logs out.
On the frontend, we have to grab this cookie session with `js-cookie`.

### Models/tables relationship and approach
The best way I thought about the models relationships is that each 
`AppUser` can have multiple `Photo`, and a `Photo` can also be owned by multiple users.
This way, we do not have to create extra identical rows for equal 
photos that belong to different users, which would be basically duplicated data.
So a `ManyToMany` relationship solved that, and we could use the same photo for different users,
and maintain its unique big integer id (given the csv file).

That solved the problem for duplicate photos for different users, but created another problem,
because if we want to reuse the Photo, and one user liked that photo(which is unique),
other user that also has that photo would see the photo as liked, even though he didn't like that photo.
So for that, I'm using an intermediate table, model called `UserPhoto` that just stores User and Photo
ids, and if it is liked or not.

This way, we can have unique photos, and even if different users are loading the same photo,
one liked, the other didn't, they will see and load the same photo, but the user
that liked, will see the gold liked star, and for the same photo, the user that didn't, will not.

Also, each `Photo` model has a foreign key to a `Photographer`. So one photographer
can have multiple photos, but a photo can only be from one photographer.


### Frontend
The frontend is a React app that uses the `axios` library to make requests to the backend.
It uses `react-router-dom` to handle the routes, and `react-bootstrap` for the components
and `js-cookie` to handle the cookie session.
The app is divided into components, and the main components are:
- `App` - the main component that handles the routes
- `Photos` - the component that shows the photo details

## For the future...

Things I'd like to do if I had more time:
- Dockerize the app
- Add more backend tests and cover all edge cases
- Add frontend tests
- Make use of all the info and display images in a bigger/nicer way
- Add forgot my password functionality
- Deploy to cloud
- Integrate CI/CD pipelines
- Add logging
- Use social auth methods (google and/or github)