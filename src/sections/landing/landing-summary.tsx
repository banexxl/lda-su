import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import { CountUp } from 'src/components/count-up';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    total: 22,
    description: 'Realizovanih projekata',
    icon: '/assets/icons/travel/project.svg',
  },
  {
    total: 196,
    description: 'Aktivnosti realizovano',
    icon: '/assets/icons/travel/activity.svg',
  },
  {
    total: 28,
    description: 'Posećenih gradova',
    icon: '/assets/icons/travel/buildings.svg',
  },
  {
    total: 33,
    description: 'Izdatih publikacija',
    icon: '/assets/icons/travel/document.svg',
  },
];

// ----------------------------------------------------------------------

export const LandingSummary = () => {
  return (
    <Container
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 480,
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h2">Projekte aktivnosti LDA Subotica su započete sad već davne 2002. godine</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Za ovaj period smo uspešno realizovali na desetine projekata, u više gradova širom Srbije
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 8, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.description} spacing={1}>
            <Image
              alt={value.icon}
              src={value.icon}
              sx={{ mb: 3, width: 80, height: 80, mx: 'auto' }}
            />

            <Typography variant="h3">
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue: number) => fShortenNumber(newValue)}
              />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
