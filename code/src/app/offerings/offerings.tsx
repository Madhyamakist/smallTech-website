import Image from "next/image";
import OfferingCard from "./card";
import { offeringItems, techItems } from "./icons";

export default function Offerings() {
  return (
    <div className=" max-h-screen flex flex-col items-center justify-center ">
      {/* Section 2: Features */}
      <div className=" flex flex-col items-center">
        <h1 className="title mt-2">What makes us stand out</h1>
        <div className="card-container gap-6 md:gap-4 lg:gap-4  ">
          {offeringItems.map((row, idx) => (
            <div
              key={idx}
              className={`grid ${row.length === 1
                ? "grid-cols-1"
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
      <h1 className="title">
        Supported Technologies
      </h1>

      <div className="grid grid-cols-4 sm:grid-cols-4 gap-8 lg:m-0">
        {techItems.map((icon, idx) => (
          <div key={idx} className="flex justify-center">
            <Image
              src={`./${icon}`}
              alt={icon}
              width={35}
              height={35}
            />
          </div>
        ))}
      </div>


    </div>
  );
}
