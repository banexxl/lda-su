import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};


export default async function ProjectsPage() {

  let completedProjectSummaries: any = await projectsServices().getCompletedProjectSummaries()

  return <ProjectsSummariesView completedProjectSummaries={completedProjectSummaries} inProgressProjectSummaries={[]} featuredProjectSummaries={[]} />; // Render ProjectsView component with fetched projects
}

