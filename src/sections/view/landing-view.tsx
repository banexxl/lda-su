'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { _tours, _travelPosts, _testimonials } from 'src/_mock';

import { Newsletter } from '../newsletter';
import { Filters } from '../filters/filters';
import { ProjectLandingHero } from '../landing/landing-hero';
import { Testimonial } from '../testimonial/testimonial';
import { LandingSummary } from '../landing/landing-summary';
import { LandingIntroduce } from '../landing/landing-introduce';
import { LandingProjectsByCity } from '../landing/landing-tours-by-city';
import { LandingTourFeatured } from '../landing/landing-tour-featured';
import { FeaturedNews } from '../news/news-list/featured-news';
import { LandingFavoriteDestinations } from '../landing/landing-favorite-destinations';

// ----------------------------------------------------------------------

export const LandingView = () => {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Container
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
        </Container>
      </Box>

      <LandingIntroduce />

      <LandingSummary />

      <Testimonial testimonials={_testimonials} />

      {/* <LandingProjectsByCity tours={[]} /> */}

      {/* <LandingTourFeatured tours={[]} /> */}

      {/* <FeaturedNews posts={[]} /> */}

      <Newsletter />
    </>
  );
}
