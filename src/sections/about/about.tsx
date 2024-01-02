import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';
import { fShortenNumber } from 'src/utils/format-number';
import Image from 'src/components/image';
import { CountUp } from 'src/components/count-up';

// ----------------------------------------------------------------------
const imageURLs = [
  'https://lda-su.s3.eu-central-1.amazonaws.com/AboutUsImages/pexels-photo-3184639.jpeg',
  'https://lda-su.s3.eu-central-1.amazonaws.com/AboutUsImages/pexels-photo-3277808.jpeg',
  'https://lda-su.s3.eu-central-1.amazonaws.com/AboutUsImages/pexels-thirdman-5256816.jpg',
  'https://lda-su.s3.eu-central-1.amazonaws.com/AboutUsImages/dylan-gillis-KdeqA3aTnBY-unsplash.jpg'
]

const SUMMARY = [
  { name: 'Realizovanih projekata', number: 130 },
  { name: 'Projektnih aktivnosti', number: 196 },
  { name: 'Posećenih gradova', number: 10679 },
  { name: 'Izdatih publikacija', number: 877 },
];

// ----------------------------------------------------------------------

export const About = () => {
  const smUp = useResponsive('up', 'sm');

  return (
    <Container
      sx={{
        overflow: 'hidden',
        py: 5,

      }}
    >
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 560,
          textAlign: 'center',
          pb: { xs: 5, md: 10 },

        }}
      >
        <Typography variant="h1">O nama</Typography>


        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            ALDA – Evropska asocijacija za lokalnu demokratiju
            <Typography sx={{ color: 'text.primary', textAlign: { xs: 'center', md: 'justify' }, }}>
              Danas, 14 aktivnih Agencija za lokalnu demokratiju sa sedištem u zemljama Zapadnog Balkana i Južnog Kavkaza, deluju kao statutarni članovi ALDA – Evropske asocijacije za lokalnu demokratiju.
              ALDA je osnovana 1999. godine na inicijativu Kongresa lokalnih i regionalnih vlasti Saveta Evrope, sa ciljem da koordiniše i podržava mrežu Agencija lokalne demokratije koja su osnovane u ranim 1990-tim godinama. Ona je krovna organizacija Agencija koje su lokalno registrovana udruženja koja deluju sa glavnom misijom unapređenja lokalne uprave i aktivne participacije građana u lokanim zajednicama.
              ALDA je organizacija zasnovana na članstvu koja okuplja više od 180 članova (uključujući lokalne vlasti, asocijacije lokalnih vlasti i nevladine organizacije) iz više od 35 zemalja Evrope. ALDA finansira svoje programe od članarina i projekata podržanih od strane Evropske komisije, Saveta Evrope i drugih javnih i privatnih donatora.
            </Typography>
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {(smUp ? imageURLs : imageURLs.slice(0, 1)).map((img, index) => (
          <Grid key={img} xs={12} sm={6} md={index === 0 ? 6 : 2}>
            <Image alt={img} src={img} sx={{ height: 350, borderRadius: 2, width: 1 }} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          textAlign: 'center',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          pt: { xs: 5, md: 10 },
          pb: 10,
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.name} spacing={1}>
            <Typography variant="h2">
              <CountUp
                start={value.number / 5}
                end={value.number}
                formattingFn={(newValue: number) => fShortenNumber(newValue)}
              />

              <Typography
                variant="h4"
                component="span"
                sx={{ verticalAlign: 'top', ml: 0.5, color: 'primary.main' }}
              >
                +
              </Typography>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {value.name}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Container >
  );
}
