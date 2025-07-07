# CleverPhotos

This is a simple photo gallery application built with React, TypeScript, and Vite. It allows users to sign in, view a list of photos, and log out.

## Features

- **User Authentication:** Users can sign in to their accounts to access the photo gallery.
- **Photo Gallery:** Once signed in, users can view a list of all photos.
- **Like Photos:** Users can like and unlike photos.
- **Download Photos:** Users can download photos in various sizes.
- **Photographer Portfolio:** Users can visit the photographer's portfolio website.
- **Logout:** Users can log out of their accounts.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Routing:** React Router
- **Data Fetching:** React Query
- **Styling:** Tailwind CSS

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maaut/full-stack-coding-interview.git
   ```
2. **Install dependencies:**
   ```bash
   cd clever-photos
   yarn install
   ```
3. **Create a `.env` file:**
   Create a `.env` file in the root of the project and add the following environment variable:
   ```
   VITE_API_URL=your_api_url
   ```
   Replace `your_api_url` with the actual URL of your API.
4. **Start the development server:**
   ```bash
   yarn dev
   ```

This will start the development server at `http://localhost:5173`.

## Available Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn lint`: Lints the codebase for errors.
- `yarn preview`: Serves the production build locally.
