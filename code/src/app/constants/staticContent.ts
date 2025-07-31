import { SectionContent } from "../models/sectionContent";

export const sections: SectionContent[] = [
  {
    heading: "TypeScript",
    text: "TypeScript is a statically typed superset of JavaScript developed by Microsoft that compiles down to plain JavaScript. It introduces static types to JavaScript, which helps catch bugs at compile time, improves developer tooling (like IntelliSense and auto-complete), and enhances code readability and maintainability. TypeScript is especially useful in large codebases and teams, as it provides better documentation through type annotations and interfaces. It integrates seamlessly with modern frameworks like React, Vue, and Node.js, making it an essential tool in scalable web application development.TypeScript has been rapidly gaining traction. Its adoption has surged from 12% in 2017 up to an impressive 35% in 2024.",
    imageSrc: "./typescript-popularity.png", 
    imageAlt: "TypeScript popularity over years",
    imageTitle:"Programming, scripting, and markup language usage",
  },
    {
    heading: "Next.js",
    text: "Next.js is a modern web development framework built on top of React that enables developers to create fast, dynamic, and scalable applications. It supports features like server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), and API routes—all out of the box. With built-in performance optimizations, seamless routing, and full support for TypeScript, Next.js simplifies complex frontend development tasks. It’s widely adopted for building production-ready apps that are SEO-friendly and highly performant.",
  },
  {
    heading: "Tailwind CSS",
    text: "Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs without writing traditional CSS. Instead of defining styles in separate stylesheets, you apply pre-defined utility classes directly in your HTML or JSX. This approach leads to faster styling, consistent design patterns, and easier maintenance. Tailwind offers full responsiveness, dark mode support, theming, and is highly customizable. Its atomic class system encourages clean, scalable UI development—especially in component-based frameworks like React or Next.js.",
  },
  
];
