'use client';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { _mock, _categories, _travelPosts } from 'src/_mock';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ActivityTags } from '../activity/common/activities-tags';
// import { Newsletter } from '../newsletter';
import { ActivityAuthor } from '../activity/common/activities-author';
import { ActivitySidebar } from '../activity/common/activities-sidebar';
import { ActivityHero } from '../activity/activities-list/activities-hero';
import { ActivitySocialsShare } from '../activity/common/activities-socials-share';
import { LatestActivities } from '../activity/activities-list/latest-activities';

// ----------------------------------------------------------------------

export const ActivityView = () => {

  const { author, content } = _travelPosts[0];

  return (
    <>
      {/* <ActivityHero activity={_travelPosts[0]} /> */}

      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Activity', href: paths.alda.alda },
            { name: "title" },
          ]}
        />
      </Container>

      <Divider sx={{ mb: { xs: 6, md: 10 } }} />

      <Container>
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              {`asasasaas`}
            </Typography>

            <Markdown content={content} firstLetter />

            <ActivitySocialsShare />

            <Divider sx={{ mt: 8 }} />

            {/* <ActivityAuthor author={author} /> */}
          </Grid>

        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
