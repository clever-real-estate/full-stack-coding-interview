# Photo Gallery Frontend

A Next.js 15 application with TypeScript and Tailwind CSS for browsing and interacting with photos.

## Features

- 🔐 User authentication with JWT tokens
- 📱 Responsive photo gallery with pagination
- ❤️ Like/unlike functionality
- 🎨 Modern UI with Tailwind CSS
- 🔒 Input validation and sanitization
- ♿ Accessibility features

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── signin/             # Sign-in page
│   └── gallery/            # Photo gallery page
├── components/             # Reusable UI components
│   ├── auth/
│   ├── gallery/
│   └── shared/
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
└── types/                  # TypeScript definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **DOMPurify** - XSS protection

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Photo Gallery
NEXT_PUBLIC_APP_VERSION=1.0.0
```
