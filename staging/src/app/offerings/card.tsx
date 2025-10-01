import Image from "next/image";

interface OfferingCardProps {
  src: string;
  label: string;
}

export default function OfferingCard({ src, label }: OfferingCardProps) {
  return (
    <div className="card lg:m-[5%] lg:p-1 text-center">
      <Image src={src} width={30} height={30} alt={label} />
      <span className=" text-licorice  text-sm font-medium">{label}</span>
    </div>
  );
}
