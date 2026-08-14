import Box from "../components/common/box";
import Image from "next/image";
import { Button } from "../components/common/button";

const products = [
  {
    image: "/zero.svg",
    title: "Zer0",
    subtitle: "AI Agents for Small Businesses",
    description: "Embeddable Smart Agent For Your Website. Automate Customer Support, Lead Generation, and Sales with AI.",
    buttonText: "Visit Site",
    url: "https://zero.smalltech.in",
  },
  {
    image: "/local.png",
    title: "#local",
    subtitle: "Location Based Community Platform",
    description: "It is the fastest way to report local potholes, illegal dumping, broken lights, and other civic issues directly to your local government.",
    buttonText: "Download",
    url: "https://local.smalltech.in",
  },
];

const clients = [
  { name: "Baamboojah", logo: "/baamboojah-logo.svg", url: "https://baamboojah.com", showName: false,  logoW: 90,  logoH: 90  },
  { name: "UP Police",   logo: "/up police.png",        url: "https://www.linkedin.com/posts/madhyamakist_what-does-real-sovereign-ai-mean-for-india-ugcPost-7462018105133940736-wDwl", showName: false,  logoW: 90,  logoH: 90  },
  { name: "Canvs",       logo: "/canvs.svg",            url: "", showName: false,  logoW: 180, logoH: 43  },
  { name: "Swiggy",      logo: "/swiggy.png",           url: "", showName: false, logoW: 90, logoH: 90  },
  { name: "MediBuddy",   logo: "/medibuddy.png",        url: "", showName: false, logoW: 90, logoH: 90  },
  { name: "Super Procure", logo: "/super procure.png",  url: "", showName: false, logoW: 220, logoH: 90  },
  { name: "Loblaws",     logo: "/loblaws.svg",           url: "", showName: false, logoW: 220, logoH: 38  },
  { name: "Digital Futurists", logo: "/df.png",         url: "", showName: false, logoW: 180, logoH: 50  },
  { name: "Avanse",      logo: "/avanse-logo.svg",       url: "", showName: false, logoW: 170, logoH: 45  },
  { name: "TruHome",     logo: "/truhome-logo.svg",      url: "", showName: false, logoW: 140, logoH: 70  },
  { name: "Ebco",        logo: "/ebco.png",              url: "", showName: false, logoW: 120, logoH: 70  },
  { name: "Warburg Pincus", logo: "/Warburg-pincus.png", url: "", showName: false, logoW: 160, logoH: 89 },
  { name: "Parksons",    logo: "/Parksons-logo-1.png",   url: "", showName: false, logoW: 200, logoH: 46  },
];

type Client = typeof clients[number];

function ClientLogo({ client, small = false }: { client: Client; small?: boolean }) {
  const w = small ? Math.round(client.logoW * 0.68) : client.logoW;
  const h = small ? Math.round(client.logoH * 0.68) : client.logoH;
  return (
    <button
      onClick={() => client.url && window.open(client.url, "_blank")}
      className={`flex flex-row justify-center items-center rounded-[20px] bg-transparent w-[170px] md:w-[260px] py-1 md:py-3 mx-0 md:mx-2 shrink-0 border-0 ${client.url ? "cursor-pointer" : "cursor-default"}`}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={w}
        height={h}
        className="object-contain shrink-0"
        style={{ width: w, height: h }}
        loading="eager"
      />
      {client.showName && (
        <span className="text-xs font-[600] tracking-wide text-expresso whitespace-nowrap">
          {client.name}
        </span>
      )}
    </button>
  );
}

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden px-[3%] pt-3">

      <h1 className="hidden md:block">Building Smart Tools for a Smarter World</h1>
      <h1 className="md:hidden">Building Smart Tools for a Smarter World</h1>
      <h3 className="mb-4 font-[200]">Explore our portfolio of AI agents and apps.</h3>

      {/* Mobile: original tall vertical cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {products.map((p) => (
          <Box
            key={p.title}
            image={p.image}
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            buttonText={p.buttonText}
            onButtonClick={() => window.open(p.url, "_blank")}
            className="w-full"
          />
        ))}
      </div>

      {/* Desktop: compact horizontal cards, two per row */}
      <div className="hidden md:grid md:grid-cols-2 gap-5 lg:px-[5%]">
        {products.map((p) => (
          <div
            key={p.title}
            className="
              flex flex-row items-center gap-5
              rounded-[24px]
              bg-[linear-gradient(to_bottom,#F2E3E1_0%,#DBC2BD_100%)]
              shadow-[0_3px_20px_0_rgba(0,0,0,0.4)]
              p-5
            "
          >
            <Image
              src={p.image}
              alt={p.title}
              width={72}
              height={72}
              className="object-contain opacity-70 shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-[500] text-expresso leading-tight">{p.title}</h3>
              <p className="text-liver-brown text-sm font-[400] mt-0.5">{p.subtitle}</p>
              <p className="text-liver-brown text-sm font-[300] mt-1.5 leading-relaxed line-clamp-2">{p.description}</p>
              <div className="mt-3 flex justify-center -ml-[46px]">
                <Button onClick={() => window.open(p.url, "_blank")} text={p.buttonText} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mt-4">
        <h2 className="text-expresso font-[500]">Brands</h2>
        <p className="text-liver-brown font-[300] mt-1 mb-8">
          Brands our team has worked with
        </p>

        {/* Desktop: two rows, full size */}
        <div className="hidden md:flex flex-col gap-3">
          {[clients, [...clients].reverse()].map((row, rowIdx) => (
            <div key={rowIdx} className="brands-row relative overflow-hidden h-[120px]">
              <div
                className={`absolute flex top-0 left-0 ${rowIdx === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
                style={{ width: "max-content", willChange: "transform", transform: "translateZ(0)" }}
              >
                {Array.from({ length: 10 }, () => row).flat().map((client, i) => (
                  <ClientLogo key={i} client={client} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: two rows, small size */}
        <div className="md:hidden flex flex-col gap-3">
          {[clients, [...clients].reverse()].map((row, rowIdx) => (
            <div key={rowIdx} className="brands-row relative overflow-hidden h-[70px]">
              <div
                className={`absolute flex top-0 left-0 ${rowIdx === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
                style={{ width: "max-content", willChange: "transform", transform: "translateZ(0)" }}
              >
                {Array.from({ length: 10 }, () => row).flat().map((client, i) => (
                  <ClientLogo key={i} client={client} small />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
