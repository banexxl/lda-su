import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectSummaryView } from 'src/sections/view/project-summary-view';
import projectsServices from 'src/services/project-services';
import projectsServices_en from 'src/services/project-services_en';
import { ProjectSummary } from 'src/types/projectSummary';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Pregled Projekta',
};

type ProjectSummaryPageProps = {
  params: {
    'pregled-projekta': string
  }
}

export async function generateStaticParams() {
  try {
    const enProjectSummaries = await projectsServices_en().getAllProjectSummaries();
    const srProjectSummaries = await projectsServices().getAllProjectSummaries();
    const getAllProjectSummaries = enProjectSummaries.concat(srProjectSummaries);

    const paths = getAllProjectSummaries.map((projectSummary: ProjectSummary) => (
      {
        locale: projectSummary.locale.toString(),
        'pregled-projekta': projectSummary.projectSummaryURL.toString()
      }
    ))

    return paths
  } catch (error) {
    console.error('Error fetching project summaries:', error);
    return [];
  }
}

export default async function ProjectSummaryPage({ params }: ProjectSummaryPageProps) {

  const projectSummary: any = await projectsServices().getProjectSummaryByLink(params['pregled-projekta'])

  if (!projectSummary || projectSummary.length == 0) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectSummaryView key={Math.floor(Math.random() * 999)} projectSummary={projectSummary[0]} />
}
