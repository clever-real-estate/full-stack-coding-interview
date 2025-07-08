You are a software engineer with 20 years of experience. Write a PRD for the following project. Also create tasks, sub-tasks and plan the architecture that will be used for the long term in the docs folder.

### Requirements
- Create a small web app to display photos and details about the photos.
- For the back end, we primarily use Django.
- For the front end, use Next.JS.
- However, please use `npm` for any front end package management.
- Feel free to use MCPs to get the work done.

#### Product requirements
- Page designs consist of the Sign in and All photos pages.
- Make the "Sign in" page functional.
- Make "All photos" require authentication to access.
- Only need to show 10 photos on the "All photos" page per page. Implement paging.
- The authenticated user should be able to like a photo and have that like persisted to the database.
- Pages are mobile responsive

### Details
- We've provided a CSV (photos.csv) with each row representing a photo & it's details. We'd like these to be the photos (and their details) we show on the front end of the app.
- Take a look at the attached Figma mocks and add data models to the back end as you see fit. Use the attached CSV for the data. Use supabase and supabase MCP for the database (PostgreSQL).
- Mocks for these pages are provided in [Figma](https://www.figma.com/file/wr1seCuhlRtoFGuz1iWgyF/Frontend-Coding-Mocks?type=design&node-id=0%3A1&mode=design&t=Uw1av3TypDUDcLAd-1). If you have any issues accessing, or aren't familiar with how to use Figma, just let us know before you proceed. Do not invent design.
- There is also a logo and an icon provided (SVGs) included in this repo.

### Final steps
- The above requirements are mandatory and need to be done first. The next steps are:
- Implementing SEO.
- Implement tests for each feature and guarantee everything is working correctly
- Implement security related features (for example, CORS in the backend).
- Review the code for vulnerabilities and fix if needed
- Review the code and database setup. Document possible improvements for the scalability of the system.