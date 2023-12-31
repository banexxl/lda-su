'use client';

import { _brands, _travelPosts, _testimonials } from 'src/_mock';

import { About } from '../about/about';
// import { Newsletter } from '../newsletter';
import { AboutOurVision } from '../about/about-our-mission';
import { LandingActivity } from '../activity/activities-list/landing-activities';

// ----------------------------------------------------------------------

export const AboutView = () => {
  return (
    <>
      <About />

      <AboutOurVision />

      {/* <LandingActivity posts={[]} /> */}

      {/* <Newsletter /> */}
    </>
  );
}
