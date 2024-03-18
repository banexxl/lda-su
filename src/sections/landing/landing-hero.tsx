'use client'

import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur, bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';
import { ProjectSummary } from 'src/types/projectSummary';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';


// ----------------------------------------------------------------------

type Props = {
  projectSummaries: ProjectSummary[];
};

export const ProjectLandingHero = async ({ projectSummaries }: Props) => {

  const mdUp = useResponsive('up', 'md');

  const carouselLarge = useCarousel({
    speed: 600,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 64,
        position: 'absolute',
        display: { md: 'none' },
      },
    }),
  });

  const carouselThumb = useCarousel({
    vertical: true,
    slidesToShow: 3,
    centerMode: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    verticalSwiping: true,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  return (
    <Box sx={{ minHeight: { md: '100vh' }, position: 'relative' }}>
      {!!projectSummaries.length && (
        <Carousel
          {...carouselLarge.carouselSettings}
          asNavFor={carouselThumb.nav}
          ref={carouselLarge.carouselRef}
        >
          {projectSummaries.map((projectSummary) => (
            <CarouselItem key={Math.floor(Math.random() * 999)} projectSummary={projectSummary} />
          ))}
        </Carousel>
      )}

      {mdUp && (
        <Stack
          spacing={2}
          justifyContent="center"
          sx={{
            top: 0,
            height: 1,
            maxWidth: 220,
            position: 'absolute',
            right: { xs: 20, lg: '6%', xl: '10%' },
          }}
        >
          {!!projectSummaries.length && (
            <Carousel
              {...carouselThumb.carouselSettings}
              asNavFor={carouselLarge.nav}
              ref={carouselThumb.carouselRef}
            >
              {projectSummaries.map((projectSummary, index) => (
                <ThumbnailItem
                  key={Math.floor(Math.random() * 999)}
                  projectSummary={projectSummary}
                  selected={carouselLarge.currentIndex === index}
                />
              ))}
            </Carousel>
          )}
        </Stack>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  projectSummary: ProjectSummary;
};

const CarouselItem = ({ projectSummary }: CarouselItemProps) => {

  const url = usePathname()
  const urlSplitArray = url.split('/')
  const locale = urlSplitArray[1]
  const t = useTranslations('home')
  const theme = useTheme();

  const renderOverlay = (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.primary.main, 0)} 70%`,
          endColor: `${theme.palette.primary.main} 99%`,
        }),
        backgroundColor: alpha(theme.palette.common.black, 0.24),
        top: 0,
        left: 0,
        zIndex: 8,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  return (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',
        color: 'common.white',
        justifyContent: 'center',
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          zIndex: 9,
          py: { xs: 20, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Typography variant="overline" sx={{ color: 'info.main', mb: 5 }}>
          {projectSummary.locations.join(', ')}
        </Typography>

        <Typography variant="h1" sx={{ maxWidth: 480 }}>
          {projectSummary.title}
        </Typography>

        <Stack
          alignItems="center"
          spacing={{ xs: 2.5, md: 5 }}
          direction={{ xs: 'column', md: 'row' }}
          sx={{ my: 5 }}
        >
          <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="carbon:time" width={24} sx={{ mr: 1, color: 'primary.main' }} />
            {fDate(projectSummary.projectStartDateTime, 'dd/MM/yyyy')}
          </Stack>

          {/* <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="carbon:star" width={24} sx={{ mr: 1, color: 'primary.main' }} />
            {`${projectSummary.} reviews`}
          </Stack> */}

        </Stack>

        <Button variant="contained" size="large" color="primary" href={projectSummary.locale + '/pregled-projekta/' + projectSummary.projectSummaryURL}>
          {t('buttonHero')}
        </Button>
      </Stack>

      <Box
        sx={{
          width: 1,
          height: 1,
          position: {
            xs: 'absolute',
            md: 'relative',
          },
        }}
      >
        {renderOverlay}

        <Image
          alt="hero"
          src={projectSummary.projectSummaryCoverURL}
          sx={{
            width: 1,
            height: { xs: 1, md: '100vh' },
          }}
        />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ThumbnailItemProps = {
  projectSummary: ProjectSummary;
  selected?: boolean;
};

const ThumbnailItem = ({ projectSummary, selected }: ThumbnailItemProps) => {

  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2.5}
      sx={{
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        color: 'common.white',
        ...(selected && {
          borderRadius: 2,
          ...bgBlur({
            opacity: 0.08,
            color: theme.palette.common.white,
          }),
        }),
      }}
    >
      <Avatar src={projectSummary.projectSummaryCoverURL} sx={{ width: 48, height: 48 }} />

      <Stack spacing={0.5}>
        <TextMaxLine variant="h6" line={1}>
          {projectSummary.title}
        </TextMaxLine>
      </Stack>
    </Stack>
  );
}
