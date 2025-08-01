import Image from "next/image";
import { SectionContent } from "../models/sectionContent";
export interface SectionProps {
    heading: string;
    text: string;
}
export default function Section({ heading, text, imageSrc, imageAlt, imageTitle }: SectionContent) {
    return (
        <div className="mb-6">
            <h2 className="my-1">{heading}</h2>
            <p>{text}  </p>
            {imageSrc && (
                <div className="text-center my-3  flex flex-col items-center ">
                    <Image src={imageSrc}
                        alt={imageAlt || heading}
                        className="rounded-lg shadow-md"
                        width={700}
                        height={0}
                    />
                    <span className="text-xs mx-2 mt-2">{imageTitle}</span>
                </div>
            )}
        </div>
    )
}