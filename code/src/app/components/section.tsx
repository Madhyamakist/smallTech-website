import Header from "./core/header"
import { SectionContent } from "../models/sectionContent";
export default function Section({ id, mainHeader, content }: SectionContent) {
    return (

        <section
            id={id}
            className="h-screen snap-start snap-always flex flex-col"
        >
            {mainHeader && <Header />}
            <div className="flex-grow flex flex-col m-4">
              
                <div>{content}</div>
            </div>
        </section>

    );
}
