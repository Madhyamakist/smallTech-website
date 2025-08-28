import Card from "./card";

interface DomainsSectionProps {
  title: string;
  items: { src: string; label: string }[][];
}

export default function DomainsSection({ title, items }: DomainsSectionProps) {
  return (
    <div className=" flex flex-col items-center">
      <h1 className="title">{title}</h1>
      <div className="card-container flex flex-col gap-6 md:gap-0 lg:gap-0 items-center justify-centerp ">
        {items.map((row, idx) => (
          <div
            key={idx}
            className={`grid ${row.length === 1 ? "grid-cols-1 justify-center px-[30%]" : "grid-cols-2 gap-6"}`}
          >
            {row.map((item) => (
              <Card key={item.label} src={item.src} label={item.label} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
