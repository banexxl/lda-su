import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import { PartnerItem } from './partner-item';
import Link from 'next/link';

export const PartnerCarousel = () => {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box sx={{
      // backgroundImage: `url(${bgImage.src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      mb: '40px'
    }}>

      <Typography variant="h3" sx={{ textAlign: 'center', my: '20px' }}>Naši partneri</Typography>

      <CarouselArrows sx={{ ml: '50%', transform: 'translateX(-50%)', mt: '20px' }} onNext={carousel.onNext} onPrev={carousel.onPrev} spacing={2} />

      {/* {!mdUp && (
        <CarouselArrows
          spacing={2}
          justifyContent="center"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          sx={{ mt: 8, width: 1 }}
        />
      )} */}

    </Box>
  );
}
