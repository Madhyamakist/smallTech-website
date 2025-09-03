import Image from "next/image";

interface CardProps {
  src: string;
  label: string;
}

export default function Card({ src, label }: CardProps) {
  return (
    <div className="card flex flex-col items-center justify-center">
      <Image src={src} width={20} height={0} alt={label} className="lg:w-15"/>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
