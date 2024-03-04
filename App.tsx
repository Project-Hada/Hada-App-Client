import React from "react";
import Configure from "./components/Configure";
import { LibraryProvider } from "./utils/contexts/LibraryContext";

export default function App() {
  return (
    <LibraryProvider>
      <Configure />
    </LibraryProvider>
  );
}
