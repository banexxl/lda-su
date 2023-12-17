import { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import bgImage from "public/background-scaled-wpv_1024x.jpg"
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoundingClientRect } from 'src/hooks/use-bounding-client-rect';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: 'Professional Tour Guides',
    description: 'Nunc nonummy metus. Donec elit libero',
    icon: '/assets/icons/ic_popularity.svg',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Nunc nonummy metus. Donec elit libero',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Secure Payment',
    description: 'Nunc nonummy metus. Donec elit libero',
    icon: '/assets/icons/ic_secure_payment.svg',
  },
];

// ----------------------------------------------------------------------

export const LandingIntroduce = () => {
  const mdUp = useResponsive('up', 'md');

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container && container.left + 20;

  const imageURL = "../../../public/logoblue.png"

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
        backgroundImage: `url(${bgImage.src})`,
        width: '100dvw'
      }}
    >
      <Container ref={containerRef}>
        <Stack
          spacing={3}
          sx={{
            width: '100%',
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
            backgroundImage: `url(${imageURL})`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box>

            <Typography variant="h2">ALDA</Typography>

            <Typography sx={{ color: 'text.secondary', textAlign: 'start', width: '70%' }}>
              Agencije lokalne demokratije nastale su kao izraz želje lokalnih i regionalnih vlasti Evrope da pruže podršku i pomoć lokalnim vlastima tokom ratnih sukoba u bivšoj Jugoslaviji. Prva Agencija osnovana je u Subotici, 1993. godine.<br />
              <br />
              U početnoj fazi aktivnosti Agencija bile su usmerene na pružanje humanitarne pomoći a ubrzo potom one bivaju uključene u složeni proces revitalizacije lokalnih zajednica u najširem smislu, obnove poverenja i dijaloga između različitih etničkih grupa i zaštite ljudskih prava.<br />
              <br />
              Agencije lokalne demokratije danas predstavljaju značajne aktere u procesu stabilizacije i dugoročnog jačanja demokratskih institucija u zemljama Jugoistočne Evrope.<br />
            </Typography>
          </Box>
          <Box sx={{ marginTop: '50px' }}>
            <Image
              alt="cover"
              src="/assets/logo_main.jpg"
              sx={{ width: '400px', height: mdUp ? '250px' : '200px' }}
            />
          </Box>
        </Stack>
      </Container>

      <Box
        sx={{
          position: 'relative',
          my: { xs: 8, md: 10 },
          ml: { md: `${offsetLeft}px` },
        }}
      >
        <Card
          sx={{
            p: 5,
            top: 0,
            left: 0,
            zIndex: 9,
            m: { xs: 2, md: 5 },
            position: 'absolute',
            maxWidth: { sm: 360 },
            right: { xs: 0, sm: 'unset' },
            bottom: { xs: 0, sm: 'unset' },
            textAlign: { xs: 'center', sm: 'unset' },
            display: 'flex',
            alignItems: { xs: 'center', sm: 'unset' },
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Device
          </Typography>

          <Typography variant="h4" sx={{ my: 3 }}>
            The More Important the Work
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'unset' }}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              typography: 'subtitle1',
              '&:hover': { opacity: 0.72 },
            }}
          >
            <Iconify icon="carbon:play" width={24} sx={{ mr: 1 }} /> Watch Video
          </Stack>
        </Card>


      </Box>

      <Container sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 8, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {SUMMARY.map((value) => (
            <Stack key={value.title} spacing={2}>
              <SvgColor
                src={value.icon}
                sx={{
                  mb: 3,
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  color: 'primary.main',
                }}
              />

              <Typography variant="h5">{value.title}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {value.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
