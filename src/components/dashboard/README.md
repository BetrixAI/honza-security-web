# Dashboard Security Widgets

Bezpečnostní widgety pro SecureHero dashboard s real-time funkcionalitou.

## VirusTotal Scanner Widget

### Přehled
Drag & drop file scanner widget s integrací na VirusTotal API přes Cloud Functions.

### Funkce
- **Drag & drop upload** - Podpora více souborů současně
- **Real-time progress** - Live sledování postupu uploadu
- **Firestore integration** - Metadata se ukládají do `virusTotalScans/{scanId}`
- **Statistics tracking** - Celkové statistiky skenů, malicious/clean ratio
- **Recent scans** - Historie posledních 5 skenů
- **Error handling** - Robustní error handling s user-friendly zprávami

### Security Features
- **File size limit**: 32MB (VirusTotal free tier limit)
- **Filename sanitization**: Automatické čištění názvů souborů
- **Token security**: VT API tokeny pouze v Cloud Functions, ne v klientu
- **Rate limiting**: Respektování VT API limitů (4 req/min free tier)

### Použití

```tsx
import VirusTotalWidget from '@/components/dashboard/VirusTotalWidget'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <VirusTotalWidget />
    </div>
  )
}
```

### Hooks

#### `useVirusTotal()`
Hlavní hook pro správu VT skenů.

```tsx
const {
  scanFiles,      // Aktuální nahrávané soubory
  isUploading,    // Upload status
  uploadFiles,    // Funkce pro upload
  removeScanFile, // Odstranění souboru z UI
  getRecentScans  // Historie skenů
} = useVirusTotal()
```

#### `useVTStats()`
Hook pro statistiky skenů.

```tsx
const {
  stats: {
    totalScans,     // Celkem skenů
    maliciousFound, // Nalezené malicious
    cleanFiles,     // Čisté soubory
    xpEarned        // Získané XP
  },
  isLoading
} = useVTStats()
```

### Firestore Schema

```typescript
virusTotalScans/{scanId} {
  uid: string              // kdo uploadoval
  fileName: string         // sanitizovaný název
  status: 'queued' | 'running' | 'done' | 'error'
  vtUrl?: string          // link na VT report
  analysisId?: string     // VT analysis ID
  verdict?: 'clean' | 'suspicious' | 'malicious'
  detections?: number     // počet detekce
  totalEngines?: number   // celkem antivirus engines
  createdAt: Timestamp
  resultDate?: Timestamp
  cfRequestId?: string    // Cloud Function request ID
  xpAwarded?: number      // XP za scan
}
```

### Cloud Functions Integration

#### CF01: `vtScanOnUpload`
- **Trigger**: `storage.onFinalize`
- **Funkce**: Upload souboru do VirusTotal
- **Input**: File binary z Cloud Storage
- **Output**: `analysisId` uložen do Firestore

#### CF02: `pollVtResult`
- **Trigger**: `pubSub` každé 2 minuty
- **Funkce**: Polling VT výsledků pro nedokončené skeny
- **Logic**: Fetch analysis results, update Firestore, award XP

### Testing

```bash
# Unit testy
npm test src/components/dashboard/__tests__/VirusTotalWidget.test.tsx

# Integration testy
npm test src/hooks/__tests__/useVirusTotal.test.ts
```

### Translations

#### Přidání nových překladů

1. **Czech** (`locales/cs/dashboard.ts`):
```typescript
export const dashboardCs = {
  VT_SCANNER_TITLE: "VirusTotal Scanner",
  VT_UPLOAD_FILE: "Nahrát Soubor",
  VT_SCANNING: "Skenování...",
  VT_MALICIOUS: "Škodlivý",
  VT_CLEAN: "Čistý",
  VT_SUSPICIOUS: "Podezřelý"
}
```

2. **English** (`locales/en/dashboard.ts`):
```typescript
export const dashboardEn = {
  VT_SCANNER_TITLE: "VirusTotal Scanner",
  VT_UPLOAD_FILE: "Upload File", 
  VT_SCANNING: "Scanning...",
  VT_MALICIOUS: "Malicious",
  VT_CLEAN: "Clean",
  VT_SUSPICIOUS: "Suspicious"
}
```

#### Použití v komponentě:
```tsx
import { useTranslation } from '@/hooks/useTranslation'

const { t } = useTranslation('dashboard')
return <h3>{t('VT_SCANNER_TITLE')}</h3>
```

### Performance Considerations

- **Lazy loading**: Widget se načítá pouze když je potřeba
- **Real-time updates**: Firestore listeners s proper cleanup
- **Bundle size**: Optimalizace pomocí dynamic imports pro velké deps
- **Memory management**: Cleanup file objects po uploadu

### Error Handling

```typescript
// File size validation
if (file.size > MAX_FILE_SIZE) {
  throw new Error(`Soubor ${file.name} je příliš velký (max 32MB)`)
}

// VT API errors
try {
  const response = await fetch('/api/vt-upload', {...})
  if (response.status === 429) {
    throw new Error('Rate limit exceeded. Zkuste to později.')
  }
} catch (error) {
  // Handle network errors, display user-friendly message
}
```

### Security Checklist

- [x] File size limits (32MB)
- [x] Filename sanitization
- [x] VT tokens pouze v Cloud Functions
- [x] Input validation
- [x] Rate limiting handling
- [x] CSP compliance
- [x] Error message sanitization

### Roadmap

- [ ] Bulk upload (více souborů najednou)
- [ ] Upload progress estimation
- [ ] Detailed scan reports view
- [ ] Integration s threat intelligence feeds
- [ ] Email notifications pro malicious findings
- [ ] Advanced filtering a search

---

**Owner**: Kubca  
**Last updated**: 2025-01-02  
**Version**: 1.0.0