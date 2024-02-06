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
    activityURL: string
  }
}

const getActivity = async (link: string) => {
  const activity = await activityServices().getActivityByLink(link)
  return activity
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
  console.log('sa stranice params', Object.keys(params)[0]);
  console.log('sa stranice params', params['aktivnost']);
  const activity: any = await getActivity(params['aktivnost'])

  if (!activity) {
    // Handle the case where the activity is undefined
    return <NotFoundView />
  }

  return <ActivityView key={activity._id} activity={activity} />
}
