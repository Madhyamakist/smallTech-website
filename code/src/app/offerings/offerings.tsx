import Image from "next/image";
import OfferingCard from "./card";
import { offeringItems,techItems } from "./icons";

export default function Offerings() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center relative">

      <h1 className="title">
        Technologies we support
      </h1>

     <div className="grid grid-cols-4 sm:grid-cols-4 gap-8 lg:m-0">
      {techItems.map((icon, idx) => (
        <div key={idx} className="flex justify-center">
          <Image
            src={`./${icon}`}
            alt={icon}
            width={50}
            height={50}
          />
        </div>
      ))}
    </div>

      {/* Section 2: Features */}
      <div className=" flex flex-col items-center">
        <h1 className="title mt-2">What makes us stand out</h1>
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
