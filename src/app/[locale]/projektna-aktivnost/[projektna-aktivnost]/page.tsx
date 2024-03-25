import { NotFoundView } from 'src/sections/error/not-found-view';
import { ProjectView } from 'src/sections/view/project-view';
import { projectsServices } from 'src/services/project-services';
import { projectsServices_en } from 'src/services/project-services_en';
import { Project } from 'src/types/project';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projekat',
};

type ProjectPageProps = {
  params: {
    locale: string
    'projektna-aktivnost': string
  }
}

export async function generateStaticParams() {
  try {
    const allProjects_en = await projectsServices_en().getAllProjects();
    const allProjects_sr = await projectsServices().getAllProjects();
    const allProjects = allProjects_en.concat(allProjects_sr);

    return allProjects!.map((project: Project) => (
      {
        locale: project.locale.toString(),
        'projektna-aktivnost': project.projectURL.toString()
      }
    ))

  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {

  const project_en = await projectsServices_en().getProjectByLink(params['projektna-aktivnost'])
  const project_sr = await projectsServices().getProjectByLink(params['projektna-aktivnost'])

  if (!project_sr || !project_en) {
    // Handle the case where the project is undefined
    return <NotFoundView />
  }

  return (
    params.locale === 'en' ?
      <ProjectView key={Math.floor(Math.random() * 9999)} project={project_en} />
      :
      <ProjectView key={Math.floor(Math.random() * 9999)} project={project_sr} />
  )
}
