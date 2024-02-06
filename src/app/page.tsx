import { LandingView } from 'src/sections/view/landing-view';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';
import { Activity } from 'src/types/activity';
import { ProjectSummary } from 'src/types/projectSummary';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
};

const retrieveAllActivities = async () => {
  try {
    const allActivities: Activity[] | undefined = await activityServices().getAllActivities();
    if (allActivities) {
      return allActivities;
    } else {
      throw new Error('Failed to retrieve activities');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};

const retrieveCompletedActivities = async () => {
  try {
    const completedActivities: Activity[] | undefined = await activityServices().getCompletedActivities();
    if (completedActivities) {
      return completedActivities;
    } else {
      throw new Error('Failed to retrieve activities');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};

const retrieveFeaturedCompletedActivities = async () => {
  try {
    const completedActivities: Activity[] = await activityServices().getFeaturedCompletedActivities();

    if (completedActivities) {
      return completedActivities;
    } else {
      throw new Error('Failed to retrieve activities');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};

const retrieveInProgressActivities = async () => {
  try {
    const completedActivities: Activity[] | undefined = await activityServices().getInProgressActivities();
    if (completedActivities) {
      return completedActivities;
    } else {
      throw new Error('Failed to retrieve activities');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};

const retrieveAllProjectSummaries = async () => {
  try {
    const allProjectSummaries: ProjectSummary[] | undefined = await projectsServices().getAllProjectSummaries();
    if (allProjectSummaries) {
      return allProjectSummaries;
    } else {
      throw new Error('Failed to retrieve allProjectSummaries');
    }
  } catch (error) {
    console.error('Error retrieving allProjectSummaries:', error);
    throw error;
  }
};

const retrieveActiveProjectSummaries = async () => {
  try {
    const completedActivities: ProjectSummary[] | undefined = await projectsServices().getInProgressProjectSummaries();
    if (completedActivities) {
      return completedActivities;
    } else {
      throw new Error('Failed to retrieve activities');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};

export default async function LandingPage() {

  const allActivities: Activity[] = await activityServices().getAllActivities()
  const completedActivities: Activity[] = await activityServices().getCompletedActivities()
  const featuredCompletedActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await activityServices().getInProgressActivities()
  const trendingActivities: Activity[] = await activityServices().getFeaturedCompletedActivities()
  const activeProjectSummaries: ProjectSummary[] = await projectsServices().getInProgressProjectSummaries()
  const featuredProjectSummaries: ProjectSummary[] = await projectsServices().getRandomCompletedProjectSummaries()

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
