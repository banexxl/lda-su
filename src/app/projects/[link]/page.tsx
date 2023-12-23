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
    link: string
  }
}
const getProjectByID = async (link: string) => {
  const project = projectsServices().getProjectByLink(link)
  return project
}

export async function generateStaticParams() {
  try {
    const allProjects = await projectsServices().getAllProjectLinks();

    return allProjects!.map((project: Project) => (
      {
        link: project.link.toString()
      }
    ))

  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectByID(params.link)

  if (!project) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectView project={project} />
}
