# SecureHero - Project Structure

This document describes the complete folder structure and ownership according to `.cursorrules`.

## 🏗️ Folder Structure

```
honza-security-web/
├── .cursorrules                 # 🔥 MAIN PROJECT RULES - shared brain
├── .env.local                   # Environment variables (git ignored)
├── middleware.ts                # i18n + auth middleware
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind styling
├── tsconfig.json                # TypeScript config
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # 🟡 SHARED - minimal edits only
│   │   ├── globals.css          # 🟡 SHARED - additive only  
│   │   ├── page.tsx             # 🟢 El.Daniel (Landing)
│   │   ├── auth/                # 🟢 El.Daniel (Auth flow)
│   │   │   └── page.tsx
│   │   └── dashboard/           # 🔵 Kubca (Dashboard)
│   │       ├── page.tsx
│   │       └── components/
│   │
│   ├── components/
│   │   ├── Header.tsx           # 🟢 El.Daniel (Landing)
│   │   ├── Footer.tsx           # 🟢 El.Daniel (Landing)
│   │   ├── Layout.tsx           # 🟢 El.Daniel (Landing)
│   │   ├── SplineModel.tsx      # 🟢 El.Daniel (3D hero)
│   │   ├── dashboard/           # 🔵 Kubca (Dashboard)
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── VTScanner.tsx
│   │   │   ├── HIBPMonitor.tsx
│   │   │   └── XPProgress.tsx
│   │   └── ui/                  # 🔵 Kubca (shadcn/ui)
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   │
│   ├── contexts/                # 🟡 SHARED (review required)
│   │   └── AuthContext.tsx      # Firebase auth context
│   │
│   ├── lib/                     # 🟡 SHARED (review required)
│   │   ├── firebaseClient.ts    # Firebase client config
│   │   ├── firebaseAdmin.ts     # Firebase admin config  
│   │   ├── auth.ts              # Auth utilities
│   │   ├── quota.ts             # Plan quotas & limits
│   │   ├── gamification.ts      # XP & level engine
│   │   └── i18n.ts              # Translation utilities
│   │
│   └── types/                   # 🟡 SHARED (review required)
│       └── index.ts             # Global TypeScript types
│
├── locales/                     # 🌍 i18n SYSTEM
│   ├── index.ts                 # Translation exports & utilities
│   ├── cs/                      # Czech translations
│   │   ├── common.ts            # Shared UI strings
│   │   ├── dashboard.ts         # 🔵 Kubca (Dashboard)
│   │   ├── landing.ts           # 🟢 El.Daniel (Landing)
│   │   ├── auth.ts              # 🟢 El.Daniel (Auth)
│   │   └── lessons.ts           # 🟡 Shared (Lessons)
│   └── en/                      # English translations
│       ├── common.ts            # Same structure as Czech
│       ├── dashboard.ts
│       ├── landing.ts
│       ├── auth.ts
│       └── lessons.ts
│
├── functions/                   # ☁️ FIREBASE FUNCTIONS
│   ├── package.json             # Functions dependencies
│   ├── tsconfig.json            # Functions TypeScript config
│   └── src/
│       ├── index.ts             # Main exports
│       ├── virusTotal.ts        # CF01 & CF02
│       ├── gamification.ts      # CF04
│       ├── hibp.ts              # CF09 & CF10
│       ├── riskScore.ts         # CF03
│       ├── phishing.ts          # CF05
│       ├── billing.ts           # CF06
│       ├── leaderboard.ts       # CF07
│       ├── reporting.ts         # CF08
│       ├── urlscan.ts           # CF11
│       └── shodan.ts            # CF12
│
└── public/                      # Static assets
    ├── favicon.ico
    └── ...
```

## 👥 Ownership Legend

- 🔵 **Kubca** - Dashboard, UI components, XP system
- 🟢 **El.Daniel** - Landing page, auth, marketing
- 🟡 **Shared** - Requires review from both developers
- 🌍 **i18n** - Both must update CS + EN simultaneously
- ☁️ **Functions** - Shared backend logic

## 📋 Key Files Created

### ✅ Translation System (Complete)
- `locales/cs/` - Czech translations (all namespaces)
- `locales/en/` - English translations (all namespaces)
- `locales/index.ts` - Translation utilities
- `src/lib/i18n.ts` - React hooks & helpers

### ✅ Type System (Complete)
- `src/types/index.ts` - All TypeScript interfaces
- Complete coverage: User, Company, XP, VT, HIBP, etc.

### ✅ Business Logic (Complete) 
- `src/lib/quota.ts` - Plan quotas & API limits
- `src/lib/gamification.ts` - XP engine & level system
- XP rewards, level formula, badge system

### ✅ Cloud Functions (Structure)
- `functions/src/` - All CF01-CF12 functions
- VirusTotal integration (CF01/CF02) - fully implemented
- HIBP integration (CF09/CF10) - fully implemented
- Other functions - placeholder structure

### ✅ i18n Middleware (Complete)
- `middleware.ts` - Updated with locale detection
- Auto-redirect Czech users to `/cz`
- Locale-aware auth redirects

## 🚀 What's Ready

1. **Complete i18n system** - CS/EN translations ready
2. **Type-safe codebase** - All interfaces defined
3. **Gamification engine** - XP, levels, badges
4. **Quota system** - FREE/PRO/ENT plans
5. **Firebase structure** - Functions ready for implementation
6. **Ownership matrix** - Clear separation of responsibilities

## 🎯 Next Steps

1. **Push this structure** to GitHub
2. **Both developers** can start parallel work
3. **Kubca** continues dashboard implementation
4. **El.Daniel** starts landing page work
5. **Shared files** require PR review

## 🛡️ Conflict Prevention

- `.cursorrules` contains complete project knowledge
- Clear ownership boundaries prevent conflicts
- Translation system ready for both languages
- Type system provides shared contracts

---

**This structure implements everything from `.cursorrules` v1.2 🚀**