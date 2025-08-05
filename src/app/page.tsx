'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import GalaxyBackground from '@/components/GalaxyBackground'
import SplineModel from '@/components/SplineModel'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Shield, 
  Lock,
  Eye,
  GraduationCap,
  Target,
  Activity,
  Database,
  ChevronRight,
  Check,
  ArrowRight,
  Zap,
  Globe,
  Users,
  BarChart3,
  FileSearch,
  Cpu,
  Cloud,
  Layers,
  GitBranch,
  Terminal,
  Code,
  Sparkles
} from 'lucide-react'



// 3D Testimonials Carousel komponenta
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { t } = useLanguage()

  const testimonials = [
    {
      name: t('TESTIMONIAL_1_NAME'),
      role: t('TESTIMONIAL_1_ROLE'),
      company: t('TESTIMONIAL_1_COMPANY'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      text: t('TESTIMONIAL_1_TEXT')
    },
    {
      name: t('TESTIMONIAL_2_NAME'), 
      role: t('TESTIMONIAL_2_ROLE'),
      company: t('TESTIMONIAL_2_COMPANY'),
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=100&h=100&fit=crop",
      text: t('TESTIMONIAL_2_TEXT')
    },
    {
      name: t('TESTIMONIAL_3_NAME'),
      role: t('TESTIMONIAL_3_ROLE'), 
      company: t('TESTIMONIAL_3_COMPANY'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: t('TESTIMONIAL_3_TEXT')
    },
    {
      name: t('TESTIMONIAL_4_NAME'),
      role: t('TESTIMONIAL_4_ROLE'),
      company: t('TESTIMONIAL_4_COMPANY'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", 
      text: t('TESTIMONIAL_4_TEXT')
    },
    {
      name: t('TESTIMONIAL_5_NAME'),
      role: t('TESTIMONIAL_5_ROLE'),
      company: t('TESTIMONIAL_5_COMPANY'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      text: t('TESTIMONIAL_5_TEXT')
    },
    {
      name: t('TESTIMONIAL_6_NAME'),
      role: t('TESTIMONIAL_6_ROLE'),
      company: t('TESTIMONIAL_6_COMPANY'), 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      text: t('TESTIMONIAL_6_TEXT')
    },
    {
      name: t('TESTIMONIAL_7_NAME'),
      role: t('TESTIMONIAL_7_ROLE'),
      company: t('TESTIMONIAL_7_COMPANY'),
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=120&h=120&fit=crop",
      text: t('TESTIMONIAL_7_TEXT')
    },
    {
      name: t('TESTIMONIAL_8_NAME'),
      role: t('TESTIMONIAL_8_ROLE'),
      company: t('TESTIMONIAL_8_COMPANY'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
      text: t('TESTIMONIAL_8_TEXT')
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden z-10" style={{ perspective: '1200px' }}>
      {testimonials.map((testimonial, index) => {
        const offset = index - currentIndex
        const totalCards = testimonials.length
        
        // Normalizace offsetu pro 8 karet
        let normalizedOffset = offset
        if (offset > totalCards / 2) normalizedOffset -= totalCards
        if (offset < -totalCards / 2) normalizedOffset += totalCards
        
        const isCenter = normalizedOffset === 0
        const distance = Math.abs(normalizedOffset)
        
        // Pozice pro 8 karet v kruhu
        const angle = (normalizedOffset / totalCards) * 360
        const radius = 320
        const x = Math.sin((angle * Math.PI) / 180) * radius
        const z = Math.cos((angle * Math.PI) / 180) * radius
        
        const scale = isCenter ? 1.1 : Math.max(0.5, 1 - distance * 0.2)
        const opacity = isCenter ? 1 : Math.max(0.2, 1 - distance * 0.3)
        const blur = isCenter ? 0 : Math.min(12, distance * 3)
        const zIndex = isCenter ? 100 : Math.max(1, 50 - distance * 10)

        return (
          <motion.div
            key={index}
            animate={{
              x: x,
              z: z,
              scale: scale,
              opacity: opacity,
              rotateY: -angle,
              filter: `blur(${blur}px)`
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute w-80 h-48 rounded-xl p-4 ${
              isCenter 
                ? 'border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl shadow-black/30 z-50' 
                : 'border border-white/5 bg-white/5 backdrop-blur-sm z-10'
            }`}
            style={{ 
              transformStyle: "preserve-3d",
              zIndex: zIndex
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <img 
                src={testimonial.image}
                alt={testimonial.name}
                className={`rounded-full border-2 flex-shrink-0 ${
                  isCenter 
                    ? 'w-10 h-10 border-white/30' 
                    : 'w-8 h-8 border-white/20'
                }`}
              />
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium leading-tight ${
                  isCenter 
                    ? 'text-white text-sm' 
                    : 'text-white/80 text-xs'
                }`}>
                  {testimonial.name}
                </h4>
                <p className={`leading-tight ${
                  isCenter 
                    ? 'text-gray-300 text-xs' 
                    : 'text-gray-400 text-xs'
                }`}>
                  {testimonial.role}
                </p>
                <p className={`font-medium leading-tight ${
                  isCenter 
                    ? 'text-gray-300 text-xs' 
                    : 'text-gray-400/70 text-xs'
                }`}>
                  {testimonial.company}
                </p>
              </div>
            </div>
            
            <p className={`italic leading-snug ${
              isCenter 
                ? 'text-white text-sm font-light' 
                : 'text-gray-300/60 text-xs'
            }`}>
              "{testimonial.text}"
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

// Typewriter Text komponenta
function TypewriterText() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useLanguage()

  const texts = [
    t('HERO_TYPEWRITER_1'),
    t('HERO_TYPEWRITER_2'), 
    t('HERO_TYPEWRITER_3')
  ]

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]

    if (isTyping && currentText.length < currentFullText.length) {
      // Píše znak po znaku
      const timeout = setTimeout(() => {
        setCurrentText(currentFullText.substring(0, currentText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } 
    
    if (isTyping && currentText === currentFullText) {
      // Text je dokončen, pause a pak rozpuštění
      const timeout = setTimeout(() => {
        setIsTyping(false)
        setIsVisible(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    if (!isTyping && !isVisible) {
      // Po rozpuštění začni nový text
      const timeout = setTimeout(() => {
        setCurrentText('')
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [currentText, isTyping, isVisible, currentTextIndex, texts])

  return (
    <div className="text-center mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-8">
          {t('HERO_PLATFORM_TAG')}
        </div>
        <div className="text-center min-h-[200px] flex flex-col justify-center">
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-tight">
            {t('HERO_BRAND_NAME')}
          </h1>
          <div className="text-3xl lg:text-4xl xl:text-5xl font-light text-blue-400 leading-relaxed min-h-[100px] flex items-center justify-center">
            <motion.span 
              animate={{ 
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                filter: isVisible ? "blur(0px)" : "blur(4px)"
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="inline-block"
            >
              {currentText}
            </motion.span>
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-2"
              >
                |
              </motion.span>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-xl max-w-4xl mx-auto leading-relaxed mt-8">
          {t('HERO_DESCRIPTION')}
        </p>
      </motion.div>

      {/* CTA tlačítka */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 justify-center mb-16 sm:mb-24 md:mb-32 lg:mb-40 xl:mb-48"
      >
        <button className="backdrop-blur-md bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 hover:border-blue-400/50 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
          {t('HERO_CTA_PRIMARY')} →
        </button>
        <button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
          {t('HERO_CTA_SECONDARY')}
        </button>
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set())
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId) {
              setVisibleSections(prev => new Set([...Array.from(prev), sectionId]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const features = [
    {
      icon: GraduationCap,
      title: t('FEATURE_TRAINING_TITLE'),
      description: t('FEATURE_TRAINING_DESC'),
      metric: t('FEATURE_TRAINING_METRIC'),
      metricLabel: t('FEATURE_TRAINING_METRIC_LABEL')
    },
    {
      icon: Shield,
      title: t('FEATURE_REALTIME_TITLE'),
      description: t('FEATURE_REALTIME_DESC'),
      metric: t('FEATURE_REALTIME_METRIC'),
      metricLabel: t('FEATURE_REALTIME_METRIC_LABEL')
    },
    {
      icon: Target,
      title: t('FEATURE_PHISHING_TITLE'),
      description: t('FEATURE_PHISHING_DESC'),
      metric: t('FEATURE_PHISHING_METRIC'),
      metricLabel: t('FEATURE_PHISHING_METRIC_LABEL')
    },
    {
      icon: Activity,
      title: t('FEATURE_ANALYTICS_TITLE'),
      description: t('FEATURE_ANALYTICS_DESC'),
      metric: t('FEATURE_ANALYTICS_METRIC'),
      metricLabel: t('FEATURE_ANALYTICS_METRIC_LABEL')
    }
  ]

  const galleryImages = {
    row1: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop'
    ],
    row2: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=300&fit=crop'
    ]
  }

  return (
    <Layout>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-black" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

        {/* Galaxie pozadí */}
        <GalaxyBackground />

      {/* Hero sekce - Glass morphism */}
      <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-16 pb-32" data-section="hero">
                 {/* Ještě větší černý pruh dole pro úplné zadelání mezery */}
         <div className="absolute -bottom-16 left-0 right-0 pointer-events-none z-50">
           <div className="w-full h-32 bg-black"></div>
         </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-50 overflow-hidden">
          <svg 
            className="w-[120%] h-[600px] -ml-[10%]" 
            viewBox="0 0 3600 2338" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="filter1" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="100"/>
            </filter>
            <g id="Group" filter="url(#filter1)">
              <filter id="filter2" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100"/>
                <feOffset dx="0" dy="0" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="1"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <path id="Rounded-Corner-copy" fill="#000000" fillRule="evenodd" stroke="none" filter="url(#filter2)" d="M 1800 2474.016846 C -524.988831 2474.016846 -2409.778076 589.227661 -2409.778076 -1735.760986 L -1593.929565 -1735.760986 C -1593.929565 138.648682 -74.409813 1658.168457 1800 1658.168457 Z"/>
              <filter id="filter3" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100"/>
                <feOffset dx="0" dy="0" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="1"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <path id="Rounded-Corner-copy-2" fill="#000000" fillRule="evenodd" stroke="none" filter="url(#filter3)" d="M 1800.222046 2474.016846 C 4125.210938 2474.016846 6010 589.227661 6010 -1735.760986 L 5194.151367 -1735.760986 C 5194.151367 138.648682 3674.631836 1658.168457 1800.222046 1658.168457 Z"/>
            </g>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center flex-1 flex items-center justify-center">
          {/* Animovaný typewriter text */}
          <div className="w-full">
            <TypewriterText />
          </div>
        </div>
      </section>

      {/* Oddělovač #1: Hero → Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
          #1: Hero → Features
        </div>
      </div>

      {/* Features sekce - Glass cards */}
      <section className="py-20 relative bg-black" data-section="features">
        
        {/* Ještě větší černý pruh nahoru pro úplné zadelání mezery */}
        <div className="absolute -top-16 left-0 right-0 pointer-events-none z-10">
          <div className="w-full h-32 bg-black"></div>
        </div>
        
        {/* SVG otočené o 180° dolů od #2 - posazené na malém černém kousku */}
        <div className="absolute top-4 left-0 right-0 pointer-events-none z-10 overflow-hidden">
          <svg 
            className="w-[120%] h-[600px] -ml-[10%] rotate-180" 
            viewBox="0 0 3600 2338" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="filter1-features" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="100"/>
            </filter>
            <g id="Group-features" filter="url(#filter1-features)">
              <filter id="filter2-features" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100"/>
                <feOffset dx="0" dy="0" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="1"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <path id="Rounded-Corner-copy-features" fill="#000000" fillRule="evenodd" stroke="none" filter="url(#filter2-features)" d="M 1800 2474.016846 C -524.988831 2474.016846 -2409.778076 589.227661 -2409.778076 -1735.760986 L -1593.929565 -1735.760986 C -1593.929565 138.648682 -74.409813 1658.168457 1800 1658.168457 Z"/>
              <filter id="filter3-features" x="0" y="0" width="3600" height="2338" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100"/>
                <feOffset dx="0" dy="0" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="1"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <path id="Rounded-Corner-copy-2-features" fill="#000000" fillRule="evenodd" stroke="none" filter="url(#filter3-features)" d="M 1800.222046 2474.016846 C 4125.210938 2474.016846 6010 589.227661 6010 -1735.760986 L 5194.151367 -1735.760986 C 5194.151367 138.648682 3674.631836 1658.168457 1800.222046 1658.168457 Z"/>
            </g>
          </svg>
        </div>
        
        {/* Oddělovač #2: Features Start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
            #2: Features Start
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
            className="text-center mb-16"
          >
            <div className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
              {t('FEATURES_BADGE')}
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              {t('FEATURES_TITLE')} <span className="italic">{t('FEATURES_TITLE_ITALIC')}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t('FEATURES_SUBTITLE')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index} 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.7,
                  ease: [0.215, 0.61, 0.355, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 25
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.04,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass-card-large p-8 group relative overflow-hidden"
              >
                {/* Moderní glow efekt */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                
                <div className="relative z-10">
                  <div className="glass-icon-box mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <feature.icon className="h-7 w-7 text-blue-400" />
                </div>
                
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-50 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-800/30">
                    <div className="text-3xl font-light bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                      {feature.metric}
                </div>
                    <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                      {feature.metricLabel}
              </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Oddělovač #3: Features → Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #3: Features → Gallery
          </div>
        </div>
      </section>

      {/* Scroll-based Gallery - Optimized */}
      <section className="py-20 relative overflow-hidden bg-black z-30" data-section="gallery">
        {/* Oddělovač #4: Gallery Start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
            #4: Gallery Start
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ 
            duration: 0.9, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 70,
            damping: 25
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              {t('GALLERY_TITLE')} <span className="italic">{t('GALLERY_TITLE_ITALIC')}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t('GALLERY_SUBTITLE')}
            </p>
          </div>
        </motion.div>

        {/* Široká galerie s scroll-based animací */}
        <div className="relative w-full overflow-hidden">
          {/* Elegantní fade-out efekty do ztracena */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/95 via-black/80 via-black/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/95 via-black/80 via-black/50 to-transparent z-10 pointer-events-none"></div>
          
          {/* První řada - pohyb podle scrollu zleva doprava */}
          <motion.div 
            style={{ 
              x: useTransform(scrollYProgress, [0.2, 0.8], [-800, 200]),
              willChange: 'transform'
            }}
            className="flex space-x-8 mb-5"
          >
            {[...galleryImages.row1, ...galleryImages.row1, ...galleryImages.row1].map((img, index) => (
              <div
                key={index} 
                className="relative flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/8 border border-white/15 shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-white/25 rounded-2xl pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Druhá řada - pohyb podle scrollu zprava doleva */}
          <motion.div 
            style={{ 
              x: useTransform(scrollYProgress, [0.2, 0.8], [200, -800]),
              willChange: 'transform'
            }}
            className="flex space-x-8"
          >
            {[...galleryImages.row2, ...galleryImages.row2, ...galleryImages.row2].map((img, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden backdrop-blur-sm bg-blue-500/10 border border-blue-400/25 shadow-2xl shadow-blue-500/25 transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <img 
                  src={img} 
                  alt={`Galerie ${index}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-blue-400/35 rounded-2xl pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Oddělovač #5: Gallery → Process */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #5: Gallery → Process
          </div>
        </div>
      </section>

      {/* Process sekce v elegantním okně */}
      <section className="py-20 relative overflow-hidden" data-section="process">
        {/* Oddělovač #6: Process Start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
            #6: Process Start
          </div>
        </div>
        
        {/* Okno s černým shadow efektem kolem */}
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="relative border border-white/20 rounded-3xl p-12 z-10"
            style={{
              boxShadow: `
                0 0 0 500px black,
                0 20px 40px -10px rgba(0, 0, 0, 0.8)
              `
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 1.0, 
                ease: [0.215, 0.61, 0.355, 1],
                type: "spring",
                stiffness: 60,
                damping: 25
              }}
              className="text-center mb-16"
            >
              <div className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
                {t('PROCESS_BADGE')}
              </div>
              <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                {t('PROCESS_TITLE')} <span className="italic">{t('PROCESS_TITLE_ITALIC')}</span>
              </h2>
              <p className="text-gray-400 text-lg">
                {t('PROCESS_SUBTITLE')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {            [
              {
                step: t('PROCESS_STEP_1'),
                title: t('PROCESS_STEP_1_TITLE'),
                description: t('PROCESS_STEP_1_DESC'),
                icon: Eye,
                animation: 'discover'
              },
              {
                step: t('PROCESS_STEP_2'),
                title: t('PROCESS_STEP_2_TITLE'),
                description: t('PROCESS_STEP_2_DESC'),
                icon: Database,
                animation: 'build'
              },
              {
                step: t('PROCESS_STEP_3'),
                title: t('PROCESS_STEP_3_TITLE'),
                description: t('PROCESS_STEP_3_DESC'),
                icon: Target,
                animation: 'optimize'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 45, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  delay: index * 0.25,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative group"
              >
                <div className="glass-card p-8 h-full">
                  <div className="text-gray-500 text-sm mb-4">{item.step}</div>
                  
                  {/* Animated Framer Motion window */}
                  <div className="mb-6 h-48 glass-window rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                    
                    {/* Framer Motion text animation */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-blue-400/50 font-mono text-sm mb-4"
                    >
                      Framer Motion
                    </motion.div>
                    
                    {/* Animated code/process visualization */}
                    {item.animation === 'discover' && (
                      <motion.div className="space-y-2">
                        <motion.div
                          animate={{ width: ['0%', '80%', '60%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-2 bg-blue-400/20 rounded"
                        />
                        <motion.div
                          animate={{ width: ['0%', '60%', '90%'] }}
                          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                          className="h-2 bg-blue-400/30 rounded"
                        />
                        <motion.div
                          animate={{ width: ['0%', '90%', '70%'] }}
                          transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                          className="h-2 bg-blue-400/20 rounded"
                        />
                      </motion.div>
                    )}
                    
                    {item.animation === 'build' && (
                      <div className="flex justify-center items-center h-full">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="relative"
                        >
                          <Database className="w-16 h-16 text-blue-400/30" />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-8 h-8 bg-blue-400/20 rounded-full blur-xl" />
                          </motion.div>
                        </motion.div>
                </div>
                    )}
                    
                    {item.animation === 'optimize' && (
                      <div className="space-y-4">
                        <motion.div
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-400/50 to-transparent" />
                        </motion.div>
                        <motion.div
                          animate={{ x: [100, -100] }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                          className="flex items-center gap-2"
                        >
                          <div className="flex-1 h-[1px] bg-gradient-to-l from-blue-400/50 to-transparent" />
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </motion.div>
                </div>
                    )}
                    
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-4 right-4"
                    >
                      <item.icon className="w-8 h-8 text-blue-400/20" />
                    </motion.div>
                </div>
                
                  <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
        
        {/* Oddělovač #7: Process → Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #7: Process → Stats
          </div>
        </div>
      </section>

      {/* Stats sekce v elegantním okně */}
      <section className="py-20 relative overflow-hidden z-20" data-section="stats">
        {/* Oddělovač #8: Stats Start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
            #8: Stats Start
          </div>
        </div>
        
        {/* Černý kontejner pouze kolem okna */}
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="relative border border-white/20 rounded-3xl p-12 z-10"
            style={{
              boxShadow: `
                0 0 0 500px black,
                0 20px 40px -10px rgba(0, 0, 0, 0.8)
              `
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {            [
              { value: t('STATS_SCANS_VALUE'), label: t('STATS_SCANS_LABEL'), icon: Shield },
              { value: t('STATS_UPTIME_VALUE'), label: t('STATS_UPTIME_LABEL'), icon: Activity },
              { value: t('STATS_USERS_VALUE'), label: t('STATS_USERS_LABEL'), icon: Users },
              { value: t('STATS_RESPONSE_VALUE'), label: t('STATS_RESPONSE_LABEL'), icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                  type: "spring",
                  stiffness: 120,
                  damping: 25
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="border border-white/20 rounded-2xl p-6 text-center group hover:border-white/30 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:border-blue-400/50 transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </motion.div>
                <div className="text-3xl font-light text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
        
        {/* Oddělovač #9: Stats → Success Stories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #9: Stats → Success Stories
          </div>
        </div>
      </section>

      {/* Success Stories sekce - 3D Carousel */}
      <section className="py-20 relative bg-black overflow-hidden" data-section="testimonials">
        {/* Oddělovač #10: Success Stories Start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
            #10: Success Stories Start
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 75,
              damping: 22
            }}
            className="text-center mb-16"
          >
            <div className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
              {t('SUCCESS_STORIES_BADGE')}
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              {t('SUCCESS_STORIES_TITLE')} <span className="italic">{t('SUCCESS_STORIES_TITLE_ITALIC')}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t('SUCCESS_STORIES_SUBTITLE')}
            </p>
          </motion.div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Integrations sekce */}
      <section className="py-20 relative overflow-hidden bg-black" data-section="integrations">
        {/* Oddělovač #11: Success Stories → Integrations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #11: Success Stories → Integrations
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.215, 0.61, 0.355, 1],
              type: "spring",
              stiffness: 70,
              damping: 25
            }}
            className="text-center mb-16"
          >
            <div className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
              {t('INTEGRATIONS_BADGE')}
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              {t('INTEGRATIONS_TITLE')} <span className="italic">{t('INTEGRATIONS_TITLE_ITALIC')}</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {t('INTEGRATIONS_SUBTITLE')}
            </p>
          </motion.div>

          {/* Floating animation background */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { x1: 15, y1: 25, x2: 85, y2: 75, duration: 8 },
              { x1: 75, y1: 15, x2: 25, y2: 85, duration: 12 },
              { x1: 45, y1: 80, x2: 65, y2: 20, duration: 10 },
              { x1: 90, y1: 60, x2: 10, y2: 40, duration: 14 },
              { x1: 20, y1: 45, x2: 80, y2: 55, duration: 9 },
              { x1: 60, y1: 90, x2: 40, y2: 10, duration: 11 }
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                initial={{ 
                  x: particle.x1 + "%",
                  y: particle.y1 + "%"
                }}
                animate={{
                  x: [particle.x1 + "%", particle.x2 + "%"],
                  y: [particle.y1 + "%", particle.y2 + "%"],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* 3D Grid integrations */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: t('INTEGRATION_SLACK'), icon: Globe, color: "from-green-400 to-blue-500" },
                { name: t('INTEGRATION_TEAMS'), icon: Users, color: "from-blue-400 to-purple-500" },
                { name: t('INTEGRATION_GOOGLE'), icon: Cloud, color: "from-yellow-400 to-red-500" },
                { name: t('INTEGRATION_JIRA'), icon: FileSearch, color: "from-blue-400 to-indigo-500" },
                { name: t('INTEGRATION_GITHUB'), icon: GitBranch, color: "from-gray-400 to-gray-600" },
                { name: t('INTEGRATION_OKTA'), icon: Lock, color: "from-indigo-400 to-purple-500" },
                { name: t('INTEGRATION_SALESFORCE'), icon: Layers, color: "from-cyan-400 to-blue-500" },
                { name: t('INTEGRATION_SPLUNK'), icon: BarChart3, color: "from-orange-400 to-red-500" }
              ].map((integration, index) => {
                const IconComponent = integration.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ 
                      delay: index * 0.15,
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 90,
                      damping: 25
                    }}
                    whileHover={{ 
                      y: -12,
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-32 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="mb-3"
                      >
                        <IconComponent className="w-8 h-8 text-white group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      
                      {/* Name */}
                      <p className="text-gray-400 group-hover:text-white text-sm font-medium text-center transition-colors duration-300">
                        {integration.name}
                      </p>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Oddělovač #13: Integrations → FAQ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #13: Integrations → FAQ
          </div>
        </div>
      </section>

      {/* FAQ sekce */}
      <section className="py-20 relative bg-black" data-section="faq">
        {/* Oddělovač #13: Integrations → FAQ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #13: Integrations → FAQ
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
            className="text-center mb-16"
          >
            <div className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
              {t('FAQ_BADGE')}
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              {t('FAQ_TITLE')} <span className="italic">{t('FAQ_TITLE_ITALIC')}</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {t('FAQ_SUBTITLE')}
            </p>
          </motion.div>

          <div className="divide-y divide-white/10" style={{ outline: 'none' }}>
            {[
              {
                question: t('FAQ_1_QUESTION'),
                answer: t('FAQ_1_ANSWER')
              },
              {
                question: t('FAQ_2_QUESTION'),
                answer: t('FAQ_2_ANSWER')
              },
              {
                question: t('FAQ_3_QUESTION'),
                answer: t('FAQ_3_ANSWER')
              },
              {
                question: t('FAQ_4_QUESTION'),
                answer: t('FAQ_4_ANSWER')
              },
              {
                question: t('FAQ_5_QUESTION'),
                answer: t('FAQ_5_ANSWER')
              },
              {
                question: t('FAQ_6_QUESTION'),
                answer: t('FAQ_6_ANSWER')
              }
            ].map((item, index) => {
              const isOpen = openFAQs.has(index)
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.4
                  }}
                  className=""
                >
                  <button
                    onClick={() => {
                      setOpenFAQs(isOpen ? new Set() : new Set([index]))
                    }}
                    className="w-full py-6 text-left flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-base font-medium text-white pr-4">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 90 : 0
                      }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="pb-6 pr-8"
                        >
                          <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
        
        {/* Oddělovač #15: FAQ → CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-4 -top-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">
            #15: FAQ → CTA
          </div>
        </div>
      </section>

             {/* CTA sekce - Gradient to Black */}
       <section className="py-32 relative bg-gradient-to-b from-black via-black/50 to-transparent" data-section="cta">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             <motion.h2 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
             >
               {t('CTA_FINAL_TITLE_1')}
               <br />
               <span className="font-medium text-white">{t('CTA_FINAL_TITLE_2')}</span>
             </motion.h2>
             
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
             >
               {t('CTA_FINAL_SUBTITLE')}
             </motion.p>
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6, duration: 0.8 }}
             >
               <motion.button 
                 whileHover={{ 
                   scale: 1.05,
                   boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ duration: 0.2 }}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl text-lg font-medium shadow-xl transition-all duration-300"
               >
                 {t('CTA_FINAL_BUTTON')}
               </motion.button>
             </motion.div>
           </motion.div>
         </div>
       </section>
    </Layout>
  )
} 