import { LandingView } from 'src/sections/view/landing-view';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';
import { Activity } from 'src/types/activity';
import { Project } from 'src/types/project';
import { ProjectSummary } from 'src/types/projectSummary';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
  icons: {
    icon: '/favicon.ico',
  },
};

export async function generateStaticParams() {

  const allProjects: Project[] = await projectsServices().getAllProjects()
  const allProjectSummaries: ProjectSummary[] = await projectsServices().getAllProjectSummaries()
  const allActivities: Activity[] = await activityServices().getAllActivities()

  const params: any[] = [];

  allActivities.forEach((activity: Activity) => {
    params.push({ aktivnost: activity.activityURL });
  });

  allProjects.forEach((project: Project) => {
    params.push({ 'projektna-aktivnost': project.projectURL });
  });

  allProjectSummaries.forEach((projectSummary: ProjectSummary) => {
    params.push({ 'pregled-projekta': projectSummary.projectSummaryURL });
  }
  )

  return params;
}

export default async function LandingPage() {

  // const t = await getTranslations('home');

  const allActivities: Activity[] = await activityServices().getAllActivities()
  const completedActivities: Activity[] = await activityServices().getCompletedActivities()
  const featuredCompletedActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await activityServices().getInProgressActivities()
  const trendingActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const activeProjectSummaries: ProjectSummary[] = await projectsServices().getInProgressProjectSummaries()
  const featuredProjectSummaries: ProjectSummary[] = await projectsServices().getRandomCompletedProjectSummaries()

  return (

    <LandingView
      activeProjectSummaries={activeProjectSummaries}
      allActivities={allActivities}
      inProgressActivities={inProgressActivities}
      completedActivities={completedActivities}
      featuredActivities={trendingActivities}
      featuredCompletedActivities={featuredCompletedActivities}
      trendingActivities={trendingActivities}
      featuredProjectSummaries={featuredProjectSummaries}
    />
  )
} 
