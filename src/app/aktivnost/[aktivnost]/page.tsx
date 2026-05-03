import { NotFoundView } from 'src/sections/error/not-found-view';
import { ActivityView } from 'src/sections/view/activity-view';
import { generateSeoMetadata } from 'src/lib/seo';
import activityServices from 'src/services/activities-services';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

type ActivityPageProps = {
  params: Promise<{
    aktivnost: string;
  }>;
}

export async function generateMetadata({ params }: ActivityPageProps) {
  const { aktivnost } = await params;
  const activity = await activityServices().getActivityByLink(aktivnost);

  if (!activity) {
    return generateSeoMetadata({
      title: 'Aktivnost',
      description: 'Detalji aktivnosti LDA Subotica.',
      path: `/aktivnost/${aktivnost}`,
      robots: { index: false, follow: false },
    });
  }

  return generateSeoMetadata({
    title: activity.title,
    description: activity.descriptions,
    path: `/aktivnost/${aktivnost}`,
    keywords: [activity.category, activity.author].filter(Boolean),
    openGraph: {
      images: activity.coverURL
        ? [{ url: activity.coverURL, alt: activity.title }]
        : undefined,
    },
    twitter: {
      images: activity.coverURL ? [activity.coverURL] : undefined,
    },
  });
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

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { aktivnost } = await params;

  const activity: any = await activityServices().getActivityByLink(aktivnost);

  if (!activity) {
    // Handle the case where the activity is undefined
    return <NotFoundView />
  }

  return <ActivityView key={Math.floor(Math.random() * 999)} activity={activity} />
}
