import { PageContent } from "../models/pageContent";
export default function Page({ id, content }: PageContent) {
    return (
        <section
            id={id}
            className="h-screen snap-start snap-always flex flex-col"
        >
            <div className="flex-grow flex flex-col m-4">
                <div>{content}</div>
            </div>
        </section>

    );
}
