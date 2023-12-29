import { PublicationsView } from "src/sections/view/publications-view";
import projectsServices from "src/services/project-services";

export const metadata = {
     title: 'LDA-Subotica: Publications',
};

const getAllPublications = () => {

     const publications = projectsServices().getAllPublications()
     return publications

}

export default async function ComingSoonPage() {

     const publications: string[] = await getAllPublications()

     return <PublicationsView publications={publications} />;
}

