"use client";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiExitFullscreen } from "react-icons/bi";
import { GoScreenFull } from "react-icons/go";
import { useState } from "react";
import Image from "next/image";

// Import images
import notificationImage from "@/assets/img/notification.png";
import userImage from "@/assets/img/user.png";
import { IoMdClose } from "react-icons/io"; // Import close icon

export default function Header({ handleAsideOpen, asideOpen }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error("Failed to enter fullscreen mode:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullScreen(false);
        })
        .catch((err) => {
          console.error("Failed to exit fullscreen mode:", err);
        });
    }
  };

  return (
    <>
      <header className='header flex flex-sb'>
        <div className='logo flex gap-2'>
          <h1>ADMIN</h1>
          <div className='headerham flex flex-center' onClick={handleAsideOpen}>
            {asideOpen ? <IoMdClose /> : <RiBarChartHorizontalLine />}
          </div>
        </div>

        <div className='rightnav flex gap-2'>
          <div onClick={toggleFullscreen}>
            {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
          </div>
          <div className='notification'>
            <Image
              src={notificationImage}
              alt='notification'
              width={24}
              height={24}
              layout='intrinsic'
              priority
            />
          </div>
          <div className='profilenav'>
            <Image
              src={userImage}
              alt='user'
              width={40}
              height={40}
              layout='responsive'
              priority
            />
          </div>
        </div>
      </header>
    </>
  );
}
