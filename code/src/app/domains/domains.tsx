import Image from "next/image";

export default function Domains() {
  return (
    // <div className="relative min-h-screen">
    <div className="relative min-h-screen flex flex-col items-center justify-center ">


      <h1 className="title">Tech Domains</h1>
      <div className="card-container">
        {/* 1st Row */}
        <div className="grid grid-cols-2 justify-between">
          <div className="card">
            <Image
              src="/appdev.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">App Dev</span>
          </div>
          <div className="card">
            <Image
              src="/webdev.png"
              width={50}
              height={50}
              alt="App Dev" />
            <span className="text-sm font-medium">Web Dev</span>
          </div>
        </div>
        {/* 2nd row */}
        <div className="flex justify-center m-5">
          <div className="card">
            <Image
              src="/ai.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">AI</span>
          </div>
        </div>
        {/* Third row - 2 items */}
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <Image
              src="/cloud.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">Cloud</span>
          </div>
          <div className="card">
            <Image
              src="/security.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">Security</span>
          </div>
        </div>
      </div>

      <h1 className="title">Business Workflows</h1>
      <div className="card-container">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="card">
            <Image
              src="/charity.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">Healthcare</span>
          </div>
          <div className="card">
            <Image
              src="/ecommerce.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-xs font-medium">Ecommerce</span>
          </div>
        </div>

        {/* Second row - 2 items */}
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <Image
              src="/logistics.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">Logistics</span>
          </div>
          <div className="card">
            <Image
              src="/marketplace.png"
              width={50}
              height={50}
              alt="App Dev"
            />
            <span className="text-sm font-medium">Marketplace</span>
          </div>
        </div>
      </div>

    </div>

  );
}
