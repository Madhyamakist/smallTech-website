
'use client';
import { useEffect, useRef } from 'react';


export function useScrollSync() {
  const observer = useRef<IntersectionObserver | null>(null);

  // On mount, scroll to the section indicated by the hash (if any)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { pathname, hash, search } = window.location;
    const pathSegment = pathname.replace(/^\//, '');
    const initialId = hash ? hash.replace('#', '') : (pathSegment || 'landing');
    const targetId = initialId || 'landing';
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'instant' });
    }
    // Normalize URL to hash-only to avoid future route remounts
    const newHash = targetId === 'landing' ? '#' : `#${targetId}`;
    const desiredUrl = `/${''}${search}${newHash}`;
    const currentUrl = pathname + search + hash;
    if (currentUrl !== desiredUrl) {
      window.history.replaceState(null, '', desiredUrl);
    }
  }, []);

  // While scrolling, update only the hash to avoid route remounts
  useEffect(() => {
    const pages = document.querySelectorAll('section');

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const id = visibleEntry.target.id;
          const newHash = id === 'landing' ? '#' : `#${id}`;
          if (typeof window !== 'undefined') {
            const currentUrl = window.location.pathname + window.location.search + window.location.hash;
            const desiredUrl = window.location.pathname + window.location.search + newHash;
            if (currentUrl !== desiredUrl) {
              window.history.replaceState(null, '', desiredUrl);
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    pages.forEach((page) => observer.current?.observe(page));
    return () => observer.current?.disconnect();
  }, []);
}



