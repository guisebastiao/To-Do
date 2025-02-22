import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = Cookies.get("theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext deve ser usado dentro de um ThemeProvider"
    );
  }

  return context;
};
