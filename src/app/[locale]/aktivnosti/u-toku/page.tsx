import { ActivitiesView } from 'src/sections/view/activity-list-view';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Aktivnosti',
};

export default async function ActivitiesPage() {

  const inProgressActivities: Activity[] = await activityServices().getInProgressActivities();

  return <ActivitiesView inProgressActivities={inProgressActivities} completedActivities={[]} featuredActivities={[]} />;
}
