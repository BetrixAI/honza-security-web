/**
 * Global TypeScript types for SecureHero
 * Owner: Shared - extend without breaking existing APIs
 */

import { Timestamp } from 'firebase/firestore';
import type { SupportedLocale } from '../../locales';

// ===== AUTHENTICATION & USERS =====

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  companyId: string;
  role: UserRole;
  level: number;
  xp: number;
  locale: SupportedLocale;
  createdAt: Timestamp;
  lastLoginAt?: Timestamp;
}

export type UserRole = 'admin' | 'user';

export interface Company {
  id: string;
  name: string;
  domain?: string;
  locale: SupportedLocale;
  plan: BillingPlan;
  createdAt: Timestamp;
  ownerId: string;
}

// ===== BILLING & PLANS =====

export type BillingPlan = 'FREE' | 'PRO' | 'ENT';

export interface PlanQuotas {
  maxUsers: number;
  vtScansPerMonth: number;
  aiQueriesPerMonth: number;
  hibpCallsPerMonth: number;
  shodanScansPerMonth: number;
}

export interface BillingUsage {
  companyId: string;
  period: string; // YYYY-MM
  vtScansUsed: number;
  aiQueriesUsed: number;
  hibpCallsUsed: number;
  shodanScansUsed: number;
  lastUpdated: Timestamp;
}

// ===== GAMIFICATION =====

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  completedAt: Timestamp;
  xpEarned: number;
  locale: SupportedLocale;
  attempts: number;
}

export interface Lesson {
  id: string;
  title: Record<SupportedLocale, string>;
  content: Record<SupportedLocale, string>;
  category: LessonCategory;
  durationMin: number;
  levelRequired: number;
  difficulty: LessonDifficulty;
  xpReward: number;
  isActive: boolean;
  createdAt: Timestamp;
}

export type LessonCategory = 
  | 'phishing' 
  | 'passwords' 
  | 'malware' 
  | 'social-engineering' 
  | 'data-protection' 
  | 'mobile-security' 
  | 'incident-response';

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Badge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Timestamp;
  seen: boolean;
}

export interface BadgeCatalog {
  id: string;
  name: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  icon: string;
  criteriaJSON: string;
  xpRequired?: number;
  isActive: boolean;
}

export interface Mission {
  id: string;
  name: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  season: string;
  startDate: Timestamp;
  endDate: Timestamp;
  xpReward: number;
  participants: number;
  completions: number;
  isActive: boolean;
}

// ===== SECURITY SCANNING =====

export interface VTScanResult {
  id: string;
  userId: string;
  fileName: string;
  fileHash: string;
  status: VTScanStatus;
  analysisId?: string;
  verdict?: VTVerdict;
  detections?: number;
  totalEngines?: number;
  scanDate: Timestamp;
  resultDate?: Timestamp;
  xpAwarded?: number;
}

export type VTScanStatus = 'uploading' | 'scanning' | 'completed' | 'error';
export type VTVerdict = 'clean' | 'suspicious' | 'malicious';

export interface HIBPBreach {
  id: string;
  userId: string;
  email: string;
  breachName: string;
  breachDate: string;
  dataClasses: string[];
  isVerified: boolean;
  isSensitive: boolean;
  discoveredAt: Timestamp;
  notifiedAt?: Timestamp;
}

export interface URLScanResult {
  id: string;
  userId: string;
  url: string;
  scanId: string;
  status: URLScanStatus;
  verdict?: URLVerdict;
  screenshot?: string;
  reportUrl?: string;
  scanDate: Timestamp;
  resultDate?: Timestamp;
}

export type URLScanStatus = 'submitted' | 'scanning' | 'completed' | 'error';
export type URLVerdict = 'safe' | 'suspicious' | 'malicious';

export interface ShodanExposure {
  id: string;
  companyId: string;
  domain: string;
  ip: string;
  port: number;
  service: string;
  banner: string;
  severity: ThreatSeverity;
  discoveredAt: Timestamp;
  resolvedAt?: Timestamp;
  isResolved: boolean;
}

// ===== PHISHING & CAMPAIGNS =====

export interface PhishingCampaign {
  id: string;
  companyId: string;
  name: string;
  description: string;
  template: string;
  targetGroups: string[];
  launchDate: Timestamp;
  endDate?: Timestamp;
  status: CampaignStatus;
  stats: PhishingStats;
  createdBy: string;
}

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';

export interface PhishingStats {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  reported: number;
  credentials: number;
}

// ===== RISK ASSESSMENT =====

export interface RiskScore {
  id: string;
  companyId: string;
  period: string; // YYYY-MM
  awarenessScore: number;
  behaviourScore: number;
  cultureScore: number;
  totalScore: number;
  trend: 'up' | 'down' | 'stable';
  calculatedAt: Timestamp;
}

export interface RiskEvent {
  id: string;
  userId: string;
  companyId: string;
  type: RiskEventType;
  severity: ThreatSeverity;
  description: string;
  metadata: Record<string, any>;
  timestamp: Timestamp;
  resolved: boolean;
  resolvedAt?: Timestamp;
}

export type RiskEventType = 
  | 'phishing-clicked' 
  | 'malware-detected' 
  | 'breach-found' 
  | 'weak-password' 
  | 'suspicious-login' 
  | 'data-leak';

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

// ===== THREAT INTELLIGENCE =====

export interface ThreatFeedItem {
  id: string;
  title: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  severity: ThreatSeverity;
  category: ThreatCategory;
  source: string;
  iocs?: string[]; // Indicators of Compromise
  publishedAt: Timestamp;
  expiresAt?: Timestamp;
  isActive: boolean;
}

export type ThreatCategory = 'malware' | 'phishing' | 'ransomware' | 'apt' | 'vulnerability';

// ===== API RESPONSES =====

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ===== CLOUD FUNCTIONS =====

export interface CloudFunctionRequest<T = any> {
  data: T;
  locale?: SupportedLocale;
}

export interface CloudFunctionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: Record<SupportedLocale, string>;
}

// ===== UI COMPONENTS =====

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DashboardWidget {
  id: string;
  title: string;
  component: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  isVisible: boolean;
  config?: Record<string, any>;
}

// ===== ANALYTICS =====

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  companyId?: string;
  properties?: Record<string, any>;
  timestamp: Timestamp;
}