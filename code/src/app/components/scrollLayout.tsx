'use client';
import { useScrollSync } from '../hooks/useScrollSync';
import Page from './page';
import { pages } from '../constants/page';
export default function ScrollLayout() {
useScrollSync()
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      {pages.map((page) => (
        <Page
          key={page.id}
          id={page.id}
          mainHeader={page.mainHeader}
          content={page.content}
        />
      ))}
    </main>
  );
}
