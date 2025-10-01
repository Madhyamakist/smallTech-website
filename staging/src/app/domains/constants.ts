const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export  const techDomains = [
    [
      { src: `${basePath}/appdev.png`, label: "App Dev" },
      { src: `${basePath}/webdev.png`, label: "Web Dev" },
    ],
    [{ src: `${basePath}/ai.png`, label: "AI" }],
    [
      { src: `${basePath}/cloud.png`, label: "Cloud" },
      { src: `${basePath}/security.png`, label: "Security" },
    ],
  ];

  export const businessDomains = [
    [
      { src: `${basePath}/charity.png`, label: "Healthcare" },
      { src: `${basePath}/ecommerce.png`, label: "Ecommerce" },
    ],
    [
      { src: `${basePath}/logistics.png`, label: "Logistics" },
      { src: `${basePath}/marketplace.png`, label: "Marketplace" },
    ],
  ];