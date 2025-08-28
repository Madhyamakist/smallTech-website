import Image from "next/image";

interface OfferingCardProps {
  src: string;
  label: string;
}

export default function OfferingCard({ src, label }: OfferingCardProps) {
  return (
    <div className="bg-rose lg:m-[5%] lg:p-1 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
      <Image src={src} width={40} height={40} alt={label} />
      <span className="text-licorice text-sm font-medium">{label}</span>
    </div>
  );
}
