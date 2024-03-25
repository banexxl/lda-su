import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import { projectsServices } from 'src/services/project-services';
import { projectsServices_en } from 'src/services/project-services_en';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};


export default async function ProjectsPage({ params }: any) {

  let completedProjectSummaries_sr: any = await projectsServices().getCompletedProjectSummaries()
  let completedProjectSummaries_en: any = await projectsServices_en().getCompletedProjectSummaries()

  return (
    params.locale === 'en' ?
      <ProjectsSummariesView completedProjectSummaries={completedProjectSummaries_en} inProgressProjectSummaries={[]} featuredProjectSummaries={[]} />
      :
      <ProjectsSummariesView completedProjectSummaries={completedProjectSummaries_sr} inProgressProjectSummaries={[]} featuredProjectSummaries={[]} />
  )
}

