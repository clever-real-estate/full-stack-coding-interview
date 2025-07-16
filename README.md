# Rodrigo's notes

When doing the initial fork, I used the "use this template" option
instead of forking, so now I have to copy everything at once. This is what the commit history looked like before:
<img width="873" height="246" alt="image" src="https://github.com/user-attachments/assets/ce693329-ecf4-49c5-a578-d815689ef5d4" />


## About the app

Despite demanding more time to implement, I believe that kind of take-home exercise is indeed a good reflection of day-to-day work. Of course, there are some things that I would do differently if I had more time, but I believe I've implemented all the requirements. I've also spent some time trying to achieve an almost pixel-perfect reflection of the Figma mockups. I'm proud of the result for the most part. 

So, the app is a simple Rails app with a React frontend.

## Rails side

I've used the following commands to generate the app:

- App generated using `❯ rails new app --javascript=esbuild --css=tailwind --database=sqlite3`
- Authentication: `❯ rails generate authentication`

After that, just the basic setup. 

I've decided to have the BaseControllers ( session, users, application) in the `app/controllers` folder. Those are the ones that handle the login and return the base template. Photos and Likes are handled with a special `ApiController` that handles the  special authentication (there is a different fallback to just return 404 instead of redirecting to the login page) and returns just JSON responses.

In terms of Likes, I've created a Like model, and its controller has `like` and `unlike` actions. 
And the like counter is (smartly, I guess) implemented using the  native [counter_cache](https://api.rubyonrails.org/classes/ActiveRecord/CounterCache.html) module.

### Database

I've used sqlite3 for the database. I've created a `db/seeds.rb` file to populate the database with the data from the CSV file. It adds two test users and loads the photos from the csv file.

### Tests

I've used minitest for the test, for the simple reason that I've never used it before (just RSpec). There are just tests for the controllers since I believe the rest of the app is pretty straightforward.

## React side

On the React side, nothing too fancy. I've used react-query (I guess it is called tanstack query now) and tailwind. 

The like/unlike functionality is implemented using the `toggleLike` function in the `AllPhotos` component.

Using TypeScript for the frontend.

## UI 

As I mentioned, I've tried to get as close as possible to the Figma mockups. Pretty much just using tailwind classes with some really small customizations (like font-family and a few font sizes)

## How to run the app

- `asdf install`
- `bundle install`
- `bin/rails db:create`
- `bin/rails db:migrate`
- `bin/rails db:seed`
- `yarn install`
- `bin/dev`

The login page should have pre-filled credentials, and you can also check the `db/seeds.rb` file to see the users.

## Final thoughts

I've enjoyed implementing this exercise. There was not many new things for me, I guess just the new Rails version, and some things for its asset pipeline.

Let me know if we need to discuss anything else. Thanks!


# Clever's Fullstack Coding Interview
👋 Hello!, Hola!, Witam!

Thank you for taking the time to interview with Clever. This coding challenge is meant to be an exercise to see how you code throughout the stack. We don't want this to take too much of your time (and if does, certainly let us know!).

### Requirements
- Create a small web app to display photos and details about the photos.
- For the back end, we primarily use Django and Ruby on Rails, but you're welcome to use whatever Python or Ruby framework you're most familiar with.
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
