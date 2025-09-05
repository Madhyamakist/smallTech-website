// global.d.ts (or index.d.ts in your types folder)
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void; // Use unknown or proper type if possible!
  }
}
export {};
