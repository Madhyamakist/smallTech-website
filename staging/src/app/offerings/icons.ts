const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const offeringItems = [
  [
    { src:`${basePath}/consultation.png`, label: "High Fidelity Planning" },
    { src: `${basePath}/draw.png`, label: "Design-First" },
  ],
  [
    { src: `${basePath}/file-management.png`, label: "Risk Driven Project Management" },
    { src: `${basePath}/marketplace.png`, label: "Continuous Delivery" },
  ],
];
export const techItems = [
  "go.png", 
  "phoenix.png", 
  "python.png", 
  "java-script.png",
  "amazondynamodb.png", 
  "mysql.png", 
  "redis.png", 
  "postgresql.png",
  "aws.png", 
  "rest-api.png", 
  "kafka.png", 
  "docker.png",
  "gitlab.png", 
  "sonarqube.png", 
  "prometheus.png", 
  "grafana.png"
];