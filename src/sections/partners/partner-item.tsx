import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { Partner } from 'src/types/partner';
import { Project } from 'src/types/project';
// import { varHover, varTranHover } from 'src/components/animate';

// ----------------------------------------------------------------------

type PartnerItemProps = {
  partner: Partner
}

export const PartnerItem = ({ partner }: PartnerItemProps) => {

  const theme = useTheme();
  const settings = useSettingsContext()

  return (
    <Box
      sx={{ px: 1.5, cursor: 'pointer' }}
    >
      <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <Image
          alt={partner.name}
          src={partner.src}
        // ratio="4/3"
        // overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black
        //   } 95%)`}
        />
        <Typography variant="h6" sx={{ color: settings.themeMode == 'dark' ? theme.palette.text.primary : theme.palette.primary.main, textAlign: 'center', mt: '10px' }}>{partner.name}</Typography>
      </Box>
    </Box>
  );
}
