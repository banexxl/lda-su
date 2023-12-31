import { LandingView } from 'src/sections/view/landing-view';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';
import { Activity } from 'src/types/activity';

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
    const completedActivities: Activity[] | undefined = await activityServices().getFeaturedCompletedActivities();

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


const retrieveAllProjects = async () => {
  try {
    const completedActivities: Activity[] | undefined = await projectsServices().getAllProjects();
    if (completedActivities) {
      return completedActivities;
    } else {
      throw new Error('Failed to retrieve projects');
    }
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw error;
  }
};


export default async function LandingPage() {

  const allActivities: Activity[] = await retrieveAllActivities()
  const completedActivities: Activity[] = await retrieveCompletedActivities()
  const featuredCompletedActivities: Activity[] = await retrieveFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await retrieveInProgressActivities()
  const trendingActivities: Activity[] = await retrieveFeaturedCompletedActivities()
  const activeProjects: any = await retrieveAllProjects()

  return <LandingView activeProjects={activeProjects} allActivities={allActivities} inProgressActivities={inProgressActivities} completedActivities={completedActivities} featuredActivities={trendingActivities} featuredCompletedActivities={featuredCompletedActivities} trendingActivities={trendingActivities} />;
}
