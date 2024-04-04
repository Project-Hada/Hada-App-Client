import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { colors } from "../../components/theme/Colors";
import { spacing } from "../../components/theme/Spacing";
import { typography } from "../../components/theme/Typography";
import { shadow } from "../../components/theme/Shadow";

type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  theme: {
    colors: typeof colors.light | typeof colors.dark;
    spacing: typeof spacing;
    typography: typeof typography;
    shadow: typeof shadow;
  };
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// default to light theme
const defaultThemeContext: ThemeContextType = {
  theme: {
    colors: colors.light,
    spacing,
    typography,
    shadow,
  },
  themeMode: "light",
  toggleTheme: () => {},
};

// Create the context with the default theme
export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = {
    colors: themeMode === "light" ? colors.light : colors.dark,
    spacing,
    typography,
    shadow,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
