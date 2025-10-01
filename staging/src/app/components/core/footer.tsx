import Link from "next/link";
import Image from "next/image";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="flex items-center justify-center">
             <div className="flex flex-col text-xs space-y-2 ">
          <Link
            href="https://blog.smallTech.in"
            className="flex hover:underline space-x-2"
          >
            <Image src={`${basePath}/blog.png`} width={15} height={15} alt="blog" />
            <span className="text-white ">blog.smallTech.in</span>
          </Link>
          <Link
            href="mailto:contact@madhyamakist.com"
            className="flex items-center hover:underline space-x-2"
          >
            <Image src={`${basePath}/email.png`} width={15} height={15} alt="email" />
            <span className="text-white">contact@madhyamakist.com</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Image src={`${basePath}/copyright.png`} width={17} height={17} alt="blog" />
            <span className="text-white">{currentYear} Madhyamakist Pvt Ltd</span>
          </div>
        </div>

        </footer>
    );
}