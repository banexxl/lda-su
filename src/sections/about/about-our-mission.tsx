import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const VISIONS = [
  {
    name: 'Vestibulum',
    description: 'In dui magna, posuere eget, vestibulum et, tempor auctor, justo.',
  },
  {
    name: 'Fusce',
    description: 'Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.',
  },
  { name: 'Praesent', description: 'Suspendisse feugiat. Quisque id odio.' },
];

// ----------------------------------------------------------------------

export const AboutOurVision = () => {
  return (
    <Container
      sx={{
        overflow: 'hidden',
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 800,
          mb: { xs: 8, md: 5 },
          mx: { xs: 'auto', md: 'unset' },
          textAlign: { xs: 'center', md: 'justify' },
        }}
      >
        <Typography variant="h2">Naša misija</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Centar lokalne demokratije LDA Subotica je osnovan 1993. godine pod pokroviteljstvom Saveta Evrope na osnovu sporazuma sa Gradom Subotica kao lokalna nevladina organizacija čiji je glavni zadatak bio da promoviše lokalnu demokratiju i ljudska prava u multikulturalnim zajednicama u tadašnjoj ratom razorenoj bivšoj Jugoslaviji.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Danas, LDA Subotica je registrovana kao lokalno udruženje, član Evropske asocijacije za lokalnu demokratiju – ALDA, čija je glavna misija unapređenje demokratskog upravljanja na lokalnom nivou, podsticanje aktivne participacije građana i približavanje procesa pridruživanja EU građanima u lokalnim zajednicama u Srbiji i AP Vojvodini.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Naši osnovni programi su fokusirani na izgradnju kapaciteta, podizanje svesti i aktivnosti zagovaranja namenjeni donosiocima odluka na lokalnom nivou, organizacijama civilnog društva i građanima (sa posebnim fokusom na mlade). Edukacije za demokratsko aktivno građanstvo, promovisanje interkulturalnog dijaloga , regionalna saradnja, međusektorska partnerstva za lokalni održivi razvoj su osnovne vrste naših aktivnosti, uključujući i umrežavanja na regionalnom i evropskom nivou.
        </Typography>
      </Stack>

      <Grid
        container
        spacing={{ xs: 8, md: 3 }}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Grid xs={12} md={6} lg={5}>
          <Image alt="vision" src="/assets/illustrations/illustration_vision.svg" />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Stack alignItems={{ md: 'flex-end' }} sx={{ position: 'relative' }}>
            {VISIONS.map((vision, index) => {
              const { name, description } = vision;

              const firstVision = index === 0;

              const secondVision = index === 1;

              const thirdVision = index === 2;

              return (
                <Card
                  key={name}
                  sx={{
                    p: 4,
                    mt: 4,
                    width: { md: 'calc(50% - 16px)' },
                    ...(firstVision && {
                      top: { md: 0 },
                      left: { md: 0 },
                      bottom: { md: 0 },
                      my: { md: 'auto' },
                      boxShadow: { md: 0 },
                      maxHeight: { md: 304 },
                      display: { md: 'flex' },
                      position: { md: 'absolute' },
                      flexDirection: { md: 'column' },
                      justifyContent: { md: 'center' },
                    }),
                    ...(secondVision && {
                      boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
                    }),
                    ...(thirdVision && {
                      boxShadow: { md: 0 },
                    }),
                  }}
                >
                  <Typography
                    variant="h1"
                    component="h2"
                    sx={{ color: 'text.disabled', opacity: 0.24, mb: 3 }}
                  >
                    {`0${index + 1}`}
                  </Typography>

                  <Typography variant="h4" paragraph>
                    {name}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
                </Card>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Container >
  );
}
