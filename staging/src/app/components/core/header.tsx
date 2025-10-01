"use client";
import Image from "next/image";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Header() {
    return (
        <header>
            <div>
                <Image
                    src={`${basePath}/logo.png`}
                    alt="Logo"
                    width={60}
                    height={0}
                />
            </div>
            <div className="flex flex-col justify-end">
                <h2 className="">smallTech</h2>
                <p className="font-normal leading-none">a madhyamakist enterprise</p>
            </div>
        </header>
    );
}