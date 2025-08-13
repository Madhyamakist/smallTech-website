import DomainsSection from "./domainSection";
import { techDomains,businessDomains } from "./constants";
export default function Domains() {

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <DomainsSection title="Tech Domains" items={techDomains} />
      <DomainsSection title="Business Domains" items={businessDomains} />
    </div>
  );
}
