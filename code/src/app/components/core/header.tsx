"use client";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div>
                <Image
                    src="./logo.png"
                    alt="Logo"
                    width={60}
                    height={0}
                />
            </div>
            <h3>Madhyamakist</h3>
        </header>
    );
}