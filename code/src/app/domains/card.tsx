import Image from "next/image";

interface CardProps {
  src: string;
  label: string;
}

export default function Card({ src, label }: CardProps) {
  return (
    <div className="card flex flex-col items-center justify-center">
      <Image src={src} width={40} height={0} alt={label} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
