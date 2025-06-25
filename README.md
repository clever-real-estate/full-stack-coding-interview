# Clever's Fullstack Coding Interview

👋 Hello!, Hola!, Witam!

Thank you for taking the time to interview with Clever. This coding challenge is meant to be an exercise to see how you code throughout the stack. We don't want this to take too much of your time (and if does, certainly let us know!).

### Requirements

- Create a small web app to display photos and details about the photos.
- For the back end, you're open to use whatever framework & language you feel most comfortable with.
- For the front end, although we'd like to see a small react app that interfaces with an API from the backend, if this ends up taking too much time, we are open to other options.
- However, please use either `npm` or `yarn` for any front end package management.

#### Product requirements

- Make the "Sign in" page functional.
- Make "All photos" require authentication to access.
- Only need to show 10 photos on the "All photos" page. Paging is not required.
- The authenticated user should be able to like a photo and have that like persisted to the database.
- If pages are mobile responsive, thats a plus!

### Details

- We've provided a CSV with each row representing a photo & it's details. We'd like these to be the photos (and their details) we show on the front end of the app.
- We want to keep this an open ended challenge, so take a look at the attached Figma mocks and add data models to the back end as you see fit. Use the attached CSV for the data.
- Mocks for these pages are provided in [Figma](https://www.figma.com/file/wr1seCuhlRtoFGuz1iWgyF/Frontend-Coding-Mocks?type=design&node-id=0%3A1&mode=design&t=Uw1av3TypDUDcLAd-1). If you have any issues accessing, or aren't familiar with how to use Figma, just let us know.
- There is also a logo and an icon provided (SVGs) included in this repo.

### Final Thoughts

- You can fork this repo and commit your code there. Please open a PR from the fork _back_ to the main repo, and once done, please add the following users as members so we can review:
  - James Crain (@imjamescrain)
  - Jimmy Lien (@jlien)
  - Nick Clucas (@nickcluc)
  - Ryan McCue (@rymccue)
- If you do find yourself spending too much time on the exercise itself, let us know what next steps you would take in a README file.
- We'll circle back with you and review 1:1.

**Any questions**, just let us know. Send emails to <a href="mailto:nick.clucas@movewithclever.com">nick.clucas@movewithclever.com</a>. Good luck!

---

Hello, this is my submission for the tech code challenge.
**Backend:** Built with Django and Django REST Framework
**Frontend:** Built with Next.js (App Router and TypeScript)

The .env files (for both frontend and backend) were sent via email.

The entire project is deployed and accessible at:
https://full-stack-coding-interview.vercel.app/

**Accounts you can use:**

login: nick.clucas@movewithclever.com
password: 123456

login: lucascvarani@gmail.com
password: 123456

The backend is hosted on **Render.com**
The frontend is hosted on **Vercel**
Note: Both services are running on **free-tier plans**, so after a period of inactivity, the first request may take up to 60 seconds to respond due to cold starts.

**To run the backend (Django) locally:**

1. Go to the clever_backend folder
2. (Optional) Create and activate a virtual environment
3. Install dependencies with pip install -r requirements.txt
4. Run python manage.py migrate to apply database migrations
5. (Optional) Run python manage.py createsuperuser to create an admin user
6. Start the server with python manage.py runserver

**To run the frontend (Next.js) locally:**

1. Go to the clever_frontend folder
2. Run npm install to install dependencies
3. Run npm run dev to start the development server

Let me know if you have any questions or need further clarification.
