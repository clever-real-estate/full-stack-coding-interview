# DRF API

## Endpoints
### To register a new user, go to `localhost:8000/register/`

You can register a new user with this endpoint.
One payload example:

```json
{
    "username": "test8",
    "email": "test8@test.com",
    "password": "testing123"
}
```
Put that payload on content and click on `POST` button.
That will create a new user with the data you provided.


### Now you can login with the user you just created.
Go to the `localhost:8000/login/` endpoint and put the payload:
    
```json
{
    "email": "test8@test.com",
    "password": "testing123"
}
```
in the content and click on `POST` button.

You are now logged in and can access the other endpoints.
Also, you can go to dev tools on your browser->Application->Cookies and see the session id stored there.

### You can now go to`localhost:8000/photos/` to see the photos you have.
If you want to add some photos, you can go to the project root and run the command:
`python manage.py import_photos_from_csv photos.csv test8`

### You can logout with the `localhost:8000/logout/` endpoint.
Just click on the `POST` button with no payload.
Note that your session id will be removed from the cookies now.

