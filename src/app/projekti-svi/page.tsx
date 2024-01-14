import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};

const getAllProjectSummaries = () => {

  const projectSummaries = projectsServices().getAllProjectSummaries()
  return projectSummaries

}

export default async function ProjectsPage() {
  let allProjectSummaries: any = await getAllProjectSummaries()

  return <ProjectsSummariesView allProjects={allProjectSummaries} />; // Render ProjectsView component with fetched projects
}

