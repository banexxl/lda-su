import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import projectsServices from 'src/services/project-services';
import { Project } from 'src/types/project';

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
  return <ProjectsSummariesView allProjects={allProjects} />; // Render ProjectsView component with fetched projects
}

