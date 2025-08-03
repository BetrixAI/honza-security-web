# Gamifikační systém

SecureHero využívá gamifikaci k motivaci a zapojení uživatelů:

- **Získávání XP (zkušenostních bodů)**:
  - Mikrolekce: `5 × lesson.durationMin` bodů za dokončenou lekci s ≥80 % úspěšností
  - Simulace phishingu: +20 XP za úspěšné rozpoznání phishingového e-mailu
  - Nahlášení reálné hrozby: +15 XP
  - VirusTotal „malicious“: +10 XP
  - Denní přihlášení: bonus podle délky streaku
  - URL sandbox výsledky: +10 XP
  - Nové HIBP úniky: +5 XP
  - Shodan expozice: +20 XP
  - Úspěšné Attack Replay: +25 XP

- **Výpočet úrovně**:
  ```
  level = floor(sqrt(xp / 25)) + 1
  ```

- **Odznaky a odměny**:
  - Odznaky definované v `badgesCatalog` s kritérii v JSON
  - Firestore kolekce `badges` ukládá získané odznaky uživatelů

- **Gating obsahu**:
  - Každá lekce má `levelRequired`
  - Pokud `user.level < levelRequired`, vrátí se HTTP 403 a zobrazí se lokalizovaná výzva k postupu

Gamifikační data se ukládají v kolekcích uživatelů v Firestore a vizualizují se v dashboardu.