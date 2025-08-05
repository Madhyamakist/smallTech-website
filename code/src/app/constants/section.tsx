import { SectionContent } from "../models/sectionContent";
import Landing from "../components/sections/landing";
import Offerings from "../components/sections/offerings";
import Domains from "../components/sections/domains";
export const sections: SectionContent[] = [
    {
        id: 'landing',
        title: "Landing Section",
        mainHeader: true,
        content: <Landing />

    },
    {
        id: "domains",
        title: "Domain Section",
        mainHeader: false,
        content: <Domains />

    },
    {
        id: "offerings",
        title: "OfferingSection",
        mainHeader: false,
        content: <Offerings />

    },

];