import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility funkce pro kombinování Tailwind CSS tříd
 * @param inputs - CSS třídy k sloučení
 * @returns Sloučené CSS třídy bez konfliktů
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}