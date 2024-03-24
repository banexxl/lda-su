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
    aktivnost: string,
    locale: string
  }
}

export async function generateStaticParams() {
  try {
    const allActivities_en = await activityServices().getAllActivities();
    const allActivities_sr = await activityServices().getAllActivities();

    const allActivities = allActivities_en.concat(allActivities_sr);

    const paths = locales.flatMap(locale =>
      allActivities!.map((activity: Activity) => ({
        params: {
          locale,
          aktivnost: activity.activityURL.toString(),
        },
      }))
    );

    return paths;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ActivityPage({ params }: any) {

  const activity_en: any = await activityServices().getActivityByLink(params['aktivnost'])
  const activity_sr: any = await activityServices().getActivityByLink(params['aktivnost'])

  if (!activity_en || !activity_sr) {
    // Handle the case where the activity is undefined
    return <NotFoundView />
  }

  {
    return params.locale === 'en' ?
      <ActivityView key={Math.floor(Math.random() * 999)} activity={activity_en} />
      :
      <ActivityView key={Math.floor(Math.random() * 999)} activity={activity_sr} />
  }
}
