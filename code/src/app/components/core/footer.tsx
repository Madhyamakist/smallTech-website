import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="flex flex-col items-center gap-2">
                <Link href="mailto:contact@madhyamakist.com" className="hover:underline">
                    contact@madhyamakist.com
                </Link>
                <span>
                    © {currentYear} Madyamakist Pvt Ltd. All rights reserved.
                </span>
            </div>

        </footer>
    );
}