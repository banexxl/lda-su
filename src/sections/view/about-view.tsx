'use client';

import { _brands, _members, _travelPosts, _testimonials } from 'src/_mock';

import { Team } from '../team/team';
import { About } from '../about/about';
import { Newsletter } from '../newsletter';
import { OurClients } from '../our-clients';
import { Testimonial } from '../testimonial/testimonial';
import { AboutOurVision } from '../about/about-our-mission';
import { LandingNews } from '../news/news-list/landing-news';

// ----------------------------------------------------------------------

export const AboutView = () => {
  return (
    <>
      <About />

      <AboutOurVision />

      <Team />

      <Testimonial testimonials={_testimonials} />

      <OurClients brands={_brands} />

      <LandingNews posts={[]} />

      <Newsletter />
    </>
  );
}
