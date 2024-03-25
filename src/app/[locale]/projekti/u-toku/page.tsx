import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import { projectsServices } from 'src/services/project-services';
import { projectsServices_en } from 'src/services/project-services_en';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};

export default async function ProjectsPage({ params }: any) {

  let inProgressProjectSummaries_en: any = await projectsServices_en().getInProgressProjectSummaries()
  let inProgressProjectSummaries_sr: any = await projectsServices().getInProgressProjectSummaries()

  return (
    params.locale === 'en' ?
      <ProjectsSummariesView inProgressProjectSummaries={inProgressProjectSummaries_en} completedProjectSummaries={[]} featuredProjectSummaries={[]} />
      :
      <ProjectsSummariesView inProgressProjectSummaries={inProgressProjectSummaries_sr} completedProjectSummaries={[]} featuredProjectSummaries={[]} />
  )
}

