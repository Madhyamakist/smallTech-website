import Image from "next/image";

interface CardProps {
  src: string;
  label: string;
}

export default function Card({ src, label }: CardProps) {
  return (
    <div className="card flex flex-col items-center">
      <Image src={src} width={30} height={30} alt={label}/>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
