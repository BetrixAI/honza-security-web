'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import SplineModel from '@/components/SplineModel'
import { 
  Shield, 
  Users, 
  Video, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Lock,
  Eye,
  TrendingUp,
  Award,
  Star,
  Quote
} from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Optimalizovaný scroll tracking s throttling pro lepší výkon
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    // Intersection Observer pro scroll animace
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
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Najít všechny sekce s data-section atributem
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    // Přidat scroll event listener s optimalizací
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const features = [
    {
      icon: Video,
      title: 'Exkluzivní vzdělávací videa',
      description: 'Profesionálně natočená videa s nejnovějšími trendy v kybernetické bezpečnosti',
      stats: '50+ videí',
      details: {
        title: 'Vzdělávací videa nejvyšší kvality',
        subtitle: 'Komplexní video knihovna pro moderní kybernetickou bezpečnost',
        content: [
          'Profesionálně natočená HD videa s českými titulky',
          'Nejnovější trendy a hrozby v kybernetické bezpečnosti',
          'Praktické příklady z reálného prostředí',
          'Interaktivní kvízy a testy po každém videu',
          'Mobilní aplikace pro vzdělávání kdykoliv',
          'Certifikace po dokončení kurzů'
        ],
        features: [
          '50+ hodin video obsahu',
          '15 specializovaných kategorií',
          'Měsíční aktualizace obsahu',
          'Offline přehrávání'
        ]
      }
    },
    {
      icon: Users,
      title: 'Firemní školení',
      description: 'Komplexní školení pro vaše zaměstnance s praktickými příklady',
      stats: '1000+ školených',
      details: {
        title: 'Firemní školení na míru',
        subtitle: 'Přizpůsobte školení potřebám vaší organizace',
        content: [
          'Školení přímo ve vaší firmě nebo online',
          'Přizpůsobené obsahu specifickým potřebám',
          'Certifikovaní lektoři s praxí',
          'Interaktivní workshopy a simulace',
          'Materiály v češtině i angličtině',
          'Následná podpora a konzultace'
        ],
        features: [
          '1000+ spokojených účastníků',
          '50+ realizovaných projektů',
          '98% míra spokojenosti',
          '24/7 technická podpora'
        ]
      }
    },
    {
      icon: Shield,
      title: 'Security Awareness',
      description: 'Zvyšte povědomí o bezpečnosti ve vaší organizaci',
      stats: '99% úspěšnost',
      details: {
        title: 'Zvyšte povědomí o bezpečnosti',
        subtitle: 'Transformujte vaše zaměstnance na první linii obrany',
        content: [
          'Komplexní program awareness kampaní',
          'Phishing simulace s reálnými scénáři',
          'Měření a reportování pokroku',
          'Gamifikace pro vyšší angažovanost',
          'Personalizované vzdělávací cesty',
          'Integrace s existujícími systémy'
        ],
        features: [
          '99% úspěšnost programů',
          '70% snížení incidentů',
          'ROI do 6 měsíců',
          'Mezinárodní certifikace'
        ]
      }
    },
    {
      icon: TrendingUp,
      title: 'Měřitelné výsledky',
      description: 'Sledujte pokrok a efektivitu vašich bezpečnostních opatření',
      stats: '85% zlepšení',
      details: {
        title: 'Měřitelné a ověřitelné výsledky',
        subtitle: 'Data-driven přístup k cybersecurity vzdělávání',
        content: [
          'Pokročilé analytické dashboardy',
          'Real-time monitoring pokroku',
          'Detailní reporty pro management',
          'Benchmarking s odvětvím',
          'Prediktivní analýzy rizik',
          'Automatizované doporučení'
        ],
        features: [
          '85% průměrné zlepšení',
          '12 měsíců sledování',
          'AI-powered insights',
          'Export do všech formátů'
        ]
      }
    }
  ]

  const videoCategories = [
    {
      title: 'Phishing útoky',
      description: 'Naučte se rozpoznat a předcházet phishingovým útokům',
      price: '2 990 Kč',
      duration: '45 min',
      level: 'Začátečník',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Sociální inženýrství',
      description: 'Pochopte taktiky útočníků a efektivní obranné strategie',
      price: '3 490 Kč',
      duration: '60 min',
      level: 'Pokročilý',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Bezpečnost hesel',
      description: 'Best practices pro vytváření a správu bezpečných hesel',
      price: '1 990 Kč',
      duration: '30 min',
      level: 'Začátečník',
      image: '/api/placeholder/400/300'
    }
  ]

  // State pro carousel testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  // State pro modální okna
  const [openModal, setOpenModal] = useState<number | null>(null)
  const [isModalAnimating, setIsModalAnimating] = useState(false)

  const testimonials = [
    {
      text: "Díky SecurityShield jsme výrazně zlepšili bezpečnostní povědomí našich zaměstnanců. Videa jsou velmi kvalitní a praktická.",
      author: "Jan Novák",
      position: "IT Manager",
      company: "TechCorp s.r.o.",
      rating: 5,
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      color: "from-blue-600 to-purple-600"
    },
    {
      text: "Investice do security awareness se nám rychle vrátila. Počet bezpečnostních incidentů se snížil o 70%.",
      author: "Marie Svobodová",
      position: "CISO",
      company: "SecureBank a.s.",
      rating: 5,
      companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=80&h=80&fit=crop&crop=face",
      color: "from-green-600 to-teal-600"
    },
    {
      text: "Skvělé školení, naši zaměstnanci si konečně uvědomili důležitost kybernetické bezpečnosti. Doporučuji každé firmě!",
      author: "Petr Dvořák",
      position: "CEO",
      company: "InnovateTech Ltd.",
      rating: 5,
      companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      color: "from-orange-600 to-red-600"
    },
    {
      text: "Profesionální přístup a kvalitní obsah. SecurityShield nám pomohl vybudovat silnou bezpečnostní kulturu.",
      author: "Anna Procházková",
      position: "HR Director",
      company: "MegaCorp a.s.",
      rating: 5,
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      color: "from-pink-600 to-purple-600"
    },
    {
      text: "Návratnost investice byla rychlejší než jsme očekávali. Výborné video materiály a skvělá podpora.",
      author: "Tomáš Krejčí",
      position: "Security Manager",
      company: "FinanceHub s.r.o.",
      rating: 5,
      companyLogo: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=200&h=200&fit=crop",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      color: "from-indigo-600 to-blue-600"
    }
  ]

  // Funkce pro animované otevření modálu
  const openModalWithAnimation = (index: number) => {
    setIsModalAnimating(false)
    setOpenModal(index)
  }

  // Funkce pro animované zavření modálu
  const closeModalWithAnimation = () => {
    setIsModalAnimating(false)
    setTimeout(() => {
      setOpenModal(null)
    }, 300) // Doba animace
  }

  // Automatická rotace testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000) // Každé 4 sekundy

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Spustí animaci po otevření modálu
  useEffect(() => {
    if (openModal !== null) {
      setTimeout(() => {
        setIsModalAnimating(true)
      }, 10) // Malé zpoždění pro smooth animaci
    }
  }, [openModal])

  return (
    <Layout>
      {/* Hero sekce */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Levá strana - text */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text-blue">Security</span>
                  <br />
                  <span className="text-white">Awareness</span>
                  <br />
                                            <span className="gradient-text-blue">Platform</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Moderní platforma pro vzdělávání v oblasti kybernetické bezpečnosti. 
                  Získejte exkluzivní vzdělávací videa a chraňte svou firmu před kybernetickými hrozbami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-security-primary group">
                  Prozkoumat videa
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="btn-security-outline group">
                  <Play className="w-5 h-5 mr-2" />
                  Sledovat demo
                </button>
              </div>

              {/* Statistiky */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '50+', label: 'Vzdělávacích videí' },
                  { value: '1000+', label: 'Spokojených klientů' },
                  { value: '99%', label: 'Úspěšnost školení' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold gradient-text-blue">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pravá strana - Spline 3D model */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative w-full h-[500px] lg:h-[600px] flex items-start justify-center">
                {/* Spline 3D model - ideální velikost a pozice */}
                <div className="w-full h-full rounded-2xl relative" style={{transform: 'scale(0.9)'}}>
                  <spline-viewer 
                    url="https://prod.spline.design/tKrswD8O3N6iPASY/scene.splinecode"
                    style={{
                      width: '100%', 
                      height: '100%',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                    mouseControls={false}
                    touchControls={false}
                    loading-anim-type="spinner-small-dark"
                  ></spline-viewer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features sekce - posunutá výše s modály */}
      <section className="py-16" data-section="features">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
          visibleSections.has('features') 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Proč si vybrat <span className="gradient-text-blue">SecurityShield</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Naše platforma poskytuje komplexní řešení pro zvýšení security awareness ve vaší organizaci
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="security-card security-card-hover group cursor-pointer"
                onClick={() => openModalWithAnimation(index)}
              >
                <div className="w-12 h-12 security-gradient-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-security-blue-400 font-semibold">{feature.stats}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-security-blue-400 transition-colors duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modální okna s animacemi */}
      {openModal !== null && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModalWithAnimation}
        >
          <div 
            className={`bg-black/40 backdrop-blur-xl border border-security-blue-600/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${
              isModalAnimating 
                ? 'scale-100 opacity-100 translate-y-0' 
                : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className={`relative p-8 border-b border-gray-700/50 transition-all duration-500 delay-100 ${
              isModalAnimating ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-security-blue-600 via-security-blue-400 to-security-blue-600"></div>
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 security-gradient-blue rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 delay-200 ${
                    isModalAnimating ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
                  }`}>
                    {(() => {
                      const IconComponent = features[openModal].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div className={`transition-all duration-500 delay-300 ${
                    isModalAnimating ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {features[openModal].details.title}
                    </h3>
                    <p className="text-security-blue-400 font-medium">
                      {features[openModal].details.subtitle}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={closeModalWithAnimation}
                  className={`w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90 ${
                    isModalAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                  style={{ transitionDelay: isModalAnimating ? '400ms' : '0ms' }}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`p-8 overflow-y-auto max-h-[calc(90vh-200px)] transition-all duration-500 delay-200 ${
              isModalAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Hlavní obsah */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className={`text-xl font-semibold text-white mb-4 transition-all duration-500 delay-300 ${
                      isModalAnimating ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}>Co zahrnujeme:</h4>
                    <div className="space-y-3">
                      {features[openModal].details.content.map((item, index) => (
                        <div 
                          key={index} 
                          className={`flex items-start space-x-3 transition-all duration-500 ${
                            isModalAnimating ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                          }`}
                          style={{ transitionDelay: isModalAnimating ? `${400 + index * 100}ms` : '0ms' }}
                        >
                          <div className="w-2 h-2 bg-security-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Statistiky sidebar */}
                <div className={`space-y-6 transition-all duration-500 delay-400 ${
                  isModalAnimating ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="bg-gradient-to-br from-security-blue-600/10 to-security-blue-400/10 rounded-xl p-6 border border-security-blue-600/20">
                    <h4 className="text-lg font-semibold text-white mb-4">Klíčové údaje:</h4>
                    <div className="space-y-4">
                      {features[openModal].details.features.map((feature, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center space-x-3 transition-all duration-500 ${
                            isModalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                          }`}
                          style={{ transitionDelay: isModalAnimating ? `${500 + index * 100}ms` : '0ms' }}
                        >
                          <div className="w-8 h-8 bg-security-blue-600/30 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-security-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full btn-security-primary text-center py-4 px-6 rounded-xl font-semibold transition-all duration-500 delay-700 hover:scale-105 ${
                    isModalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}>
                    Začít zdarma
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animovaná galerie */}
      <section className="py-24" data-section="gallery">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
          visibleSections.has('gallery') 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Naše <span className="gradient-text-blue">portfólio</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Kreativní galerie našich nejlepších projektů a realizací
            </p>
          </div>

          {/* Animovaná galerie */}
          <div className="relative overflow-hidden">
            {/* Fade efekty po stranách - uvnitř kontejneru */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
            
            {/* Horní řada - pohyb doprava na scroll (smooth optimalizovaná) */}
            <div 
              className="mb-6 gallery-scroll-row"
              style={{
                transform: `translate3d(${-scrollY * 0.12}px, 0, 0)`,
                width: '400%'
              }}
            >
              <div className="flex space-x-6">
                {/* Původní sada */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop" alt="Project 1" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop" alt="Project 2" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop" alt="Project 3" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop" alt="Project 4" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 5" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop" alt="Project 6" className="gallery-image" />
                </div>
                
                {/* Duplikace 1 - pro nekonečný efekt */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop" alt="Project 1" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop" alt="Project 2" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop" alt="Project 3" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop" alt="Project 4" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 5" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop" alt="Project 6" className="gallery-image" />
                </div>
                
                {/* Duplikace 2 - pro extra dlouhý scroll */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop" alt="Project 1" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop" alt="Project 2" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop" alt="Project 3" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop" alt="Project 4" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 5" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop" alt="Project 6" className="gallery-image" />
                </div>
                    </div>
                  </div>
                  
            {/* Spodní řada - pohyb doleva na scroll (smooth optimalizovaná) */}
            <div 
              className="gallery-scroll-row"
              style={{
                transform: `translate3d(${-1200 + scrollY * 0.08}px, 0, 0)`,
                width: '400%'
              }}
            >
              <div className="flex space-x-6">
                {/* Původní sada */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=240&fit=crop" alt="Project 7" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=240&fit=crop" alt="Project 8" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=240&fit=crop" alt="Project 9" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=240&fit=crop" alt="Project 10" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 11" className="gallery-image" />
                  </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop" alt="Project 12" className="gallery-image" />
                </div>
                
                {/* Duplikace 1 - pro nekonečný efekt */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=240&fit=crop" alt="Project 7" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=240&fit=crop" alt="Project 8" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=240&fit=crop" alt="Project 9" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=240&fit=crop" alt="Project 10" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 11" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop" alt="Project 12" className="gallery-image" />
                  </div>
                  
                {/* Duplikace 2 - pro extra dlouhý scroll */}
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=240&fit=crop" alt="Project 7" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=240&fit=crop" alt="Project 8" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=240&fit=crop" alt="Project 9" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=240&fit=crop" alt="Project 10" className="gallery-image" />
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop" alt="Project 11" className="gallery-image" />
                  </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop" alt="Project 12" className="gallery-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moderní Testimonials Grid */}
      <section className="py-24" data-section="testimonials">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
          visibleSections.has('testimonials') 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}>
          
          {/* Nadpis s moderním designem */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-security-blue-600/10 to-purple-600/10 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-security-blue-400" />
              <span className="text-security-blue-400 font-medium">Zákaznické recenze</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Co říkají naši <span className="gradient-text-blue">klienti</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Přečtěte si zkušenosti našich spokojených zákazníků
            </p>
          </div>

          {/* 3D Carousel - 5 karet v řadě */}
          <div className="relative max-w-6xl mx-auto h-80">
            <div className="absolute inset-0 flex items-center justify-center perspective-1000">
              <div className="relative w-full h-full">
                {testimonials.map((testimonial, index) => {
                  // Relativní pozice od aktivní karty
                  const relativePosition = (index - currentTestimonial + testimonials.length) % testimonials.length
                  
                  let transform = ''
                  let zIndex = 1
                  let opacity = 1
                  let scale = 1
                  
                  // 5 pozic: -2, -1, 0 (střed), +1, +2
                  if (relativePosition === 0) {
                    // Střední karta (aktivní)
                    transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)'
                    zIndex = 10
                    opacity = 1
                  } else if (relativePosition === 1 || relativePosition === testimonials.length - 1) {
                    // Sousední karty (+1 a -1)
                    const side = relativePosition === 1 ? 1 : -1
                    transform = `translateX(${side * 200}px) translateZ(-50px) rotateY(${side * 18}deg) scale(0.85)`
                    zIndex = 8
                    opacity = 0.8
                  } else if (relativePosition === 2 || relativePosition === testimonials.length - 2) {
                    // Vnější karty (+2 a -2)  
                    const side = relativePosition === 2 ? 1 : -1
                    transform = `translateX(${side * 340}px) translateZ(-100px) rotateY(${side * 32}deg) scale(0.7)`
                    zIndex = 6
                    opacity = 0.6
                  } else {
                    // Skryté karty (nebudou vidět při 5 kartách)
                    transform = `translateX(0px) translateZ(-300px) scale(0.3)`
                    zIndex = 1
                    opacity = 0
                  }
                  
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out cursor-pointer"
                      style={{
                        transform,
                        zIndex,
                        opacity,
                        transformStyle: 'preserve-3d'
                      }}
                      onClick={() => setCurrentTestimonial(index)}
                    >
                      <div className="w-72 h-56 group testimonial-card p-4 relative overflow-hidden will-change-transform">
                        {/* Header s logem firmy */}
                        <div className="flex items-center justify-between mb-4">
                          {/* Logo firmy */}
                          <img 
                            src={testimonial.companyLogo} 
                            alt={testimonial.company}
                            className="w-16 h-10 object-cover rounded-lg shadow-md border border-gray-700/50"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.company)}&background=1f2937&color=ffffff&size=200&length=2`
                            }}
                          />
                          
                          {/* Quote ikona */}
                          <div className="w-6 h-6 bg-gradient-to-br from-security-blue-500 to-security-blue-600 rounded-lg flex items-center justify-center shadow-md">
                            <Quote className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        {/* Recenze - největší část */}
                        <div className="mb-4">
                          <p className="text-gray-200 leading-relaxed italic text-sm min-h-[80px]">
                            "{testimonial.text.length > 140 ? testimonial.text.substring(0, 140) + '...' : testimonial.text}"
                          </p>
                        </div>
                        
                        {/* Název firmy - decentní */}
                        <div className="mb-3">
                          <div className="text-security-blue-400 text-xs font-medium opacity-80">
                            {testimonial.company}
                          </div>
                        </div>
                        
                        {/* Hodnocení hvězdičkami */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                      ))}
                          </div>
                    </div>
                    
                        {/* Malý profilový obrázek uživatele dole */}
                        <div className="flex items-center space-x-2">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-8 h-8 rounded-full object-cover border border-security-blue-400/30 shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=3b82f6&color=ffffff&size=80`
                            }}
                          />
                    <div>
                            <div className="text-white font-medium text-xs">
                              {testimonial.author}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {testimonial.position}
                    </div>
                  </div>
                </div>
                        
                        {/* Glow pro aktivní kartu */}
                        {relativePosition === 0 && (
                          <div className="absolute inset-0 bg-gradient-to-br from-security-blue-600/10 to-security-blue-400/10 rounded-xl"></div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Indikátory */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-security-blue-400 w-6'
                      : 'bg-gray-600 hover:bg-security-blue-400/50'
                  }`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Statistiky dolní */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-20 pt-16 border-t border-gray-700/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400 text-sm">Spokojených klientů</div>
            </div>
            <div className="w-px h-12 bg-gray-700/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-gray-400 text-sm">Průměrné hodnocení</div>
            </div>
            <div className="w-px h-12 bg-gray-700/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99%</div>
              <div className="text-gray-400 text-sm">Míra spokojenosti</div>
            </div>
          </div>
          
          {/* Dekorativní prvek */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-security-blue-400"></div>
              <div className="w-3 h-3 bg-security-blue-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-security-blue-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="py-24 relative overflow-hidden" data-section="cta">
        <div className={`relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.has('cta') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Připraveni <span className="gradient-text-blue">chránit</span> vaši firmu?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Začněte ještě dnes a zvyšte security awareness ve vaší organizaci
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-security-primary text-lg px-8 py-4">
              Začít zdarma
              <ArrowRight className="w-6 h-6 ml-2" />
            </button>
            <button className="btn-security-outline text-lg px-8 py-4">
              Kontaktovat nás
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            <CheckCircle className="w-4 h-4 inline mr-2 text-green-400" />
            Bez závazků • 30 dní záruka vrácení peněz
          </div>
        </div>
      </section>
    </Layout>
  )
} 