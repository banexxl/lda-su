import { ProjectsView } from 'src/sections/view/project-list-view';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};

export default async function ProjectsPage() {
  const data = await getAllProjects()
  return <ProjectsView allProjects={data} />;
}

export async function getAllProjects() {
  // Fetch data from an API or other source
  const allProjects = await projectsServices().getAllProjects()
  return allProjects
}
