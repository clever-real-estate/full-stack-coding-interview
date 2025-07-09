import { driver } from "driver.js";

export const photosTour = driver({
  showProgress: true,
  smoothScroll: true,
  allowClose: false,
  overlayColor: "var(--color-background)",
  disableActiveInteraction: true,
  overlayClickBehavior: "nextStep",
  steps: [
    {
      popover: {
        title: "Welcome to Clever Photo Gallery 📸",
        description: "This is where you can view, organize, and manage all your photos.",
      },
    },
    {
      element: '[data-tooltip-id^="like-tooltip-"]',
      popover: {
        title: "Like Photos",
        description: "Click here to like your favorite photos. You can unlike them later!",
        side: "bottom",
      },
    },
    {
      element: '[data-tooltip-id^="view-photo-details-tooltip-"]',
      popover: {
        title: "View Photo Details",
        description: "Click here to view the details of this photo.",
      },
    },
    {
      element: '[data-tooltip-id^="copy-avg-color-tooltip-"]',
      popover: {
        title: "Copy Average Color",
        description: "Click here to copy the average color of this photo.",
      },
    },
    {
      element: '[data-tooltip-id^="view-photographer-profile-tooltip-"]',
      popover: {
        title: "View Photographer Profile",
        description: "Click here to view the profile of the photographer.",
      },
    },
    {
      element: '[href="/account/photos/liked"]',
      popover: {
        title: "View Liked Photos",
        description: "Click here to view your liked photos.",
      },
    },
  ],
});
