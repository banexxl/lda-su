import { locales } from 'src/middleware';
import { NotFoundView } from 'src/sections/error/not-found-view';
import { ActivityView } from 'src/sections/view/activity-view';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Aktivnost',
};

type ActivityPageProps = {
  params: {
    aktivnost: string
  }
}

export async function generateStaticParams() {

  try {
    const allActivities = await activityServices().getAllActivities();
    return allActivities!.map((activity: Activity) => (
      {
        aktivnost: activity.activityURL.toString()
      }
    ))
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ActivityPage({ params }: any) {

  const activity: any = await activityServices().getActivityByLink(params['aktivnost'])

  if (!activity) {
    // Handle the case where the activity is undefined
    return <NotFoundView />
  }

  return <ActivityView key={Math.floor(Math.random() * 999)} activity={activity} />
}
