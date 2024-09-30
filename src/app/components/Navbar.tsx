"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  {
    name: 'Features',
    href: '#',
    subItems: [
      { name: 'Plan', description: 'Set the product direction with projects and initiatives', learnMore: true },
      { name: 'Build', description: 'Make progress with issue tracking and cycle planning', learnMore: true },
      { name: 'Insights', description: 'Instant analytics for any stream of work', image: '/placeholder.svg?height=100&width=200' },
      { name: 'Asks', description: 'Turn requests in Slack into actionable issues', image: '/placeholder.svg?height=100&width=200' },
      { name: 'Security', description: 'Secure your workspace' },
    ],
  },
  { name: 'Method', href: '#' },
  { name: 'Customers', href: '#' },
  { name: 'Changelog', href: '#' },
  { name: 'Pricing', href: '#' },
  {
    name: 'Company',
    href: '#',
    subItems: [
      { name: 'Blog', description: 'Read recent news' },
      { name: 'README', description: 'A story about magic' },
      { name: 'Brand', description: 'Assets and guidelines' },
      { name: 'Careers', description: 'Help us bring magic back to software', visit: true },
      { name: 'Logo', image: '/placeholder.svg?height=200&width=300' },
      { name: 'About', description: 'Meet the team behind Linear', visit: true },
    ],
  },
  { name: 'Contact', href: '#' },
]

export default function Navbar() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [isBlurActive, setIsBlurActive] = useState(false)

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setExpandedItem(itemName)
    setIsBlurActive(!!navItems.find(item => item.name === itemName)?.subItems)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpandedItem(null)
      setIsBlurActive(false)
    }, 300)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpandedItem(null)
        setIsBlurActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        ref={navRef}
      >
        <div className="max-w-7xl w-full">
          <div className="mx-4 mt-4 bg-gray-900/80 backdrop-blur-md text-white rounded-[1.5rem] transition-all duration-300 overflow-hidden">
            <div className="px-6 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold mr-8">
                    <Image
                      src="/images/logo.png"
                      alt="Image Description"
                      width={100}
                      height={200}
                    />

                  </Link>
                  <div className="flex space-x-6">
                    {navItems.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link href={item.href} className="hover:text-white/70 transition-colors duration-200">
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                    Log in
                  </button>
                  <button className="bg-white text-black hover:bg-white/80 px-4 py-2 rounded-[0.75rem] transition-colors duration-200">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {expandedItem && navItems.find(item => item.name === expandedItem)?.subItems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-6 overflow-hidden"
                  onMouseEnter={() => handleMouseEnter(expandedItem)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`grid gap-4 ${expandedItem === 'Company' ? 'grid-cols-3' : 'grid-cols-3'}`}>
                    {navItems.find(item => item.name === expandedItem)?.subItems?.map((subItem, index) => (
                      <Link
                        href="#"
                        key={subItem.name}
                        className={`p-4 rounded-[0.75rem] bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 ${expandedItem === 'Company'
                            ? index === 4 ? 'col-span-2 row-span-2'
                              : 'col-span-1 row-span-1'
                            : index < 2 ? 'col-span-1 row-span-3'
                              : 'col-span-1 row-span-1'
                          }`}
                      >
                        <h3 className="font-semibold text-lg mb-2">{subItem.name}</h3>
                        {subItem.description && (
                          <p className="text-sm text-white/70 mb-4">{subItem.description}</p>
                        )}
                        {subItem.learnMore && (
                          <span className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-[0.5rem] transition-colors duration-200 text-sm inline-block">
                            Learn more
                          </span>
                        )}
                        {subItem.visit && (
                          <span className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-[0.5rem] transition-colors duration-200 text-sm inline-block">
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
      </nav>
      {isBlurActive && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm pointer-events-none z-40"
          aria-hidden="true"
        />
      )}
    </>
  )
}