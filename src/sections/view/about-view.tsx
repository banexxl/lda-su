'use client';

import { _brands, _travelPosts, _testimonials } from 'src/_mock';

import { About } from '../about/about';
// import { Newsletter } from '../newsletter';
import { AboutOurVision } from '../about/about-our-mission';
import { LandingActivity } from '../activity/activities-list/landing-activities';
import { Box } from '@mui/system';
import bgImage2 from "public/background-scaled-wpv_1024x.jpg"
// ----------------------------------------------------------------------

export const AboutView = () => {
  return (
    <Box sx={{
      backgroundImage: `url(${bgImage2.src})`,
      backgroundRepeat: 'repeat',
      // backgroundSize: 'cover',
    }}>
      <About />

      <AboutOurVision />

      {/* <LandingActivity posts={[]} /> */}

      {/* <Newsletter /> */}
    </Box>
  );
}
