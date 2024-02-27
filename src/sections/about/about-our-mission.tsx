import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Image from 'src/components/image';
import { Box, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

const VISIONS_TOP = [
  {
    name: 'Unapređenje',
    description: 'kulture učešća i građanskog dijaloga na lokalnom nivou',
  },
  {
    name: 'Podrška',
    description: 'aktivizmu i volonterizmu mladih',
  },
  { name: 'Jačanje', description: 'kapaciteta necivilnog društva za učešće u procesu pregovora Republike Srbije o pristupanju u članstvo Evropske unije' },
];

const VISIONS_BOT = [
  {
    name: 'Promovisanje',
    description: 'ljudskih i manjinskih prava u lokalnim zajednicama',
  },
  {
    name: 'Izgradnja',
    description: 'međusektorskih partnerstva u kreiranju javnih politika',
  },
  { name: 'Umrežavanje', description: 'i razmena dobre prakse na regionalnom, prekograničnom i evropskom nivou' },
];

// ----------------------------------------------------------------------

export const AboutOurVision = () => {
  const theme = useTheme()
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

      <Box
        sx={{
          spacing: { xs: 8, md: 3 },
          justifyContent: "space-between",
          alignItems: { md: 'center' },

        }}
      >
        <Typography variant="h2">Naši ciljevi</Typography>
        <Grid xs={12} md={6} lg={6}>
          <Stack alignItems={{ md: 'flex-end' }} sx={{ position: 'relative' }}>
            {VISIONS_TOP.map((vision, index) => {
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
                    backgroundColor: theme.palette.primary.dark,
                    width: { md: 'calc(30%)' },
                    ...(firstVision && {
                      top: { md: 0 },
                      left: { md: 0 },
                      bottom: { md: 0 },
                      my: { md: 'auto' },
                      maxHeight: { md: 304 },
                      display: { md: 'flex' },
                      position: { md: 'absolute' },
                      flexDirection: { md: 'column' },
                      justifyContent: { md: 'center' },
                    }),
                  }}
                >
                  <Typography
                    variant="h1"
                    component="h2"
                    sx={{ color: theme.palette.text.primary, opacity: 0.24, mb: 3 }}
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

        <Grid xs={12} md={6} lg={5}>
          <Image alt="vision" src="/assets/illustrations/illustration_vision.svg" />
        </Grid>

        <Grid xs={4} md={6} lg={6}>
          <Stack alignItems={{ md: 'flex-end' }} sx={{ position: 'relative' }}>
            {VISIONS_BOT.map((vision, index) => {
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
                    backgroundColor: theme.palette.primary.dark,
                    width: { md: 'calc(30%)' },
                    ...(firstVision && {
                      top: { md: 0 },
                      left: { md: 0 },
                      bottom: { md: 0 },
                      my: { md: 'auto' },
                      maxHeight: { md: 304 },
                      display: { md: 'flex' },
                      position: { md: 'absolute' },
                      flexDirection: { md: 'column' },
                      justifyContent: { md: 'center' },
                    })
                  }}
                >
                  <Typography
                    variant="h1"
                    component="h2"
                    sx={{ color: theme.palette.text.primary, opacity: 0.24, mb: 3 }}
                  >
                    {`0${index + 4}`}
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
      </Box>
    </Container >
  );
}
