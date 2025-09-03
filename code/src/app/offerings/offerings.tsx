import Image from "next/image";
import OfferingCard from "./card";
import { offeringItems,techItems } from "./icons";

export default function Offerings() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col relative">

      <h1 className="title py-[10%] lg:py-0">
        Technologies we support
      </h1>

     <div className="grid grid-cols-4 sm:grid-cols-4 gap-8 lg:m-0">
      {techItems.map((icon, idx) => (
        <div key={idx} className="flex justify-center">
          <Image
            src={`./${icon}`}
            alt={icon}
            width={40}
            height={0}
            className="lg:w-15"
          />
        </div>
      ))}
    </div>

      {/* Section 2: Features */}
      <div className=" flex flex-col items-center">
        <h1 className="title pt-[10%] lg:pt-0">What makes us stand out</h1>
        <div className="card-container flex flex-col gap-6 md:gap-0 lg:gap-0">
          {offeringItems.map((row, idx) => (
            <div
              key={idx}
              className={`grid ${row.length === 1
                  ? "grid-cols-1 justify-center px-[30%]"
                  : "grid-cols-2 gap-6"
                }`}
            >
              {row.map((item) => (

                <OfferingCard key={item.label} src={item.src} label={item.label} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
