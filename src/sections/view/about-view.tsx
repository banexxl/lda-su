'use client';

import { About } from '../about/about';
// import { Newsletter } from '../newsletter';
import { AboutOurVision } from '../about/about-our-mission';
import { Box } from '@mui/system';
// ----------------------------------------------------------------------

export const AboutView = () => {
  return (
    <Box sx={{
      // backgroundImage: `url(${bgImage2.src})`,
      // backgroundRepeat: 'repeat',
      // backgroundSize: 'cover',
    }}>
      <About />

      <AboutOurVision />

      {/* <LandingActivity posts={[]} /> */}

      {/* <Newsletter /> */}

    </Box>
  );
}
