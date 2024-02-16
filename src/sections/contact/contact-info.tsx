import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _offices } from 'src/_mock';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MapOfficeProps } from 'src/components/map';
import { varHover, varTranHover } from 'src/components/animate';

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
        <Iconify icon="solar:city-bold-duotone" minWidth={24} sx={{ color: 'primary.main' }} />
        <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
          24000 Subotica
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="entypo:address" minWidth={24} sx={{ color: 'primary.main' }} />
        <Typography sx={{ color: 'text.secondary', marginLeft: '10px' }}>
          Trg Cara Jovana Nenada 15, I sprat, kancelarija 214
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="carbon:email" minWidth={24} sx={{ color: 'primary.main' }} />
        <Link href={`mailto:ldasubotica@aldaintranet.org`}>
          <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
            ldasubotica@aldaintranet.org
          </Typography>
        </Link>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Iconify icon="carbon:phone" minWidth={24} sx={{ color: 'primary.main' }} />
        <Link href={`tel:+38124554587`}>
          <Typography sx={{ color: 'text.secondary', ml: '10px' }}>
            +38124554587
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}
