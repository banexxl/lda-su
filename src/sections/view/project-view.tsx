'use client';

import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tours, _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { Newsletter } from '../newsletter';
import { ProjectListSimilar } from '../project-list/project-list-similar';
import { ProjectDetailsHeader } from '../project/project-details-header';
import { ProjectDetailsSummary } from '../project/project-details-summary';
import { ProjectDetailsGallery } from '../project/project-details-gallery';
import { ProjectDetailsReserveForm } from '../project/project-details-reserve-form';

// ----------------------------------------------------------------------

const _mockTour = _tours[0];

export const ProjectView = () => {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Tours', href: paths.travel.tours },
            { name: _mockTour.slug },
          ]}
          sx={{ mt: 3, mb: 5 }}
        />

        <ProjectDetailsGallery images={_mockTour.gallery} />

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            {/* <TourDetailsReserveForm tour={_mockTour} /> */}
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            {/* <TourDetailsHeader tour={_mockTour} /> */}

            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

            {/* <TourDetailsSummary tour={_mockTour} /> */}

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
                Share:
              </Typography>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {_socials.map((social) => (
                  <Button
                    key={social.value}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={social.icon} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: social.color,
                      borderColor: social.color,
                      '&:hover': {
                        borderColor: social.color,
                        bgcolor: alpha(social.color, 0.08),
                      },
                    }}
                  >
                    {social.label}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 10 }} />

      {/* <TourListSimilar tours={_tours.slice(-4)} /> */}

      <Newsletter />
    </>
  );
}
