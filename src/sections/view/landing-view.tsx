'use client';

import Box from '@mui/material/Box';
import { ProjectLandingHero } from '../landing/landing-hero';
import { LandingSummary } from '../landing/landing-summary';
import { LandingIntroduce } from '../landing/landing-introduce';
// import { LandingFavoriteDestinations } from '../landing/landing-favorite-destinations';
import { Activity } from 'src/types/activity';
import { LandingProjectSummariesFeatured } from '../landing/landing-project-featured';
// import { LandingProjectsByCity } from '../landing/landing-project-by-city';
import { ProjectSummary } from 'src/types/projectSummary';
import { Activities } from '../activity/activities-list/featured-activities';
import { PartnerCarousel } from '../partners/partners-list';


// ----------------------------------------------------------------------

type LandingViewProps = {
  activeProjectSummaries: ProjectSummary[],
  featuredProjectSummaries: ProjectSummary[],
  allActivities: Activity[],
  inProgressActivities: Activity[],
  completedActivities: Activity[],
  featuredActivities: Activity[],
  featuredCompletedActivities: Activity[],
  trendingActivities: Activity[],
}



export const LandingView = ({
  activeProjectSummaries,
  featuredProjectSummaries,
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

        <ProjectLandingHero projectSummaries={featuredProjectSummaries} />

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

      <LandingIntroduce />

      <PartnerCarousel />

      <LandingSummary />

      {/* LDA Subotica<LandingProjectsByCity projects={[]} /> */}

      <LandingProjectSummariesFeatured projectSummaries={featuredProjectSummaries} />

      <Activities activites={featuredActivities} loading={false} />

      {/* <Newsletter /> */}
    </Box>
  );
}
