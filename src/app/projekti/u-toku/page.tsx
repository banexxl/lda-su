import { ProjectsSummariesView } from 'src/sections/view/project-summaries-list-view';
import { generateSeoMetadata } from 'src/lib/seo';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = generateSeoMetadata({
  title: 'Projekti u toku',
  description: 'Pregled projekata koje LDA Subotica trenutno sprovodi sa partnerima i lokalnom zajednicom.',
  path: '/projekti/u-toku',
  keywords: ['projekti', 'u toku', 'LDA Subotica'],
});

export default async function ProjectsPage() {

  let inProgressProjectSummaries: any = await projectsServices().getInProgressProjectSummaries()

  return <ProjectsSummariesView inProgressProjectSummaries={inProgressProjectSummaries} completedProjectSummaries={[]} featuredProjectSummaries={[]} />; // Render ProjectsView component with fetched projects
}

