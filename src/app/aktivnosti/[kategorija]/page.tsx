import { ActivitiesView } from 'src/sections/view/activity-list-view';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Aktivnosti',
};

export default async function ActivitiesPage({ params }: any) {

  const activitiesByCategory: Activity[] = await activityServices().getActivitiesByCategory(params['kategorija']);

  return <ActivitiesView featuredActivities={activitiesByCategory} />;
}
