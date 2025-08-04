/**
 * Gamification hooks - XP, levels, badges management
 * Owner: Kubca - dashboard gamification system
 */

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  getLevelProgress, 
  calculateLevel,
  getXpForLevel,
  PREDEFINED_BADGES,
  checkBadgeEligibility,
  type XpAction
} from '@/lib/gamification'
import { doc, onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore'
import { getFirebaseFirestore } from '@/lib/firebaseClient'
import type { User, Badge, LessonProgress } from '@/types'

interface UserStats {
  completedLessons: number
  longestStreak: number
  actionCounts: Record<XpAction, number>
  currentStreak: number
  totalXpEarned: number
}

interface LeaderboardEntry {
  uid: string
  displayName: string
  level: number
  xp: number
  photoURL?: string
}

// Hook for current user's XP and level data
export function useUserXP() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [userXP, setUserXP] = useState(0)
  const [userLevel, setUserLevel] = useState(1)
  
  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    const db = getFirebaseFirestore()
    const userDocRef = doc(db, 'users', user.uid)
    
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as User
        setUserXP(userData.xp || 0)
        setUserLevel(userData.level || 1)
      }
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to user XP:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.uid])

  const levelProgress = getLevelProgress(userXP)
  
  return {
    userXP,
    userLevel,
    levelProgress,
    isLoading
  }
}

// Hook for user's earned badges
export function useUserBadges() {
  const { user } = useAuth()
  const [badges, setBadges] = useState<Badge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    const db = getFirebaseFirestore()
    const badgesQuery = query(
      collection(db, 'users', user.uid, 'badges'),
      orderBy('earnedAt', 'desc')
    )
    
    const unsubscribe = onSnapshot(badgesQuery, (snapshot) => {
      const userBadges = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Badge[]
      
      setBadges(userBadges)
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to user badges:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.uid])

  return {
    badges,
    isLoading,
    earnedBadgeIds: badges.map(b => b.badgeId),
    newBadges: badges.filter(b => !b.seen)
  }
}

// Hook for user statistics and progress
export function useUserStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<UserStats>({
    completedLessons: 0,
    longestStreak: 0,
    actionCounts: {} as Record<XpAction, number>,
    currentStreak: 0,
    totalXpEarned: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    // Listen to lesson progress
    const db = getFirebaseFirestore()
    const lessonProgressQuery = query(
      collection(db, 'users', user.uid, 'lessonProgress'),
      orderBy('completedAt', 'desc')
    )
    
    const unsubscribe = onSnapshot(lessonProgressQuery, (snapshot) => {
      const lessons = snapshot.docs.map(doc => doc.data()) as LessonProgress[]
      
      // Calculate stats
      const completedLessons = lessons.length
      const totalXpEarned = lessons.reduce((sum, lesson) => sum + lesson.xpEarned, 0)
      
      // TODO: Calculate streaks and action counts from actual data
      // For now, using placeholder values
      setStats({
        completedLessons,
        longestStreak: 0,
        actionCounts: {} as Record<XpAction, number>,
        currentStreak: 0,
        totalXpEarned
      })
      
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to user stats:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.uid])

  return {
    stats,
    isLoading
  }
}

// Hook for company leaderboard
export function useLeaderboard(limit_param = 10) {
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [userRank, setUserRank] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!user?.companyId) {
      setIsLoading(false)
      return
    }

    const db = getFirebaseFirestore()
    const leaderboardQuery = query(
      collection(db, 'users'),
      where('companyId', '==', user.companyId),
      orderBy('xp', 'desc'),
      limit(limit_param)
    )
    
    const unsubscribe = onSnapshot(leaderboardQuery, (snapshot) => {
      const entries: LeaderboardEntry[] = []
      let rank = 1
      
      snapshot.docs.forEach((doc) => {
        const userData = doc.data() as User
        entries.push({
          uid: userData.uid,
          displayName: userData.displayName,
          level: calculateLevel(userData.xp),
          xp: userData.xp,
          photoURL: userData.photoURL
        })
        
        if (userData.uid === user.uid) {
          setUserRank(rank)
        }
        rank++
      })
      
      setLeaderboard(entries)
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to leaderboard:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.companyId, user?.uid, limit_param])

  return {
    leaderboard,
    userRank,
    isLoading
  }
}

// Hook for checking new badge eligibility
export function useBadgeChecker() {
  const { user } = useAuth()
  const { userXP, userLevel } = useUserXP()
  const { stats } = useUserStats()
  const { earnedBadgeIds } = useUserBadges()
  
  const checkNewBadges = () => {
    if (!user) return []
    
    const newBadges: string[] = []
    
    Object.entries(PREDEFINED_BADGES).forEach(([badgeId, badgeData]) => {
      // Skip if already earned
      if (earnedBadgeIds.includes(badgeId)) return
      
      // Check eligibility
      const isEligible = checkBadgeEligibility(
        { ...user, level: userLevel, xp: userXP },
        badgeData.criteria,
        stats
      )
      
      if (isEligible) {
        newBadges.push(badgeId)
      }
    })
    
    return newBadges
  }
  
  return {
    checkNewBadges,
    eligibleBadges: checkNewBadges()
  }
}

// Main gamification hook that combines all features
export function useGameification() {
  const userXP = useUserXP()
  const badges = useUserBadges()
  const stats = useUserStats()
  const leaderboard = useLeaderboard()
  
  return {
    level: userXP.userLevel,
    xp: userXP.userXP,
    nextLevelXp: getXpForLevel(userXP.userLevel + 1),
    badges: badges.badges,
    stats: stats.stats,
    leaderboard: leaderboard.leaderboard,
    userRank: leaderboard.userRank,
    isLoading: userXP.isLoading || badges.isLoading
  }
}

// Hook for XP animations and notifications
export function useXPNotifications() {
  const [xpGains, setXpGains] = useState<Array<{
    id: string
    amount: number
    source: string
    timestamp: number
  }>>([])
  
  const addXpGain = (amount: number, source: string) => {
    const gain = {
      id: Math.random().toString(36),
      amount,
      source,
      timestamp: Date.now()
    }
    
    setXpGains(prev => [...prev, gain])
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setXpGains(prev => prev.filter(g => g.id !== gain.id))
    }, 3000)
  }
  
  const clearXpGains = () => setXpGains([])
  
  return {
    xpGains,
    addXpGain,
    clearXpGains
  }
}