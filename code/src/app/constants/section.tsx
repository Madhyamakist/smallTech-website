import { SectionContent } from "../models/sectionContent";
import Landing from "../components/pages/landing";
import Offerings from "../components/pages/offerings";
import Domains from "../components/pages/domains";
export const sections: SectionContent[] = [
    {
        id: 'landing',
        mainHeader: true,
        content: <Landing />
    },
    {
        id: "domains",
        mainHeader: false,
        content: <Domains />

    },
    {
        id: "offerings",
        mainHeader: false,
        content: <Offerings />

    },

];