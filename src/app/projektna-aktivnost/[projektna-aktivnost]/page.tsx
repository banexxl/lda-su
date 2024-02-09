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
    projectURL: string
  }
}

const getProject = async (link: string) => {
  const project = await projectsServices().getProjectByLink(link)
  return project
}

export async function generateStaticParams() {
  try {
    const allProjects = await projectsServices().getAllProjects();
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

export default async function ProjectPage({ params }: any) {

  const project = await getProject('/' + Object.keys(params)[0] + '/' + params['projektna-aktivnost'])

  if (!project) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return <ProjectView project={project} />
}
