// app/LayoutWrapper.js
"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }) {
  const [asideOpen, setAsideOpen] = useState(true);

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      <Header asideOpen={asideOpen} handleAsideOpen={toggleAside} />
      <Aside asideOpen={asideOpen} />
      <div className={asideOpen ? "container" : "container active"}>
        {children}
      </div>
      <Toaster position='top-right' />
    </>
  );
}
