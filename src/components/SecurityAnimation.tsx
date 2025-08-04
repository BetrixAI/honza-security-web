'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Scan, Zap, Activity } from 'lucide-react'

export default function SecurityAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Centrální štít */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-700/40 backdrop-blur-sm border-2 border-blue-400/30 flex items-center justify-center rounded-3xl shadow-2xl"
        >
          <Shield className="w-16 h-16 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Orbitální bezpečnostní ikony */}
      {[Lock, Eye, Scan, Zap, Activity].map((Icon, index) => {
        const angle = (index * 72) // 72 stupňů rozestup (360/5)
        const radius = 100
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [x - 20, x - 20],
              y: [y - 20, y - 20],
              rotate: 360
            }}
            transition={{
              opacity: { delay: 0.5 + index * 0.1, duration: 0.5 },
              scale: { delay: 0.5 + index * 0.1, duration: 0.5 },
              rotate: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.8
              }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-blue-700/20 backdrop-blur-sm border border-blue-400/20 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Icon className="w-5 h-5 text-blue-400/80" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Animované bezpečnostní vlny */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-blue-400/10 rounded-full pointer-events-none"
          style={{
            width: `${200 + i * 80}px`,
            height: `${200 + i * 80}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ 
            duration: 6 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}

      {/* Bezpečnostní částice */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
            x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Skenování efekt */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-3xl"
        animate={{
          borderColor: ['rgba(59, 130, 246, 0)', 'rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0)']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Bezpečnostní data stream */}
      <motion.div
        className="absolute right-4 top-4 space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 bg-green-400/60 rounded-full"
            style={{ width: `${20 + Math.random() * 30}px` }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Status indikátor */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center space-x-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-xs text-blue-400/70 font-mono">SECURED</span>
      </motion.div>
    </div>
  )
}