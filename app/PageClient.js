// app/PageClient.js
"use client";
import { useState } from "react";

export function LayoutProvider({ children }) {
  const [asideOpen, setAsideOpen] = useState(true);

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  return {
    asideOpen,
    toggleAside,
    children,
  };
}
