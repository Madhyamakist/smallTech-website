import Image from "next/image";
import Header from "../components/core/header"

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />

      <h1 className="absolute top-[15%] ">
        AI-First Tech Services
      </h1>

      {/* <div className="absolute top-[10%] right-0 translate-x-1/3 translate-y-1/5 "> */}
         <div className="absolute top-[20%] right-[-20%] md:right-[-10%] lg:right-[15%] lg:top-[10%] w-[90%] sm:w-[60%] md:w-[40%]">
        <Image
          src="./globe.png"
          width={1000}
          height={1000}
          alt="globe"
          className="animate-spin [animation-duration:20s] [animation-timing-function:linear] [animation-iteration-count:infinite]"
        />
      </div>

      <div className="absolute left-[0%] top-[60%] max-w-[35%]">
        <h2 className="leading-tight">
          Integrate AI across your stack and into your existing workflows
        </h2>
      </div>
      <div className="absolute right-8 bottom-[10%] max-w-[30%]">
        <h2 className="leading-tight">
          our service provider network has got all your needs covered
        </h2>
      </div>
    </div>

  );
}
