import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import { Activity } from 'src/types/activity';

import { LandingActivityItem } from './landing-activity-item';
import { LandingActivityItemCarousel } from './landing-activities-item-carousel';

// ----------------------------------------------------------------------

type Props = {
  activities: Activity[];
};

export const LandingActivity = ({ activities }: Props) => {
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      width: 1,
      bottom: 80,
      position: 'absolute',
    }),
  });

  return (
    <Box sx={{ bgcolor: 'grey.900' }}>
      {!mdUp && (
        <Typography variant="h2" sx={{ pt: 10, pb: 8, color: 'common.white', textAlign: 'center' }}>
          Latest Posts
        </Typography>
      )}

      <Box
        gap={{ xs: 8, md: 0 }}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{ sx: { color: 'common.white' } }}
            rightButtonProps={{ sx: { color: 'common.white' } }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {activities.map((activity) => (
                <LandingActivityItemCarousel key={Math.floor(Math.random() * 999)} activity={activity} />
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>

        <Box
          sx={{
            px: { xs: 2.5, sm: 5, md: 8, lg: 15 },
          }}
        >
          {mdUp && (
            <Typography variant="h2" sx={{ color: 'common.white', py: 10 }}>
              Latest Posts
            </Typography>
          )}

          <Stack spacing={3}>
            {activities.slice(0, 3).map((activity) => (
              <LandingActivityItem key={Math.floor(Math.random() * 999)} activity={activity} />
            ))}
          </Stack>

          <Box
            sx={{
              mt: { xs: 8, md: 5 },
              mb: 10,
              textAlign: { xs: 'center', md: 'right' },
            }}
          >
            <Button
              color="primary"
              component={RouterLink}
              href={paths.alda.alda}
              endIcon={<Iconify icon="carbon:chevron-right" />}
            >
              View All
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
