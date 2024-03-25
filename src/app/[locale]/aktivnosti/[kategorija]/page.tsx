import { ActivitiesView } from 'src/sections/view/activity-list-view';
import { activityServices } from 'src/services/activities-services';
import { activityServices_en } from 'src/services/activities-services_en';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Aktivnosti',
};

export default async function ActivitiesPage({ params }: any) {

  const activitiesByCategory_en: Activity[] = await activityServices_en().getActivitiesByCategory(params['kategorija']);
  const activitiesByCategory_sr: Activity[] = await activityServices().getActivitiesByCategory(params['kategorija']);

  return (
    params.locale === 'en' ?
      <ActivitiesView featuredActivities={activitiesByCategory_en} />
      :
      <ActivitiesView featuredActivities={activitiesByCategory_sr} />
  )
}
