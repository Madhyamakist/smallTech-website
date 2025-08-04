import { CardProps } from '../../models/card';
export default function Card({ title, image, subtitle }: CardProps) {
 
  return (
    <div className="card">
      <h3 className="font-[500]">{title}</h3>
      <img src={image} alt={title} className="deptImage" />
      <span className="text-sm">{subtitle}</span>
    </div>
  );
}
