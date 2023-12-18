'use client';

import { _brands, _travelPosts, _testimonials } from 'src/_mock';

import { About } from '../about/about';
import { Newsletter } from '../newsletter';
import { AboutOurVision } from '../about/about-our-mission';
import { LandingBlog } from '../blog/blog-list/landing-blog';

// ----------------------------------------------------------------------

export const AboutView = () => {
  return (
    <>
      <About />

      <AboutOurVision />

      <LandingBlog posts={[]} />

      <Newsletter />
    </>
  );
}
