'use client';
import { useScrollSync } from '../hooks/useScrollSync';
import Page from './page';
import Landing from '../landing/landing';
import Domains from '../domains/domains';
import Offerings from '../offerings/offerings';
export default function ScrollLayout() {
useScrollSync()
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Page
          key="landing"
          id="landing"
          
          content={<Landing />}
        />
        <Page
          key="domains"
          id="domains"
          content={<Domains/>}
        />
         <Page
          key="offerings"
          id="offerings"
          content={<Offerings/>}
        />
    </main>
  );
}
