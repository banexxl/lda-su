import { ProjectsView } from 'src/sections/view/project-list-view';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};

const getAllProjects = () => {

  const projects = projectsServices().getAllProjects()
  return projects

}

export default async function ProjectsPage() {
  let allProjects: any = await getAllProjects()
  console.log('aaaaa', allProjects);

  return <ProjectsView allProjects={allProjects} />; // Render ProjectsView component with fetched projects
}

