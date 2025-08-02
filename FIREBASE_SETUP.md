# Firebase Setup Instructions

## Přehled implementace

Byla přidána kompletní Firebase vrstva do Next.js 15 aplikace:

### ✅ Implementované funkce:

1. **Firebase Client SDK** (`/lib/firebaseClient.ts`)
   - Lazy inicializace Firebase app
   - Načítání konfigurace z environment proměnných
   - Gettery pro Auth, Firestore, Storage

2. **Firebase Admin SDK** (`/lib/firebaseAdmin.ts`) 
   - Server-side Firebase inicializace
   - Service account načítání z Base64 encoded env proměnné
   - Bezpečné používání pouze na serveru

3. **Server-side autentifikace** (`/lib/auth.ts`)
   - `getServerUser()` - ověření tokenu z cookies
   - Helper funkce pro kontrolu autentifikace
   - Middleware podporované ověření

4. **AuthProvider Context** (`/contexts/AuthContext.tsx`)
   - React context pro Firebase Auth
   - Sledování `onAuthStateChanged`
   - Automatické nastavování cookie tokenů
   - Hooks: `useAuth()`, `useRequireAuth()`

5. **API Routes pro token management**
   - `/api/auth/set-token` - nastavení httpOnly cookie
   - `/api/auth/clear-token` - vymazání cookie
   - `/api/user/profile` - příklad chráněné API route

6. **Middleware ochrana routes** (`middleware.ts`)
   - Automatické přesměrování na `/auth` pro nechráněné uživatele
   - Ochrana `/dashboard` route
   - Přesměrování z `/auth` pokud je uživatel přihlášen

### 🔧 Konfigurace:

Všechny Firebase klíče jsou načítány z environment proměnných v `.env.local`:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK (Base64 encoded service account JSON)
FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64=base64_encoded_service_account
```

### 🚀 Použití:

#### Client-side (React komponenty):
```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, signIn, signOut, isAuthenticated } = useAuth()
  
  // Přihlášení
  await signIn('email@example.com', 'password')
  
  // Odhlášení  
  await signOut()
}
```

#### Server-side (API routes, middleware):
```tsx
import { getServerUser } from '@/lib/auth'

export async function GET() {
  const user = await getServerUser()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Chráněná logika
}
```

### 🔐 Bezpečnost:

- Všechny citlivé údaje v environment proměnných
- Service account v Base64 kódování (ne hardcoded)
- HttpOnly cookies pro tokeny
- Server-side ověření tokenů
- Middleware ochrana routes
- Bezpečné použití Admin SDK pouze na serveru

### 📱 UI komponenty:

- **Auth stránka** (`/auth`) - plně funkční přihlášení/registrace
- **User Dashboard** (`/dashboard`) - chráněná stránka s autentifikací
- **Profil uživatele** - zobrazení emailu, odhlášení
- **Loading states** - elegantní loading během ověřování

### 🎯 Další možná rozšíření:

1. **Social Auth** (Google, GitHub)
2. **Email ověření** 
3. **Reset hesla**
4. **Profil uživatele** v databázi
5. **Role-based authorization**
6. **Pokročilé security rules**

Aplikace je nyní plně funkční s Firebase autentifikací!