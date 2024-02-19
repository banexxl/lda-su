import { ActivitiesView } from 'src/sections/view/activity-list-view';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
     title: 'LDA Subotica: Arhiva Aktivnosti',
};

export default async function SearchPage() {

     const searchedData = localStorage.getItem('searchedData')
     const completedActivities: Activity[] = await activityServices().getCompletedActivities()

     return <ActivitiesView completedActivities={completedActivities} featuredActivities={[]} inProgressActivities={[]} />;
}
