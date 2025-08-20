import Image from "next/image";

interface OfferingCardProps {
  src: string;
  label: string;
}

export default function OfferingCard({ src, label }: OfferingCardProps) {
  return (
    <div className="bg-rose m-[8%] lg:m-[5%] lg:p-1 shadow-lg p-3 rounded-lg flex flex-col items-center justify-center text-center">
      <Image src={src} width={40} height={40} alt={label} />
      <span className="mt-3 text-licorice m-3 text-sm font-medium">{label}</span>
    </div>
  );
}
