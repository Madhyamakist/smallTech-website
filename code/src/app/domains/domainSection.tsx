import Card from "./card";

interface DomainsSectionProps {
  title: string;
  items: { src: string; label: string }[][];
}

export default function DomainsSection({ title, items }: DomainsSectionProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <h1 className="title">{title}</h1>
        <div className="card-container flex flex-col">
          {items.map((row, idx) => (
            <div
              key={idx}
              className={`grid ${row.length === 1 ? "grid-cols-1 w-[30%] mx-auto place-items-center lg:w-[20%]" : "grid-cols-2 gap-[40%] lg:gap-[60%]"}`}
            >
              {row.map((item) => (
                <Card key={item.label} src={item.src} label={item.label} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
