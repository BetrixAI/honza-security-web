'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Star {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  brightness: number
}

export default function GalaxyBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [connections, setConnections] = useState<Array<{from: Star, to: Star, opacity: number}>>([])
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<number>()
  
  // Jednoduché nastavení pro výkon
  const STAR_COUNT = 25 // Jen 25 hvězd pro perfektní výkon
  const CONNECTION_DISTANCE = 200
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Seed funkce pro konzistentní pozice
  const seededRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // Vytvoření hvězd
  useEffect(() => {
    if (!mounted) return

    const newStars = Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7.123) * window.innerWidth,
      y: seededRandom(i * 9.456) * window.innerHeight,
      vx: (seededRandom(i * 3.789) - 0.5) * 0.5,
      vy: (seededRandom(i * 5.234) - 0.5) * 0.5,
      size: seededRandom(i * 2.567) * 3 + 2, // 2-5px
      brightness: seededRandom(i * 8.901) * 0.6 + 0.4 // 0.4-1.0
    }))

    setStars(newStars)
  }, [mounted])

  // Animace
  useEffect(() => {
    if (!mounted || stars.length === 0) return

    const animate = () => {
      setStars(prevStars => {
        const newStars = prevStars.map(star => {
          let newX = star.x + star.vx
          let newY = star.y + star.vy
          let newVx = star.vx
          let newVy = star.vy

          // Odraz od okrajů
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -newVx
            newX = Math.max(0, Math.min(window.innerWidth, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -newVy
            newY = Math.max(0, Math.min(window.innerHeight, newY))
          }

          return { ...star, x: newX, y: newY, vx: newVx, vy: newVy }
        })

        // Najít spojení
        const newConnections: Array<{from: Star, to: Star, opacity: number}> = []
        for (let i = 0; i < newStars.length; i++) {
          for (let j = i + 1; j < newStars.length; j++) {
            const dx = newStars[i].x - newStars[j].x
            const dy = newStars[i].y - newStars[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < CONNECTION_DISTANCE) {
              const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.5
              newConnections.push({
                from: newStars[i],
                to: newStars[j],
                opacity
              })
            }
          }
        }

        setConnections(newConnections)
        return newStars
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, stars.length])

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Hvězdy */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-blue-400 shadow-lg animate-pulse"
          style={{
            left: star.x + 'px',
            top: star.y + 'px',
            width: star.size + 'px',
            height: star.size + 'px',
            opacity: star.brightness,
            boxShadow: `0 0 ${star.size * 2}px rgba(59, 130, 246, ${star.brightness})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* SVG pro spojení */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
        
        {connections.map((connection, index) => (
          <line
            key={index}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="url(#connectionGrad)"
            strokeWidth="1"
            opacity={connection.opacity}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  )
}