# SecureHero Setup Instructions

## 🚀 Quick Start pro El.Daniel

### 1. Klonování projektu
```bash
git clone https://github.com/BetrixAI/honza-security-web.git
cd honza-security-web
```

### 2. Instalace dependencies
```bash
npm install
```

### 3. Environment setup
Vytvoř soubor `.env.local` v root složce:
```bash
# Firebase Client Configuration (tyto můžeš zkopírovat z Firebaes console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK Configuration (Base64 encoded service account)
FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account

# Security API Keys (získej z příslušných služeb)
VT_API_KEY=your_virustotal_api_key
HIBP_API_KEY=your_hibp_api_key
URLSCAN_API_KEY=your_urlscan_api_key
SHODAN_API_KEY=your_shodan_api_key

# OpenAI API Key (pro AI copilot)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Spuštění dev serveru
```bash
npm run dev
```

## 📁 Struktura projektu podle `.cursorrules`

### 🟢 TY (El.Daniel) smíš upravovat:
- `src/app/page.tsx` - Landing page
- `src/app/auth/**` - Auth stránky  
- `src/components/Header.tsx` - Header komponenta
- `src/components/Footer.tsx` - Footer komponenta
- `src/components/Layout.tsx` - Layout pro landing
- `src/components/SplineModel.tsx` - 3D hero komponenty
- `locales/*/landing.ts` - Landing page překlady
- `locales/*/auth.ts` - Auth překlady

### 🔵 Kubca (NEUPRAVUJ):
- `src/app/dashboard/**` - Dashboard stránky
- `src/components/dashboard/**` - Dashboard komponenty
- `src/components/ui/**` - UI komponenty
- `locales/*/dashboard.ts` - Dashboard překlady

### 🟡 SHARED (konzultace potřeba):
- `src/contexts/**` - React kontexty
- `src/lib/**` - Utility funkce
- `src/types/**` - TypeScript typy
- `locales/*/common.ts` - Sdílené překlady
- `locales/*/lessons.ts` - Lekce překlady

## 🌍 i18n systém

### Používání překladů v komponentách:
```tsx
import useTranslation from '@/lib/i18n';

function MyComponent() {
  const { t, locale, changeLocale } = useTranslation('landing');
  
  return (
    <div>
      <h1>{t('HERO_TITLE')}</h1>
      <button onClick={() => changeLocale('cs')}>
        Česky
      </button>
    </div>
  );
}
```

### URL systém:
- `securehero.com` → Angličtina
- `securehero.com/cz` → Čeština
- IP detection automaticky přesměruje Čechy na `/cz`

### Přidávání nových překladů:
1. Přidej klíč do `locales/cs/[namespace].ts`
2. Přidej STEJNÝ klíč do `locales/en/[namespace].ts`
3. Použij v komponentě přes `t('KEY_NAME')`

## 🛡️ Bezpečnostní pravidla

### ❌ NIKDY:
- Hardcode API keys v kódu
- Commit `.env.local` do git
- Upravuj Kubcovy soubory bez konzultace
- Používej `any` type v TypeScript

### ✅ VŽDY:
- Používej `process.env.*` pro env variables
- Kontroluj `npm run build` před commitem
- Přidávej oba překlady (CS + EN) současně
- Využívej TypeScript strict mode

## 📦 Dostupné scripts

```bash
npm run dev      # Development server
npm run build    # Production build 
npm run start    # Production server
npm run lint     # ESLint check
```

## 🔧 Troubleshooting

### Build error s Firebase Functions?
Functions jsou vyloučené z Next.js buildu, pokud se error objeví:
1. Zkontroluj že `tsconfig.json` excluduje `functions/**/*`
2. Zkontroluj že `.vercelignore` obsahuje `functions/`

### i18n nefunguje?
1. Zkontroluj že máš správný import: `import useTranslation from '@/lib/i18n'`
2. Zkontroluj že překlad existuje v `locales/[locale]/[namespace].ts`

### TypeScript errors?
1. Spusť `npm run build` pro kontrolu typů
2. Zkontroluj že všechny imports jsou správné
3. Neupravuj soubory v `src/types/` bez konzultace

## 📞 Kontakt

Pokud máš otázky nebo problém s buildem, ozvi se Kubcovi.

**Štastné kódování! 🚀**