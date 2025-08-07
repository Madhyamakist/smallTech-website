
import Landing from "../components/pages/landing";
import Offerings from "../components/pages/offerings";
import Domains from "../components/pages/domains";
import { PageContent } from "../models/pageContent";
export const pages: PageContent[] = [
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