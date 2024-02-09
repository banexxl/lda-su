'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _mock, _categories, _travelPosts } from 'src/_mock';

// import { Newsletter } from '../newsletter';
import { ActivitySidebar } from '../activity/common/activities-sidebar';
import { ActivityList } from '../activity/activities-list/activities-list';
import { ActivitySearchMobile } from '../activity/common/activities-search-mobile';
import { TrendingTopics } from '../activity/activities-list/trending-activities-list';
import { Activity } from 'src/types/activity';
import { Activities } from '../activity/activities-list/featured-activities';
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoolean } from 'src/hooks/use-boolean';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type ActivitiesListProps = {
  inProgressActivities?: Activity[];
  completedActivities?: Activity[];
  featuredActivities?: Activity[];
}

export const ActivitiesView = ({ completedActivities, inProgressActivities, featuredActivities }: ActivitiesListProps) => {

  const selectedActivites = completedActivities?.length! > 0 ? completedActivities
    : inProgressActivities?.length! > 0 ? inProgressActivities
      : featuredActivities?.length! > 0 ? featuredActivities : null

  const mdUp = useResponsive('up', 'md');
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1.7fr 0.8fr', gridTemplateRows: '1fr' }}>

      <Activities activites={selectedActivites!} loading={loading.value} />

      <Container
        sx={{
          mt: { xs: 4, md: 10 },
          ml: { xs: 4, md: 10 },
        }}
      >
        <Grid container spacing={{ md: 8 }}>
          {/* <Grid xs={12} md={8}>
            <Posts posts={_travelPosts} />
          </Grid> */}

          <Grid xs={12} md={4}>
            <ActivitySidebar
              categories={_categories}
              recentActivities={{ list: selectedActivites!.slice(-4) }}
            />
          </Grid>
        </Grid>
      </Container>


    </Box>
  );
}
