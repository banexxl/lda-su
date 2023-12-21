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
        pt: 5,
        pb: 10,
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h2">
        We Work <br />
        Worldwide.
      </Typography>

      <Typography sx={{ color: 'text.secondary', mt: 3 }}>
        {`We'd love to talk about how we can help you.`}
      </Typography>
    </Container>
  );
}
