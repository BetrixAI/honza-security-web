# SecurityShield - Security Awareness Platform

Moderní Next.js aplikace pro vzdělávání v oblasti kybernetické bezpečnosti s tmavým designem a modrými/červenými akcenty.

## Design Features

- **Tmavý design** s gradientními efekty
- **Modré a červené akcenty** pro security téma
- **Responzivní design** optimalizovaný pro všechna zařízení
- **Moderní animace** a hover efekty
- **Glow efekty** pro premium vzhled
- **Připraveno pro Spline 3D modely**

## Rychlý start

### 1. Instalace závislostí

```bash
cd "honza web"
npm install
```

### 2. Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:3000`

## Struktura projektu

```
src/
├── app/
│   ├── auth/page.tsx          # Přihlášení a registrace
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Hlavní stránka
│   └── globals.css            # Globální styly
├── components/
│   ├── Header.tsx             # Navigační lišta
│   ├── Footer.tsx             # Patička
│   ├── Layout.tsx             # Hlavní layout wrapper
│   ├── Logo.tsx               # Logo komponenta
│   └── SplineModel.tsx        # 3D model wrapper
```

## Klíčové komponenty

### Header
- **Responzivní navigace** s mobilním menu
- **Scroll efekt** s blur pozadím
- **Aktivní stavy** pro navigační odkazy
- **CTA tlačítka** pro přihlášení/registraci

### Logo
- **Interaktivní design** s Shield a Lock ikonami
- **Gradient efekty** a glow
- **Různé velikosti** (sm, md, lg)
- **Volitelný text**

### Homepage
- **Hero sekce** s animovanými prvky
- **Features grid** se statistikami
- **Video katalog** s hover efekty
- **Testimonials** s hodnocením
- **CTA sekce** s gradientním pozadím

### Auth stránka
- **Toggle mezi přihlášením/registrací**
- **Validované formuláře**
- **Social auth tlačítka** (Google, GitHub)
- **Password visibility toggle**
- **Loading stavy**

## Firebase integrace (připraveno)

Aplikace je připravena pro Firebase autentizaci a databázi:

1. **Vytvořte Firebase projekt**
2. **Nakonfigurujte Authentication**
3. **Přidejte Firebase config** do `src/config/firebase.ts`
4. **Implementujte auth funkce** v auth page

## Styling system

### Barvy
- **Tmavé pozadí**: `dark-bg`, `dark-surface`, `dark-card`
- **Security modrá**: `security-blue-*` (50-950)
- **Security červená**: `security-red-*` (50-950)
- **Glow efekty**: `glow-blue`, `glow-red`

### Komponenty
- **security-card**: Základní karta s tmavým designem
- **btn-security-primary**: Primární tlačítko s hover efekty
- **btn-security-outline**: Outline tlačítko
- **security-glow-***: Glow efekty

### Animace
- **float**: Plovoucí animace
- **slide-up**: Posunutí nahoru
- **fade-in**: Fade in efekt
- **glow**: Pulzující glow

## Responzivní design

- **Mobile first** přístup
- **Breakpointy**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexibilní layouty** s CSS Grid
- **Optimalizované navigace** pro mobily

## Spline 3D modely

Aplikace podporuje Spline 3D modely:

1. **Vytvořte modely** v Spline editoru
2. **Publikujte** a získejte URL
3. **Použijte SplineModel komponentu**:

```tsx
<SplineModel 
  scene="https://prod.spline.design/your-scene-url" 
  className="w-full h-96"
/>
```

## Production build

```bash
npm run build
npm start
```

## Další kroky

1. **Přidejte Firebase konfiguraci**
2. **Implementujte autentizaci**
3. **Vytvořte video stránky**
4. **Přidejte platební systém**
5. **Integrujte Spline modely**
6. **Nastavte databázi**

## Dostupné knihovny ikon

Projekt obsahuje 4 hlavní knihovny ikon pro různé použití:

### 1. Lucide React (hlavní sada)
- **Použití**: Hlavní UI ikony, navigace, základní funkce
- **Styl**: Minimalistické, konzistentní outline ikony
- **Import**: `import { Shield } from 'lucide-react'`

### 2. Heroicons (rozšířená sada)
- **Použití**: Doplňkové UI ikony, systémové funkce
- **Styl**: Profesionální outline ikony od Tailwind CSS týmu
- **Import**: `import { HomeIcon } from '@heroicons/react/24/outline'`

### 3. React Icons (Feather style)
- **Použití**: Specifické funkce, utility ikony
- **Styl**: Tenké, elegantní ikony
- **Import**: `import { FiSecurity } from 'react-icons/fi'`

### 4. Tabler Icons (Security specialized)
- **Použití**: Security specifické ikony, brand ikony
- **Styl**: Konzistentní design s focus na bezpečnost
- **Import**: `import { IconCloudSecurity } from '@tabler/icons-react'`

### Prohlížení ikon
Navštivte `/icons` pro kompletní přehled všech dostupných ikon s příklady použití.

## Customizace

Všechny barvy a styly lze snadno upravit v:
- `tailwind.config.js` - Barvy a animace
- `src/app/globals.css` - Custom CSS třídy
- Komponenty mají props pro customizaci

## Licence

Vytvořeno pro SecurityShield projekt. Všechna práva vyhrazena. 