import Header from "./core/header"
import { SectionContent } from "../models/sectionContent";
export default function Section({ id, title, mainHeader, content }: SectionContent) {
    return (

        <section
            id={id}
            className="h-screen snap-start snap-always flex flex-col"
        >
            {mainHeader && <Header />}
            <div className="flex-grow flex flex-col m-4">
                <h1>{title}</h1>
                <div>{content}</div>
            </div>
        </section>

    );
}
