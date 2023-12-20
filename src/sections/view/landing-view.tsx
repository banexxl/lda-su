'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { _tours, _travelPosts, _testimonials } from 'src/_mock';

import { Newsletter } from '../newsletter';
import { Filters } from '../filters/filters';
import { ProjectLandingHero } from '../landing/landing-hero';
import { LandingSummary } from '../landing/landing-summary';
import { LandingIntroduce } from '../landing/landing-introduce';
import { FeaturedBlog } from '../blog/blog-list/featured-blog';
import { LandingFavoriteDestinations } from '../landing/landing-favorite-destinations';


// ----------------------------------------------------------------------

export const LandingView = () => {
  return (
    <Box>

      <LandingIntroduce />

      <LandingSummary />

      {/* <LandingProjectsByCity projects={[]} /> */}

      {/* <LandingTourFeatured projects={[]} /> */}

      {/* <FeaturedBlog posts={[]} /> */}

      <Newsletter />
    </Box>
  );
}
