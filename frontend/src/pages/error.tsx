import { Link } from "react-router";
import { useTitle } from "react-use";

import { Button } from "../components/ui/button";

const ErrorPage = () => {
  useTitle("Page Not Found - 404");
  return (
    <main className="grid min-h-svh place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-primary text-base font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <p className="text-muted-text mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button asChild>
            <Link to={"/"} replace>
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
