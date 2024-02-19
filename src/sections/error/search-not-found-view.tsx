'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { CompactLayout } from 'src/layouts/compact';

import Image from 'src/components/image';
import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SearchNotFoundView = () => {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Ništa nismo pronašli 😥
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Nažalost, nismo pronašli nijedan predmet koji odgovara vašoj pretrazi. Molimo pokušajte ponovo!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            alt="404"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              maxWidth: 320,
              my: { xs: 5, sm: 8 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained" sx={{ color: 'primary.main' }}>
          Nazad na početnu...
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
