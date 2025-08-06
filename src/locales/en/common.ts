/**
 * English translations - Common UI strings
 * Owner: Shared - update both CS & EN simultaneously
 */

export const en = {
  // Navigation & Layout
  DASHBOARD_TITLE: "Security Dashboard",
  LANDING_PAGE: "Landing Page",
  AUTH_LOGIN: "Login", 
  AUTH_LOGOUT: "Logout",
  HEADER_MENU: "Menu",
  FOOTER_COPYRIGHT: "© 2025 SecureHero. All rights reserved.",
  
  // Buttons & Actions
  BTN_SAVE: "Save",
  BTN_CANCEL: "Cancel",
  BTN_DELETE: "Delete", 
  BTN_EDIT: "Edit",
  BTN_CLOSE: "Close",
  BTN_SUBMIT: "Submit",
  BTN_UPLOAD: "Upload",
  BTN_DOWNLOAD: "Download",
  
  // Status & Messages
  LOADING: "Loading...",
  CHECKING_AUTHENTICATION: "Checking authentication...",
  SUCCESS: "Success",
  ERROR: "Error",
  WARNING: "Warning", 
  INFO: "Information",
  
  // Authentication
  AUTHENTICATION_ERROR: "Authentication Error",
  AUTHENTICATION_ERROR_DESCRIPTION: "Failed to verify your authentication. Please try logging in again.",
  RETRY: "Retry",
  GO_TO_LOGIN: "Go to Login",
  
  // User Profile
  USER: "User",
  EMAIL: "Email",
  NAME: "Name",
  ACCOUNT_TYPE: "Account Type",
  FREE_ACCOUNT: "Free",
  
  // Forms
  FORM_EMAIL: "Email",
  FORM_PASSWORD: "Password",
  FORM_NAME: "Name",
  FORM_COMPANY: "Company",
  FORM_REQUIRED: "Required field",
  FORM_INVALID_EMAIL: "Invalid email",
  
  // Notifications
  NOTIFICATION_SUCCESS: "Operation successful",
  NOTIFICATION_ERROR: "An error occurred", 
  NOTIFICATION_UPGRADE_PLAN: "Upgrade plan",
  
  // Plans & Billing
  PLAN_FREE: "Free",
  PLAN_PRO: "Pro",
  PLAN_ENTERPRISE: "Enterprise", 
  BILLING_MONTHLY: "Monthly",
  BILLING_YEARLY: "Yearly",
  
  // Generic
  YES: "Yes",
  NO: "No",
  CONTINUE: "Continue",
  BACK: "Back",
  NEXT: "Next",
  PREVIOUS: "Previous",
};

export type TranslationKeys = keyof typeof en;