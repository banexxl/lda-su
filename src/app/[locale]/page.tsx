import { getTranslations } from 'next-intl/server';
import { locales } from 'src/middleware';
import { LandingView } from 'src/sections/view/landing-view';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';
import { Activity } from 'src/types/activity';
import { ProjectSummary } from 'src/types/projectSummary';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LandingPage() {

  const allActivities: Activity[] = await activityServices().getAllActivities()
  const completedActivities: Activity[] = await activityServices().getCompletedActivities()
  const featuredCompletedActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await activityServices().getInProgressActivities()
  const trendingActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const activeProjectSummaries: ProjectSummary[] = await projectsServices().getInProgressProjectSummaries()
  const featuredProjectSummaries: ProjectSummary[] = await projectsServices().getRandomCompletedProjectSummaries()

  const t = await getTranslations('home');

  return <LandingView
    buttonHero={t('buttonHero')}
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
