"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Contact,
  Home,
  Images,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";
import { MdAddShoppingCart } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { BsPostcard } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";

const MenuItem = React.memo(
  ({ title, icon: Icon, link, subLinks, activeLink, handleLinkClick }) => {
    const isActive = activeLink === link;

    return (
      <li
        className={
          isActive
            ? "navactive flex-col flex-left"
            : "navdefault flex-col flex-left"
        }
      >
        <div
          className='flex gap-1 menu-item-header'
          onClick={() => handleLinkClick(link)}
        >
          <Icon className='menu-icon' />
          <span>{title}</span>
        </div>
        <AnimatePresence>
          {isActive && subLinks && (
            <motion.ul
              className='submenu'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {subLinks.map((sub, idx) => (
                <Link key={idx} href={sub.path} passHref>
                  <motion.li
                    className='submenu-item'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sub.label}
                  </motion.li>
                </Link>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }
);

MenuItem.displayName = "MenuItem";

export default function Aside({ asideOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    if (link) {
      setActiveLink((prev) => (prev === link ? null : link));
      router.push(link);
    }
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      link: "/",
    },
    {
      title: "Blogs",
      icon: BsPostcard,
      link: "/blogs",
      subLinks: [
        { label: "All Blogs", path: "/blogs/all" },
        { label: "Draft Blogs", path: "/blogs/drafts" },
        { label: "Add Blog", path: "/blogs/addblog" },
      ],
    },
    {
      title: "Projects",
      icon: BriefcaseBusiness,
      link: "/projects",
      subLinks: [
        { label: "All Projects", path: "/projects/all" },
        { label: "Draft Projects", path: "/projects/drafts" },
        { label: "Add Project", path: "/projects/add" },
      ],
    },
    {
      title: "Shops",
      icon: MdAddShoppingCart,
      link: "/shops",
      subLinks: [
        { label: "All Shops", path: "/shops/all" },
        { label: "Draft Shops", path: "/shops/drafts" },
        { label: "Add Shop", path: "/shops/add" },
      ],
    },
    {
      title: "Gallery",
      icon: Images,
      link: "/gallery",
      subLinks: [
        { label: "All Photos", path: "/gallery/all" },
        { label: "Add Photo", path: "/gallery/add" },
      ],
    },
    {
      title: "Contacts",
      icon: Contact,
      link: "/contact",
    },
    {
      title: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  return (
    <aside className={asideOpen ? "asideleft active" : "asideleft"}>
      <ul>
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            activeLink={activeLink}
            handleLinkClick={handleLinkClick}
          />
        ))}
      </ul>
      <button className='logoutbtn'>Logout</button>
    </aside>
  );
}
