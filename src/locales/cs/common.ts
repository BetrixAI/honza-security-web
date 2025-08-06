/**
 * Czech translations - Common UI strings
 * Owner: Shared - update both CS & EN simultaneously
 */

export const cs = {
  // Navigation & Layout
  DASHBOARD_TITLE: "Bezpečnostní Panel",
  LANDING_PAGE: "Hlavní Stránka", 
  AUTH_LOGIN: "Přihlášení",
  AUTH_LOGOUT: "Odhlášení",
  HEADER_MENU: "Menu",
  FOOTER_COPYRIGHT: "© 2025 SecureHero. Všechna práva vyhrazena.",
  
  // Buttons & Actions
  BTN_SAVE: "Uložit",
  BTN_CANCEL: "Zrušit", 
  BTN_DELETE: "Smazat",
  BTN_EDIT: "Upravit",
  BTN_CLOSE: "Zavřít",
  BTN_SUBMIT: "Odeslat",
  BTN_UPLOAD: "Nahrát",
  BTN_DOWNLOAD: "Stáhnout",
  
  // Status & Messages
  LOADING: "Načítání...",
  CHECKING_AUTHENTICATION: "Kontroluji přihlášení...",
  SUCCESS: "Úspěch",
  ERROR: "Chyba", 
  WARNING: "Varování",
  INFO: "Informace",
  
  // Authentication
  AUTHENTICATION_ERROR: "Chyba přihlášení",
  AUTHENTICATION_ERROR_DESCRIPTION: "Nepodařilo se ověřit vaše přihlášení. Zkuste se přihlásit znovu.",
  RETRY: "Zkusit znovu",
  GO_TO_LOGIN: "Jít na přihlášení",
  
  // User Profile
  USER: "Uživatel",
  EMAIL: "E-mail",
  NAME: "Jméno",
  ACCOUNT_TYPE: "Typ účtu",
  FREE_ACCOUNT: "Zdarma",
  
  // Forms
  FORM_EMAIL: "E-mail",
  FORM_PASSWORD: "Heslo",
  FORM_NAME: "Jméno",
  FORM_COMPANY: "Společnost",
  FORM_REQUIRED: "Povinné pole",
  FORM_INVALID_EMAIL: "Neplatný e-mail",
  
  // Notifications
  NOTIFICATION_SUCCESS: "Operace byla úspěšná",
  NOTIFICATION_ERROR: "Došlo k chybě",
  NOTIFICATION_UPGRADE_PLAN: "Upgrade plánu",
  
  // Plans & Billing
  PLAN_FREE: "Zdarma",
  PLAN_PRO: "Pro", 
  PLAN_ENTERPRISE: "Enterprise",
  BILLING_MONTHLY: "Měsíčně",
  BILLING_YEARLY: "Ročně",
  
  // Generic
  YES: "Ano",
  NO: "Ne",
  CONTINUE: "Pokračovat",
  BACK: "Zpět",
  NEXT: "Další",
  PREVIOUS: "Předchozí",
};

export type TranslationKeys = keyof typeof cs;