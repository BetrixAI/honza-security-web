# Architektura projektu SecureHero

Projekt využívá následující stack:

1. **Frontend**
   - Next.js 15 (App Router, React 18, TypeScript 5)
   - Tailwind CSS 3, shadcn/ui, framer-motion
   - RSC + klientské komponenty označené `use client`
2. **Backend / API**
   - Firebase Functions (CF01–CF12) pro skenování, analytiku a exporty
   - Firestore jako primární databáze, Cloud Storage pro uploady
   - Express-like HTTPS volání, Zod validace, `HttpsError`
3. **Stav a mezipaměť**
   - React Query pro klientský state management
   - Lokální cache výsledků VirusTotal a HIBP
4. **CI/CD**
   - GitHub Actions → pnpm lint/test → Trivy SCA → deploy na Firebase Hosting/Functions

**Struktura složek**:

```text
src/
├─ app/ (Next.js App Router)
├─ components/ (UI a dashboardové komponenty)
├─ contexts/ (React contexty)
├─ lib/ (klient, admin SDK, kvóty, utils)
├─ functions/src/ (cloud functions)
├─ locales/ (i18n)  
└─ types/ (TS typy)
```