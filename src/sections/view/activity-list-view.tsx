'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _mock, _categories, _travelPosts } from 'src/_mock';

// import { Newsletter } from '../newsletter';
import { ActivitySidebar } from '../activity/common/activities-sidebar';
import { ActivityList } from '../activity/activities-list/activities-list';
import { ActivitySearchMobile } from '../activity/common/activities-search-mobile';
import { FeaturedActivities } from '../activity/activities-list/featured-activities';
import { TrendingTopics } from '../activity/activities-list/trending-topics-activities-list';
import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

type ActivitiesListProps = {
  allActivities: Activity[];
  inProgressActivities?: Activity[];
  completedActivities: Activity[];
  featuredActivities: Activity[];
  trendingActivities: Activity[]
}

export const ActivitiesView = ({ allActivities, inProgressActivities, completedActivities, featuredActivities, trendingActivities }: ActivitiesListProps) => {
  return (
    <>
      <ActivitySearchMobile />

      <FeaturedActivities featuredCompletedActivities={featuredActivities} />

      {/* <TrendingTopics /> */}

      <Container
        sx={{
          mt: { xs: 4, md: 10 },
        }}
      >
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            {/* <Posts posts={_travelPosts} /> */}
          </Grid>

          <Grid xs={12} md={4}>
            {/* <ActivitySidebar
              categories={_categories}
              recentPosts={{ list: _travelPosts.slice(-4) }}
            /> */}
          </Grid>
        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
