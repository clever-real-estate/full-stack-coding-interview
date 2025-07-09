import { useCallback, useEffect, useState } from "react";
import type { Driver } from "driver.js";

interface UseTourOptions {
  tourKey: string;
  driver: Driver;
  autoStart?: boolean;
  delay?: number;
}

interface UseTourReturn {
  isCompleted: boolean;
  startTour: () => void;
  resetTour: () => void;
  markAsCompleted: () => void;
}

/**
 * Custom hook for managing tour state with localStorage persistence
 *
 * @param tourKey - Unique identifier for the tour (e.g., "photos-tour")
 * @param driver - Driver.js instance
 * @param autoStart - Whether to start the tour automatically if not completed
 * @param delay - Delay in ms before auto-starting the tour
 */
export const useTour = ({
  tourKey,
  driver,
  autoStart = true,
  delay = 1000,
}: UseTourOptions): UseTourReturn => {
  const storageKey = `tour-completed-${tourKey}`;

  const [isCompleted, setIsCompleted] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  });

  // Mark tour as completed in both state and localStorage
  const markAsCompleted = useCallback(() => {
    setIsCompleted(true);
    try {
      localStorage.setItem(storageKey, "true");
    } catch (error) {
      console.warn("Failed to save tour completion status:", error);
    }
    driver.destroy(); // Clean up driver instance
  }, [driver, storageKey]);

  // Start the tour manually
  const startTour = useCallback(() => {
    if (driver) {
      driver.drive();
    }
  }, [driver]);

  // Reset tour completion status
  const resetTour = useCallback(() => {
    setIsCompleted(false);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn("Failed to reset tour completion status:", error);
    }
  }, [storageKey]);

  // Set up driver event listeners and auto-start logic
  useEffect(() => {
    if (!driver) return;

    // Set up event listeners for tour completion
    const handleDestroyed = () => {
      markAsCompleted();
    };

    // Attach event listeners
    driver.setConfig({
      ...driver.getConfig(),
      onDestroyed: handleDestroyed,
      onDestroyStarted: () => {
        // Mark as completed when user closes/finishes the tour
        markAsCompleted();
      },
    });

    // Auto-start the tour if not completed
    if (!isCompleted && autoStart) {
      const timeoutId = setTimeout(() => {
        startTour();
      }, delay);

      return () => clearTimeout(timeoutId);
    }

    // Cleanup function
    return () => {
      try {
        driver.destroy();
      } catch {
        // Ignore errors during cleanup
      }
    };
  }, [driver, isCompleted, autoStart, delay, startTour, markAsCompleted]);

  return {
    isCompleted,
    startTour,
    resetTour,
    markAsCompleted,
  };
};

export default useTour;
