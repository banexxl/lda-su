import { Box } from '@mui/material';
import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectView } from 'src/sections/view/project-view';
import projectsServices from 'src/services/project-services';
import { Project } from 'src/types/project';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Project',
};

type ProjectPageProps = {
  params: {
    projectURL: string
  }
}
const getProjectByLink = async (link: string) => {
  const project = await projectsServices().getProjectByLink(link)
  return project
}

export async function generateStaticParams() {
  try {
    const allProjects = await projectsServices().getAllProjectLinks();
    return allProjects!.map((project: Project) => (
      {
        link: project.projectURL.toString()
      }
    ))

  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectByLink(params.projectURL)
  if (!project) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectView project={project} />
}
