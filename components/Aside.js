import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  BarChart2,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={` asideleft active
        fixed left-0 top-0 h-screen bg-gray-800 text-white 
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64" : "w-20"}
        flex flex-col
      `}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='absolute top-4 -right-4 bg-gray-700 p-1 rounded-full shadow-lg z-10'
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Logo Area */}
      <div className='flex items-center p-4 border-b border-gray-700'>
        <img
          src='/api/placeholder/50/50'
          alt='Logo'
          className='w-10 h-10 rounded-full mr-3'
        />
        {isExpanded && <span className='font-bold text-xl'>Dashboard</span>}
      </div>

      {/* Navigation Items */}
      <nav className='flex-grow mt-8'>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`
                  flex items-center p-4 hover:bg-gray-700 
                  transition-colors duration-200
                  ${isExpanded ? "justify-start" : "justify-center"}
                `}
              >
                <item.icon className='mr-3' size={24} />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className='p-4 border-t border-gray-700'>
        <button
          className={`
            flex items-center text-red-400 hover:text-red-300
            ${isExpanded ? "justify-start" : "justify-center"}
          `}
        >
          <LogOut className='mr-3' size={24} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
