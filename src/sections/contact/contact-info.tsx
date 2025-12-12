import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { _offices } from 'src/_mock';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const ContactInfo = () => {
  return (
    <Container
      sx={{
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: '20px' }}>
        LDA <br />
        Subotica
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="solar:city-bold-duotone" sx={{ minWidth: 24, color: 'primary.main' }} />
        <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
          24000 Subotica
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="entypo:address" sx={{ minWidth: 24, color: 'primary.main' }} />
        <Typography sx={{ color: 'text.secondary', marginLeft: '10px' }}>
          Trg Cara Jovana Nenada 15, I sprat, kancelarija 214
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="carbon:email" sx={{ minWidth: 24, color: 'primary.main' }} />
        <Link href={`mailto:ldasubotica@aldaintranet.org`}>
          <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
            ldasubotica@aldaintranet.org
          </Typography>
        </Link>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="carbon:phone" sx={{ minWidth: 24, color: 'primary.main' }} />
        <Link href={`tel:+38124554587`}>
          <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
            +38124554587
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}
