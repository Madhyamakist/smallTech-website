import DomainsSection from "./domainSection";
import { techDomains,businessDomains } from "./constants";
export default function Domains() {

  return (
    <div className="max-h-screen">
      <DomainsSection title="Tech Domains" items={techDomains} />
      <DomainsSection title="Business Categories" items={businessDomains} />
    </div>
  );
}
