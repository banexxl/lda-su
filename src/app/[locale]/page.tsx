import { getTranslations } from 'next-intl/server';
import { locales } from 'src/middleware';
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

  const allProjects = projectsServices().getAllProjects()
  const allProjectSummaries = projectsServices().getAllProjectSummaries()
  const allActivities = activityServices().getAllActivities()

  const allProjectURLs = (await allProjects).map((project: Project) => project.projectURL)
  return locales.map((locale) => ({ locale }));
}

export default async function LandingPage({ params: { locale } }: any) {

  const allActivities: Activity[] = await activityServices().getAllActivities()
  const completedActivities: Activity[] = await activityServices().getCompletedActivities()
  const featuredCompletedActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await activityServices().getInProgressActivities()
  const trendingActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const activeProjectSummaries: ProjectSummary[] = await projectsServices().getInProgressProjectSummaries()
  const featuredProjectSummaries: ProjectSummary[] = await projectsServices().getRandomCompletedProjectSummaries()

  const t = await getTranslations('home');

  return <LandingView
    activeProjectSummaries={activeProjectSummaries}
    allActivities={allActivities}
    inProgressActivities={inProgressActivities}
    completedActivities={completedActivities}
    featuredActivities={trendingActivities}
    featuredCompletedActivities={featuredCompletedActivities}
    trendingActivities={trendingActivities}
    featuredProjectSummaries={featuredProjectSummaries}
  />;
} 
