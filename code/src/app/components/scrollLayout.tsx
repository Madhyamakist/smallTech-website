'use client';
import Section from './section';
import { sections } from '../constants/section';
import { useScrollSync } from '../hooks/useScrollSync';

export default function ScrollLayout() {
useScrollSync()
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          mainHeader={section.mainHeader}
          content={section.content}
        />
      ))}
    </main>
  );
}
