"use client"
import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useInView, AnimatePresence, useTransform } from 'framer-motion'

interface Project {
  title: string
  subtitle: string
  tags: string[]
  imageUrl: string
}

const projects: Project[] = [
  {
    title: "HOTEL ONITSUKA TIGER",
    subtitle: "BRAND ACTIVATION",
    tags: ["CAMPAIGN", "SPATIAL", "ILLUSTRATION"],
    imageUrl: "https://www.bunnycart.com/blog/wp-content/uploads/2019/01/Aquascaping-an-Aquarium.jpg",
  },
  {
    title: "KODAMA",
    subtitle: "BRAND IDENTITY",
    tags: ["BRANDING", "DIGITAL"],
    imageUrl: "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg?size=626&ext=jpg&ga=GA1.1.1314780943.1727161200&semt=ais_hybrid",
  },
  {
    title: "ECO GARDEN",
    subtitle: "SUSTAINABLE DESIGN",
    tags: ["ENVIRONMENT", "INNOVATION"],
    imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/036/135/738/small_2x/ai-generated-colored-water-drops-on-abstract-background-water-drops-on-colorful-background-colored-wallpaper-ultra-hd-colorful-wallpaper-background-with-colored-bubbles-photo.jpg",
  },
  {
    title: "URBAN OASIS",
    subtitle: "ARCHITECTURAL CONCEPT",
    tags: ["DESIGN", "URBAN PLANNING"],
    imageUrl: "https://aquascape.ae/wp-content/uploads/2023/09/1000090335-scaled.jpg",
  },
]

const ProjectCard: React.FC<{ project: Project; index: number; setActiveIndex: (index: number) => void }> = ({ project, index, setActiveIndex }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px" })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index)
    }
  }, [isInView, index, setActiveIndex])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      className="h-screen flex items-center justify-center sticky top-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full px-4">
        <motion.div 
          className="relative aspect-video bg-black/20 rounded-lg overflow-hidden cursor-none"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-white text-black font-semibold text-sm"
                style={{
                  left: mousePosition.x - 48,
                  top: mousePosition.y - 48,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                VIEW STUDY
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

const ProjectInfo: React.FC<{ project: Project; isActive: boolean }> = ({ project, isActive }) => {
  return (
    <motion.div
      className="fixed top-1/4 left-16 z-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-6xl font-bold text-white mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {project.title}
      </motion.h2>
      <motion.p 
        className="text-3xl text-white/80 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {project.subtitle}
      </motion.p>
      <motion.div 
        className="flex flex-wrap gap-2 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="text-sm text-white bg-black/50 rounded-full px-4 py-2">
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const backgroundColor = useTransform(
    smoothProgress,
    [0, 1],
    ["rgba(0, 0, 0, 0.5)", "rgba(255, 255, 255, 0.5)"]
  )

  useEffect(() => {
    if (containerRef.current) {
      const targetScroll = window.innerHeight + (activeIndex * window.innerHeight)
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  return (
    <motion.div 
      ref={containerRef}
      className="relative"
      style={{ 
        backgroundColor,
        minHeight: `${projects.length * 100}vh`,
        marginTop: '100vh' // Start below the Spline component
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${projects[activeIndex].imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
      </AnimatePresence>

      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 h-1/2 w-1 bg-white/20 rounded-full z-20">
        <motion.div 
          className="w-3 h-3 bg-white rounded-full -ml-1"
          style={{ top: smoothProgress }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {projects.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full -ml-0.5 ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
            style={{ position: 'absolute', top: `${(index / (projects.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      {projects.map((project, index) => (
        <React.Fragment key={index}>
          <ProjectCard project={project} index={index} setActiveIndex={setActiveIndex} />
          <ProjectInfo project={project} isActive={index === activeIndex} />
        </React.Fragment>
      ))}
    </motion.div>
  )
}