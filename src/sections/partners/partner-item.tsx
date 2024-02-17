import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { Partner } from 'src/types/partner';
import { Project } from 'src/types/project';
// import { varHover, varTranHover } from 'src/components/animate';

// ----------------------------------------------------------------------

type PartnerItemProps = {
  partner: Partner
}

export const PartnerItem = ({ partner }: PartnerItemProps) => {

  const theme = useTheme();

  return (
    <Box
      sx={{ px: 1.5, cursor: 'pointer' }}
    >
      <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <Image
          alt={partner.name}
          src={partner.src}
        // ratio="4/3"
        // overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black
        //   } 95%)`}
        />
        <Typography variant="h6" sx={{ color: 'common.white', textAlign: 'center', mt: '10px' }}>{partner.name}</Typography>
      </Box>
    </Box>
  );
}
