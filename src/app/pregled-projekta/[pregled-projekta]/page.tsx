import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectSummaryView } from 'src/sections/view/project-summary-view';
import projectsServices from 'src/services/project-services';
import { ProjectSummary } from 'src/types/projectSummary';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Project',
};

type ProjectSummaryPageProps = {
  params: {
    projectSummaryURL: string
  }
}

const getProjectSummary = async (link: string) => {
  const projectSummary = await projectsServices().getProjectSummaryByLink(link)
  return projectSummary
}

export async function generateStaticParams() {
  try {
    const allProjectSummaries = await projectsServices().getAllProjectSummaries();

    return allProjectSummaries.map((projectSummary: ProjectSummary) => (
      {
        link: projectSummary.projectSummaryURL.toString()
      }
    ))

  } catch (error) {
    console.error('Error fetching project summaries:', error);
    return null;
  }
}

export default async function ProjectSummaryPage({ params }: any) {

  const projectSummary: any = await getProjectSummary(params['pregled-projekta'])

  if (!projectSummary || projectSummary.length == 0) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectSummaryView projectSummary={projectSummary[0]} />
}
