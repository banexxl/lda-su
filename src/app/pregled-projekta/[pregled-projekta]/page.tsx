import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectSummaryView } from 'src/sections/view/project-summary-view';
import projectsServices from 'src/services/project-services';
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
    const allProjectSummaries = await projectsServices().getAllProjectSummaries();

    return allProjectSummaries.map((projectSummary: ProjectSummary) => (
      {
        'pregled-projekta': projectSummary.projectSummaryURL.toString()
      }
    ));
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
