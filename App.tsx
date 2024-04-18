import React from "react";
import Configure from "./components/Configure";
import { LibraryProvider } from "./utils/contexts/LibraryContext";
import { ThemeProvider } from "./utils/contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <Configure />
      </LibraryProvider>
    </ThemeProvider>
  );
}
