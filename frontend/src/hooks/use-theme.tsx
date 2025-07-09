import { createContext, use } from "react";
import type { Theme, ThemeProviderProps, ThemeProviderState } from "../types";

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "clever-photo-gallery-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage?.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  // Memoize the setTheme function to prevent unnecessary re-renders
  const handleSetTheme = useCallback(
    (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
    },
    [storageKey]
  );

  // Handle system theme changes and apply themes to DOM
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    // Apply initial theme
    applyTheme();

    // Listen for system theme changes only when theme is "system"
    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      setTheme: handleSetTheme,
    }),
    [theme, handleSetTheme]
  );

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}

const useTheme = () => {
  const context = use(ThemeProviderContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export {
  ThemeProvider,
  // eslint-disable-next-line react-refresh/only-export-components
  useTheme,
  type Theme,
  type ThemeProviderProps,
  type ThemeProviderState,
};
