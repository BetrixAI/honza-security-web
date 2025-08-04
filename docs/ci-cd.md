# CI/CD pipeline

SecureHero využívá GitHub Actions pro automatizaci buildů, testů a nasazení:

1. **Instalace závislostí**
   ```bash
   pnpm install
   ```
2. **Lint a testy**
   ```bash
   pnpm lint && pnpm test
   ```
3. **SCA sken (Trivy)**
   - Trivy scan kontroluje zranitelnosti (fail build on CVSS >7)
4. **Build**
   ```bash
   pnpm build
   ```
5. **Nasazení**
   - Deploy na Firebase Hosting (`firebase deploy`) a Functions (`firebase deploy --only functions`)

**Další kroky**:
- Automatické rollbacky při selhání nasazení
- Notifikace přes Slack při dokončení pipeline
- Integrace Trivy výsledků do PR jako komentáře