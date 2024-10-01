"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Github } from "lucide-react";

const navItems = [
  {
    name: "Feature",
    href: "#",
    subItems: [
      {
        name: "Privacy & Security",
        description:
          "Features that help users set preferences for privacy, security, and who can access their information, ensuring their online identity is protected.",
        learnMore: true,
      },
      {
        name: "Trusted Contacts",
        description:
          "The ability to designate specific individuals to manage digital assets and accounts after the user's passing.",
        learnMore: true,
      },
      {
        name: "Connected Services",
        description:
          "Integration with popular social media platforms, online services, and cloud storage providers for a streamlined experience in managing accounts.",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        name: "Legacy Planning",
        description:
          "Making sure the social apps and personal data is being accessed by the trusted individuals after unfortunate passing of the previous owner ",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        name: "Usage insights",
        description:
          "Tracking the usage of social platforms in terms of time and detection in case of excessive use or suspicious activity. ",
      },
    ],
  },
  {
    name: "Contact",
    href: "#",
    subItems: [
      {
        name: "Yash Shelar",
        linkedin: "https://www.linkedin.com/in/yash-shelar-373372205/",
        instagram: "https://www.instagram.com/yashshelar212/",
        github: "https://github.com/YashShelar04",
      },
      {
        name: "Ayush Kamath",
        linkedin: "https://www.linkedin.com/in/janesmith",
        instagram: "https://www.instagram.com/janesmith",
        github: "https://github.com/janesmith",
      },
      {
        name: "Akshay Kadam",
        linkedin: "https://www.linkedin.com/in/alexjohnson",
        instagram: "https://www.instagram.com/alexjohnson",
        github: "https://github.com/alexjohnson",
      },
      {
        name: "Pranav Mahamunkar",
        linkedin: "https://www.linkedin.com/in/alexjohnson",
        instagram: "https://www.instagram.com/alexjohnson",
        github: "https://github.com/alexjohnson",
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
            <div className="px-6 py-3">
              <div className="flex items-center justify-center">
                <Link href="/" className="text-xl font-bold mr-8">
                  <Image
                    src="/images/blacklogo1.png"
                    alt="Image Description"
                    width={100}
                    height={200}
                  />
                </Link>
                <div className="flex space-x-6 mx-auto">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href}
                        className="text-black font-bold hover:text-gray-700 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Link href="/login">
                    <button className="bg-white/10 hover:bg-black hover:text-white text-black font-bold px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                      Log in
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="bg-black text-white hover:bg-white hover:text-black font-bold px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {expandedItem &&
                navItems.find((item) => item.name === expandedItem)
                  ?.subItems && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, translateY: -20 }}
                    animate={{ opacity: 1, height: "auto", translateY: 0 }}
                    exit={{ opacity: 0, height: 0, translateY: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 pb-6 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(expandedItem)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`grid gap-4 ${expandedItem === "Contact" ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
                    >
                      {navItems
                        .find((item) => item.name === expandedItem)
                        ?.subItems?.map((subItem, index) => (
                          <div
                            key={subItem.name}
                            className={`p-4 rounded-[0.75rem] bg-gray-800/50 hover:bg-gray-700/80 transition-colors duration-200 flex flex-col h-full ${
                              expandedItem === "Feature" && index < 2
                                ? "row-span-2"
                                : ""
                            }`}
                          >
                            {expandedItem === "Contact" ? (
                              <>
                                <h3 className="font-bold text-lg mb-2 text-white">
                                  {subItem.name}
                                </h3>
                                <div className="flex space-x-4 mt-2">
                                  <a
                                    href={subItem.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-400"
                                  >
                                    <Linkedin size={24} />
                                  </a>
                                  <a
                                    href={subItem.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-pink-400"
                                  >
                                    <Instagram size={24} />
                                  </a>
                                  <a
                                    href={subItem.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-gray-400"
                                  >
                                    <Github size={24} />
                                  </a>
                                </div>
                              </>
                            ) : (
                              <>
                                <h3 className="font-bold text-lg mb-2 text-white">
                                  {subItem.name}
                                </h3>
                                {subItem.description && (
                                  <p className="text-sm text-white/70 mb-4 font-bold flex-grow">
                                    {subItem.description}
                                  </p>
                                )}
                                {subItem.learnMore && (
                                  <span className="bg-black/10 hover:bg-black/20 text-white px-3 py-1 rounded-[0.5rem] transition-colors duration-200 text-sm inline-block border-2 mt-auto">
                                    Learn more
                                  </span>
                                )}
                                {subItem.image && (
                                  <div className="mt-2 h-24 w-full relative"></div>
                                )}
                              </>
                            )}
                          </div>
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
          className="fixed inset-0 bg-transparent pointer-events-none z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
}
