'use client';

import Box from '@mui/material/Box';
import { ProjectLandingHero } from '../landing/landing-hero';
import { LandingSummary } from '../landing/landing-summary';
import { LandingIntroduce } from '../landing/landing-introduce';
import { FeaturedActivities } from '../activity/activities-list/featured-activities';
// import { LandingFavoriteDestinations } from '../landing/landing-favorite-destinations';
import { Activity } from 'src/types/activity';
import { LandingProjectSummariesFeatured } from '../landing/landing-project-featured';
import { LandingProjectsByCity } from '../landing/landing-project-by-city';
import { ProjectSummary } from 'src/types/projectSummary';


// ----------------------------------------------------------------------

type LandingViewProps = {
  activeProjectSummaries: ProjectSummary[],
  allProjectSummaries: ProjectSummary[],
  allActivities: Activity[],
  inProgressActivities: Activity[],
  completedActivities: Activity[],
  featuredActivities: Activity[],
  featuredCompletedActivities: Activity[],
  trendingActivities: Activity[],
}



export const LandingView = ({
  activeProjectSummaries,
  allProjectSummaries,
  allActivities,
  completedActivities,
  featuredActivities,
  featuredCompletedActivities,
  inProgressActivities,
  trendingActivities }:
  LandingViewProps) => {

  return (
    <Box>

      <Box sx={{ position: 'relative' }}>

        <ProjectLandingHero projectSummaries={allProjectSummaries} />

        {/* <Container
          sx={{
            mb: { md: 10 },
            left: { md: 0 },
            right: { md: 0 },
            bottom: { md: 0 },
            mx: { md: 'auto' },
            pt: { xs: 3, md: 0 },
            position: { md: 'absolute' },
          }}
        >
          <Filters
            sx={{
              color: { md: 'common.white' },
              bgcolor: (theme) => ({
                xs: 'background.neutral',
                md: alpha(theme.palette.common.white, 0.08),
              }),
            }}
          />
        </Container> */}
      </Box>

      <LandingIntroduce activeProjectSummaries={activeProjectSummaries} allActivities={allActivities} completedActivities={completedActivities} featuredActivities={featuredActivities} featuredCompletedActivities={featuredCompletedActivities} inProgressActivities={inProgressActivities} trendingActivities={trendingActivities} />

      <LandingSummary />

      <LandingProjectsByCity projects={[]} />

      <LandingProjectSummariesFeatured projectSummaries={allProjectSummaries} />

      <FeaturedActivities featuredCompletedActivities={featuredCompletedActivities} />

      {/* <Newsletter /> */}
    </Box>
  );
}
