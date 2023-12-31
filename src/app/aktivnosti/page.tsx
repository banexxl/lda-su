import { ActivitiesView } from 'src/sections/view/activity-list-view';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Aktivnosti',
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

export default async function ActivitiesPage() {

  const allActivities: Activity[] = await retrieveAllActivities()
  const completedActivities: Activity[] = await retrieveCompletedActivities()
  const featuredCompletedActivities: Activity[] = await retrieveFeaturedCompletedActivities()
  const inProgressActivities: Activity[] = await retrieveInProgressActivities()
  const trendingActivities: Activity[] = await retrieveFeaturedCompletedActivities()

  return <ActivitiesView allActivities={allActivities} inProgressActivities={inProgressActivities} completedActivities={completedActivities} featuredActivities={featuredCompletedActivities} trendingActivities={trendingActivities} />;
}
