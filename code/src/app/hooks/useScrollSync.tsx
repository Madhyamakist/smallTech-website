
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';


export function useScrollSync() {
  //   const router = useRouter();
  const pathname = usePathname();
  const observer = useRef<IntersectionObserver | null>(null);


  useEffect(() => {
    const pageId = pathname === '/' ? 'landing' : pathname.slice(1);
    const page = document.getElementById(pageId);
    if (page) {
      page.scrollIntoView({ behavior: 'instant' });
    }
  }, [pathname]);


  useEffect(() => {
    const pages = document.querySelectorAll('section');


    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const id = visibleEntry.target.id;
          const newPath = id === 'landing' ? '/' : `/${id}`;
          if (newPath !== pathname) {
            window.history.replaceState(null, '', newPath);
          }
        }
      },
      { threshold: 0.6 }
    );


    pages.forEach((page) => observer.current?.observe(page));
    return () => observer.current?.disconnect();
  }, [pathname]);
}



