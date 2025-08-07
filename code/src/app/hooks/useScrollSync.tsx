
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';


export function useScrollSync() {
//   const router = useRouter();
  const pathname = usePathname();
  const observer = useRef<IntersectionObserver | null>(null);


  useEffect(() => {
    const sectionId = pathname === '/' ? 'landing' : pathname.slice(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'instant' });
    }
  }, [pathname]);


  useEffect(() => {
    const sections = document.querySelectorAll('section');


    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.id;
          const newPath = id === 'landing' ? '/' : `/${id}`;
          if (newPath !== pathname) {
            window.history.replaceState(null, '', newPath);
          }
        }
      },
      { threshold: 0.6 }
    );


    sections.forEach((section) => observer.current?.observe(section));
    return () => observer.current?.disconnect();
  }, [pathname]);
}



