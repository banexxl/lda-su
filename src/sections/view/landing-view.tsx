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
import { AboutOurVision } from '../about/about-our-mission';
import { TranslationValues } from 'next-intl';


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
  buttonHero: string,
  ourMission: string,
  ourMission1: string,
  ourMission2: string,
  ourMission3: string,
}



export const LandingView = ({
  buttonHero,
  ourMission,
  ourMission1,
  ourMission2,
  ourMission3,
  activeProjectSummaries,
  featuredProjectSummaries,
  allActivities,
  completedActivities,
  featuredActivities,
  featuredCompletedActivities,
  inProgressActivities,
  trendingActivities }:
  LandingViewProps) => {

  const projectSummariesForLandingHero = activeProjectSummaries.concat(featuredProjectSummaries)

  return (
    <Box>

      <Box sx={{ position: 'relative' }}>

        <ProjectLandingHero projectSummaries={projectSummariesForLandingHero} buttonHero={buttonHero} />

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

      <AboutOurVision ourMission={ourMission} ourMission1={ourMission1} ourMission2={ourMission2} ourMission3={ourMission3} />
      {/* <LandingIntroduce /> */}

      <LandingSummary />


      {/* LDA Subotica<LandingProjectsByCity projects={[]} /> */}

      <LandingProjectSummariesFeatured projectSummaries={featuredProjectSummaries} />

      <Activities activites={featuredActivities} loading={false} />

      <PartnerCarousel />

      {/* <Newsletter /> */}
    </Box>
  );
}
