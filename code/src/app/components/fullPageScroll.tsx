'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Section from './section';
import { sections } from '../constants/section';

export default function FullPageScroll() {
  const router = useRouter();
  const pathname = usePathname();
  const observer = useRef<IntersectionObserver | null>(null);

  // Scroll to section based on current pathname
  useEffect(() => {
    const sectionId = pathname === '/' ? 'landing' : pathname.slice(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'instant' });
    }
  }, [pathname]);

  // Change URL as user scrolls
  useEffect(() => {
    const sectionEls = document.querySelectorAll('section');

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.id;
          const newPath = id === 'landing' ? '/' : `/${id}`;
          if (newPath !== pathname) {
            router.replace(newPath);
          }
        }
      },
      { threshold: 0.6 }
    );

    sectionEls.forEach((section) => observer.current!.observe(section));

    return () => observer.current?.disconnect();
  }, [router, pathname]);

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          mainHeader={section.mainHeader}
          content={section.content}
        />
      ))}
    </main>
  );
}
