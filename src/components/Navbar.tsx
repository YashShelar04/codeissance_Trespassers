"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Feature",
    href: "#",
    subItems: [
      {
        name: "Plan",
        description: "Set the product direction with projects and initiatives",
        learnMore: true,
      },
      {
        name: "Build",
        description: "Make progress with issue tracking and cycle planning",
        learnMore: true,
      },
      {
        name: "Insights",
        description: "Instant analytics for any stream of work",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        name: "Asks",
        description: "Turn requests in Slack into actionable issues",
        image: "/placeholder.svg?height=100&width=200",
      },
      { name: "Security", description: "Secure your workspace" },
    ],
  },
  {
    name: "Contact",
    href: "#",
    subItems: [
      { name: "Blog", description: "Read recent news" },
      { name: "README", description: "A story about magic" },
      { name: "Brand", description: "Assets and guidelines" },
      {
        name: "Careers",
        description: "Help us bring magic back to software",
        visit: true,
      },
      { name: "Logo", image: "/placeholder.svg?height=200&width=300" },
      {
        name: "About",
        description: "Meet the team behind Linear",
        visit: true,
      },
    ],
  },
];

export default function Navbar() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isBlurActive, setIsBlurActive] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExpandedItem(itemName);
    setIsBlurActive(
      !!navItems.find((item) => item.name === itemName)?.subItems,
    );
    setIsVisible(true);
    const timer = setTimeout(() => {
      setNavbarVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpandedItem(null);
      setIsBlurActive(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpandedItem(null);
        setIsBlurActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: navbarVisible ? 0 : 10 }}
        transition={{ duration: 5, ease: "easeIn" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        ref={navRef}
      >
        <div className="max-w-7xl w-full">
          <div className="mx-4 mt-4 bg-white/10 backdrop-blur-md text-black rounded-[1.5rem] shadow-lg transition-all duration-300 overflow-hidden">
            {/* Glassy effect limited to navbar */}
            <div className="px-6 py-3">
              <div className="flex items-center justify-center">
                <Link href="/" className="text-xl font-bold mr-8">
                  <Image
                    src="/images/blacklogo.png"
                    alt="Image Description"
                    width={100}
                    height={200}
                  />
                </Link>
                <div className="flex space-x-6 mx-auto">
                  {/* Center items */}
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href}
                        className="text-black font-bold hover:text-gray-700 transition-colors duration-200" // Added font-bold here
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <button className="bg-white/10 hover:bg-black hover:text-white text-black font-bold px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                    {" "}
                    {/* Added font-bold here */}
                    Log in
                  </button>
                  <button className="bg-black text-white hover:bg-white hover:text-black font-bold px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                    {" "}
                    {/* Added font-bold here */}
                    Sign up
                  </button>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {expandedItem &&
                navItems.find((item) => item.name === expandedItem)
                  ?.subItems && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, translateY: -20 }} // Slide in from top
                    animate={{ opacity: 1, height: "auto", translateY: 0 }} // Slide in effect
                    exit={{ opacity: 1, height: 0, translateY: 0 }} // Slide out
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Duration and easing
                    className="px-6 pb-6 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(expandedItem)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`grid gap-4 grid-cols-3`}>
                      {navItems
                        .find((item) => item.name === expandedItem)
                        ?.subItems?.map((subItem, index) => (
                          <Link
                            href="#"
                            key={subItem.name}
                            className={`p-4 rounded-[0.75rem] bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 ${
                              expandedItem === "Company"
                                ? index === 4
                                  ? "col-span-2 row-span-2"
                                  : "col-span-1 row-span-1"
                                : index < 2
                                  ? "col-span-1 row-span-3"
                                  : "col-span-1 row-span-1"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2 text-black">
                              {" "}
                              {/* Changed to font-bold here */}
                              {subItem.name}
                            </h3>
                            {subItem.description && (
                              <p className="text-sm text-black/70 mb-4">
                                {subItem.description}
                              </p>
                            )}
                            {subItem.learnMore && (
                              <span className="bg-black/10 hover:bg-black/20 text-black px-3 py-1 rounded-[0.5rem] transition-colors duration-200 text-sm inline-block">
                                Learn more
                              </span>
                            )}
                            {subItem.visit && (
                              <span className="bg-black/10 hover:bg-black/20 text-black px-3 py-1 rounded-[0.5rem] transition-colors duration-200 text-sm inline-block">
                                Visit
                              </span>
                            )}
                            {subItem.image && (
                              <div className="mt-2 h-full w-full relative">
                                <Image
                                  src={subItem.image}
                                  alt={subItem.name}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-[0.5rem]"
                                />
                              </div>
                            )}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
      {isBlurActive && (
        <div
          className="fixed inset-0 bg-transparent pointer-events-none z-40" // Removed backdrop-blur effect from the background
          aria-hidden="true"
        />
      )}
    </>
  );
}
