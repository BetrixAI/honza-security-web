/**
 * Gamification engine - XP, levels, badges
 * Owner: Shared - XP calculation and level system
 */

import { User, LessonProgress } from '../types';

// XP rewards as defined in .cursorrules
export const XP_REWARDS = {
  // Lessons: 5 × lesson.durationMin for ≥80% score
  LESSON_BASE_MULTIPLIER: 5,
  LESSON_MIN_SCORE: 80,
  
  // Fixed XP rewards
  PHISHING_SIMULATION_PASSED: 20,
  REPORT_REAL_THREAT: 15,
  VIRUSTOTAL_MALICIOUS_FOUND: 10,
  URL_SANDBOX_FINISHED: 10,
  HIBP_BREACH_DETECTED: 5,
  SHODAN_EXPOSURE_FIXED: 20,
  ATTACK_REPLAY_SUCCESS: 25,
  
  // Daily login streak (progressive)
  DAILY_LOGIN_STREAK_BASE: 1, // +n where n = streak days
  DAILY_LOGIN_STREAK_MAX: 10,
} as const;

// Level formula: level = floor(sqrt(xp / 25)) + 1
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 25)) + 1;
}

// XP required for next level
export function getXpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 25;
}

// XP required to reach next level from current XP
export function getXpToNextLevel(currentXp: number): { current: number; next: number; required: number } {
  const currentLevel = calculateLevel(currentXp);
  const nextLevel = currentLevel + 1;
  const nextLevelXp = getXpForLevel(nextLevel);
  
  return {
    current: currentLevel,
    next: nextLevel,
    required: nextLevelXp - currentXp,
  };
}

// Calculate XP for lesson completion
export function calculateLessonXp(durationMin: number, score: number): number {
  if (score < XP_REWARDS.LESSON_MIN_SCORE) {
    return 0; // No XP for scores below 80%
  }
  
  return XP_REWARDS.LESSON_BASE_MULTIPLIER * durationMin;
}

// Calculate daily login streak XP
export function calculateStreakXp(streakDays: number): number {
  if (streakDays < 5) {
    return 0; // No XP for streaks less than 5 days
  }
  
  // Progressive XP: starts at 5, increases by 1 each day, max 10
  const xp = Math.min(streakDays, XP_REWARDS.DAILY_LOGIN_STREAK_MAX);
  return xp;
}

// XP action types
export type XpAction = 
  | 'lesson-completed'
  | 'phishing-simulation-passed'
  | 'real-threat-reported'
  | 'virustotal-malicious'
  | 'url-sandbox-finished'
  | 'hibp-breach-detected'
  | 'shodan-exposure-fixed'
  | 'attack-replay-success'
  | 'daily-login-streak';

// Calculate XP for various actions
export function calculateActionXp(
  action: XpAction, 
  metadata?: { 
    durationMin?: number; 
    score?: number; 
    streakDays?: number;
  }
): number {
  switch (action) {
    case 'lesson-completed':
      if (!metadata?.durationMin || !metadata?.score) return 0;
      return calculateLessonXp(metadata.durationMin, metadata.score);
      
    case 'phishing-simulation-passed':
      return XP_REWARDS.PHISHING_SIMULATION_PASSED;
      
    case 'real-threat-reported':
      return XP_REWARDS.REPORT_REAL_THREAT;
      
    case 'virustotal-malicious':
      return XP_REWARDS.VIRUSTOTAL_MALICIOUS_FOUND;
      
    case 'url-sandbox-finished':
      return XP_REWARDS.URL_SANDBOX_FINISHED;
      
    case 'hibp-breach-detected':
      return XP_REWARDS.HIBP_BREACH_DETECTED;
      
    case 'shodan-exposure-fixed':
      return XP_REWARDS.SHODAN_EXPOSURE_FIXED;
      
    case 'attack-replay-success':
      return XP_REWARDS.ATTACK_REPLAY_SUCCESS;
      
    case 'daily-login-streak':
      if (!metadata?.streakDays) return 0;
      return calculateStreakXp(metadata.streakDays);
      
    default:
      return 0;
  }
}

// Badge criteria types
export interface BadgeCriteria {
  type: 'xp' | 'lessons' | 'streak' | 'actions' | 'level';
  requirement: number;
  category?: string;
  action?: XpAction;
}

// Check if user earned a badge
export function checkBadgeEligibility(
  user: User,
  criteria: BadgeCriteria,
  userStats?: {
    completedLessons: number;
    longestStreak: number;
    actionCounts: Record<XpAction, number>;
  }
): boolean {
  switch (criteria.type) {
    case 'xp':
      return user.xp >= criteria.requirement;
      
    case 'level':
      return user.level >= criteria.requirement;
      
    case 'lessons':
      return (userStats?.completedLessons || 0) >= criteria.requirement;
      
    case 'streak':
      return (userStats?.longestStreak || 0) >= criteria.requirement;
      
    case 'actions':
      if (!criteria.action || !userStats?.actionCounts) return false;
      return userStats.actionCounts[criteria.action] >= criteria.requirement;
      
    default:
      return false;
  }
}

// Predefined badges according to gamification system
export const PREDEFINED_BADGES = {
  // XP milestones
  'first-blood': {
    id: 'first-blood',
    criteria: { type: 'xp' as const, requirement: 100 },
    icon: '🎯',
  },
  'rising-star': {
    id: 'rising-star', 
    criteria: { type: 'xp' as const, requirement: 500 },
    icon: '⭐',
  },
  'security-guru': {
    id: 'security-guru',
    criteria: { type: 'xp' as const, requirement: 2000 },
    icon: '🧠',
  },
  
  // Level milestones
  'level-5': {
    id: 'level-5',
    criteria: { type: 'level' as const, requirement: 5 },
    icon: '🏆',
  },
  'level-10': {
    id: 'level-10',
    criteria: { type: 'level' as const, requirement: 10 },
    icon: '👑',
  },
  
  // Lesson milestones
  'first-lesson': {
    id: 'first-lesson',
    criteria: { type: 'lessons' as const, requirement: 1 },
    icon: '📚',
  },
  'dedicated-learner': {
    id: 'dedicated-learner',
    criteria: { type: 'lessons' as const, requirement: 10 },
    icon: '🎓',
  },
  'knowledge-master': {
    id: 'knowledge-master',
    criteria: { type: 'lessons' as const, requirement: 50 },
    icon: '🧙‍♂️',
  },
  
  // Streak milestones
  'consistent': {
    id: 'consistent',
    criteria: { type: 'streak' as const, requirement: 7 },
    icon: '🔥',
  },
  'unstoppable': {
    id: 'unstoppable',
    criteria: { type: 'streak' as const, requirement: 30 },
    icon: '⚡',
  },
  
  // Action-specific badges
  'phishing-defender': {
    id: 'phishing-defender',
    criteria: { type: 'actions' as const, requirement: 5, action: 'phishing-simulation-passed' },
    icon: '🛡️',
  },
  'threat-hunter': {
    id: 'threat-hunter',
    criteria: { type: 'actions' as const, requirement: 3, action: 'real-threat-reported' },
    icon: '🔍',
  },
  'virus-buster': {
    id: 'virus-buster',
    criteria: { type: 'actions' as const, requirement: 5, action: 'virustotal-malicious' },
    icon: '🦠',
  },
} as const;

// Get user's level progress (for UI display)
export function getLevelProgress(xp: number): {
  currentLevel: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  xpToNext: number;
} {
  const currentLevel = calculateLevel(xp);
  const currentLevelXp = getXpForLevel(currentLevel);
  const nextLevelXp = getXpForLevel(currentLevel + 1);
  const xpInLevel = xp - currentLevelXp;
  const xpNeededForLevel = nextLevelXp - currentLevelXp;
  const progressPercent = (xpInLevel / xpNeededForLevel) * 100;
  
  return {
    currentLevel,
    currentLevelXp,
    nextLevelXp,
    progressPercent: Math.min(progressPercent, 100),
    xpToNext: nextLevelXp - xp,
  };
}

// Check if content is gated by level
export function isContentLocked(userLevel: number, requiredLevel: number): boolean {
  return userLevel < requiredLevel;
}

// Get leaderboard rank calculation
export function calculateLeaderboardRank(userXp: number, allUsersXp: number[]): number {
  const sortedXp = allUsersXp.sort((a, b) => b - a);
  return sortedXp.indexOf(userXp) + 1;
}