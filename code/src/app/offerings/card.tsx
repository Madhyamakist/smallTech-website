import Image from "next/image";

interface OfferingCardProps {
  src: string;
  label: string;
}

export default function OfferingCard({ src, label }: OfferingCardProps) {
  return (
    <div className="bg-rose p-2 lg:m-[5%] lg:p-1  shadow-lg rounded-lg flex flex-col items-center justify-between text-center">
      <Image src={src} width={20} height={0} alt={label} className="lg:w-20" />
      <span className="text-licorice text-xs font-medium">{label}</span>
    </div>
  );
}
