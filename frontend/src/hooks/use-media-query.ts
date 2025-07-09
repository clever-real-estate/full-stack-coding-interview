import { useEffect, useState } from "react";

/**
 * Custom hook to check if a media query matches.
 *
 * @param query - The media query string to match against.
 * @returns A boolean indicating whether the media query matches.
 */
export const useMediaQuery = (query: string) => {
  //Initial state is false, meaning the query does not match
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      // Update the state when the media query matches
      setValue(event.matches);
    };
    // Call matchMedia with the provided query
    const result = matchMedia(query);
    // Set the initial value based on the current match
    result.addEventListener("change", onChange);
    // Set the initial value based on the current match
    setValue(result.matches);
    // Cleanup the event listener on unmount
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
};
