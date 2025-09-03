import DomainsSection from "./domainSection";
import { techDomains,businessDomains } from "./constants";
export default function Domains() {

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-[10%] md:pt-[5%] gap-6">
      <DomainsSection title="Tech Domains" items={techDomains} />
      <DomainsSection title="Business Domains" items={businessDomains} />
    </div>
  );
}
