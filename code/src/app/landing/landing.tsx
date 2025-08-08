import Image from "next/image";
import Header from "../components/core/header"

export default function Landing() {
  return (
    <div className="relative">
      <Header />
      <div className="m-4">
        <h1>Landing page</h1>
      </div>
      <div className="absolute">
        <Image
          src="/globe.png"
          width={350}
          height={350}
          alt="globe"
          className="animate-spin [animation-duration:20s] [animation-timing-function:linear] [animation-iteration-count:infinite]"
        />

      </div>
    </div>

  );
}
