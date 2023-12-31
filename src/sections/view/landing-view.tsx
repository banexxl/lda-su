'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { _tours, _travelPosts, _testimonials } from 'src/_mock';

// import { Newsletter } from '../newsletter';
import { Filters } from '../filters/filters';
import { ProjectLandingHero } from '../landing/landing-hero';
import { LandingSummary } from '../landing/landing-summary';
import { LandingIntroduce } from '../landing/landing-introduce';
import { FeaturedActivities } from '../activity/activities-list/featured-activities';
import { LandingFavoriteDestinations } from '../landing/landing-favorite-destinations';
import { Project } from 'src/types/project';
import { Activity } from 'src/types/activity';


// ----------------------------------------------------------------------

type LandingViewProps = {
  activeProjects: Project[],
  allActivities: Activity[],
  inProgressActivities: Activity[],
  completedActivities: Activity[], featuredActivities: Activity[],
  featuredCompletedActivities: Activity[],
  trendingActivities: Activity[],
}



export const LandingView = ({
  activeProjects,
  allActivities,
  completedActivities,
  featuredActivities,
  featuredCompletedActivities,
  inProgressActivities,
  trendingActivities }:
  LandingViewProps) => {

  return (
    <Box>

      <LandingIntroduce activeProjects={activeProjects} />

      {/* <LandingSummary /> */}

      {/* <LandingProjectsByCity projects={[]} /> */}

      {/* <LandingProjectFeatured projects={[]} /> */}

      <FeaturedActivities featuredCompletedActivities={featuredCompletedActivities} />

      {/* <Newsletter /> */}
    </Box>
  );
}
