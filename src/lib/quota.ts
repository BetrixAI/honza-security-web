/**
 * Quota management for billing plans
 * Owner: Shared - billing & quota enforcement
 */

import { BillingPlan, PlanQuotas } from '../types';

// Plan quotas as defined in .cursorrules
export const PLAN_QUOTAS: Record<BillingPlan, PlanQuotas> = {
  FREE: {
    maxUsers: 30,
    vtScansPerMonth: 20,
    aiQueriesPerMonth: 100,
    hibpCallsPerMonth: 20,
    shodanScansPerMonth: 0,
  },
  PRO: {
    maxUsers: 500,
    vtScansPerMonth: 500,
    aiQueriesPerMonth: 5000,
    hibpCallsPerMonth: 500,
    shodanScansPerMonth: 4,
  },
  ENT: {
    maxUsers: 10000, // Large number for "unlimited"
    vtScansPerMonth: 999999,
    aiQueriesPerMonth: 999999,
    hibpCallsPerMonth: 999999,
    shodanScansPerMonth: 150, // 5 per day * 30 days
  },
};

// Actions that consume quota
export type QuotaAction = 
  | 'vt-scan' 
  | 'ai-query' 
  | 'hibp-call' 
  | 'shodan-scan'
  | 'user-add';

// Rate limits for external APIs
export const API_RATE_LIMITS = {
  virusTotal: {
    requestsPerMinute: 4,
    maxFileSize: 32 * 1024 * 1024, // 32 MB
  },
  hibp: {
    requestsPerSecond: 1,
  },
  urlscan: {
    scansPerDay: 60,
  },
  shodan: {
    requestsPerMinute: 100,
  },
} as const;

/**
 * Check if action is allowed based on current usage and plan
 */
export function checkQuota(
  plan: BillingPlan,
  action: QuotaAction,
  currentUsage: Record<string, number>
): { allowed: boolean; reason?: string } {
  const quotas = PLAN_QUOTAS[plan];
  
  switch (action) {
    case 'vt-scan':
      if (currentUsage.vtScansUsed >= quotas.vtScansPerMonth) {
        return { 
          allowed: false, 
          reason: 'VT_QUOTA_EXCEEDED'
        };
      }
      break;
      
    case 'ai-query':
      if (currentUsage.aiQueriesUsed >= quotas.aiQueriesPerMonth) {
        return { 
          allowed: false, 
          reason: 'AI_QUOTA_EXCEEDED'
        };
      }
      break;
      
    case 'hibp-call':
      if (currentUsage.hibpCallsUsed >= quotas.hibpCallsPerMonth) {
        return { 
          allowed: false, 
          reason: 'HIBP_QUOTA_EXCEEDED'
        };
      }
      break;
      
    case 'shodan-scan':
      if (plan === 'FREE') {
        return { 
          allowed: false, 
          reason: 'SHODAN_NOT_AVAILABLE_FREE'
        };
      }
      if (currentUsage.shodanScansUsed >= quotas.shodanScansPerMonth) {
        return { 
          allowed: false, 
          reason: 'SHODAN_QUOTA_EXCEEDED'
        };
      }
      break;
      
    case 'user-add':
      if (currentUsage.totalUsers >= quotas.maxUsers) {
        return { 
          allowed: false, 
          reason: 'USER_LIMIT_EXCEEDED'
        };
      }
      break;
      
    default:
      return { allowed: true };
  }
  
  return { allowed: true };
}

/**
 * Get quota usage percentage for display
 */
export function getQuotaUsage(
  plan: BillingPlan,
  action: QuotaAction,
  currentUsage: number
): { percentage: number; remaining: number; total: number } {
  const quotas = PLAN_QUOTAS[plan];
  
  let total: number;
  switch (action) {
    case 'vt-scan':
      total = quotas.vtScansPerMonth;
      break;
    case 'ai-query':
      total = quotas.aiQueriesPerMonth;
      break;
    case 'hibp-call':
      total = quotas.hibpCallsPerMonth;
      break;
    case 'shodan-scan':
      total = quotas.shodanScansPerMonth;
      break;
    case 'user-add':
      total = quotas.maxUsers;
      break;
    default:
      total = 0;
  }
  
  const percentage = total > 0 ? Math.min((currentUsage / total) * 100, 100) : 0;
  const remaining = Math.max(total - currentUsage, 0);
  
  return { percentage, remaining, total };
}

/**
 * Get plan features for comparison
 */
export function getPlanFeatures(plan: BillingPlan) {
  const quotas = PLAN_QUOTAS[plan];
  
  return {
    plan,
    features: {
      users: quotas.maxUsers === 10000 ? 'Unlimited' : quotas.maxUsers.toString(),
      vtScans: quotas.vtScansPerMonth === 999999 ? 'Unlimited' : quotas.vtScansPerMonth.toString(),
      aiQueries: quotas.aiQueriesPerMonth === 999999 ? 'Unlimited' : quotas.aiQueriesPerMonth.toString(),
      hibpCalls: quotas.hibpCallsPerMonth === 999999 ? 'Unlimited' : quotas.hibpCallsPerMonth.toString(),
      shodanScans: quotas.shodanScansPerMonth === 0 ? 'Not available' : 
                   quotas.shodanScansPerMonth === 150 ? '5/day' : quotas.shodanScansPerMonth.toString(),
    },
    price: getPlanPrice(plan),
  };
}

/**
 * Get plan pricing (placeholder - integrate with Stripe)
 */
function getPlanPrice(plan: BillingPlan): { monthly: number; yearly: number } {
  switch (plan) {
    case 'FREE':
      return { monthly: 0, yearly: 0 };
    case 'PRO':
      return { monthly: 29, yearly: 290 }; // ~17% discount yearly
    case 'ENT':
      return { monthly: 99, yearly: 990 }; // Custom pricing
    default:
      return { monthly: 0, yearly: 0 };
  }
}

/**
 * Check if user can upgrade to a specific plan
 */
export function canUpgradeTo(currentPlan: BillingPlan, targetPlan: BillingPlan): boolean {
  const planOrder: BillingPlan[] = ['FREE', 'PRO', 'ENT'];
  const currentIndex = planOrder.indexOf(currentPlan);
  const targetIndex = planOrder.indexOf(targetPlan);
  
  return targetIndex > currentIndex;
}

/**
 * Get recommended plan based on usage
 */
export function getRecommendedPlan(usage: Record<string, number>): BillingPlan {
  // Check if exceeds FREE plan limits
  const freeQuotas = PLAN_QUOTAS.FREE;
  if (
    usage.totalUsers > freeQuotas.maxUsers ||
    usage.vtScansUsed > freeQuotas.vtScansPerMonth ||
    usage.aiQueriesUsed > freeQuotas.aiQueriesPerMonth ||
    usage.shodanScansUsed > 0
  ) {
    // Check if exceeds PRO plan limits
    const proQuotas = PLAN_QUOTAS.PRO;
    if (
      usage.totalUsers > proQuotas.maxUsers ||
      usage.vtScansUsed > proQuotas.vtScansPerMonth ||
      usage.aiQueriesUsed > proQuotas.aiQueriesPerMonth
    ) {
      return 'ENT';
    }
    return 'PRO';
  }
  
  return 'FREE';
}