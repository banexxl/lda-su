import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectView } from 'src/sections/view/project-view';
import projectsServices from 'src/services/project-services';
import { Project } from 'src/types/project';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projekat',
};

type ProjectPageProps = {
  params: {
    'projektna-aktivnost': string
  }
}

export async function generateStaticParams(): Promise<{ 'projektna-aktivnost': string }[]> {
  try {
    const allProjects = await projectsServices().getAllProjects();
    return (allProjects ?? []).map((project: Project) => (
      {
        'projektna-aktivnost': project.projectURL.toString()
      }
    ))
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {

  const project: Project | null = await projectsServices().getProjectByLink(params['projektna-aktivnost'])

  if (!project) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectView project={project} />
}
