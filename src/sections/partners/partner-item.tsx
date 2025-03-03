import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { Partner } from 'src/types/partner';

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
      <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', width: 300, height: 200 }}>
        <Image
          alt={partner.name}
          src={partner.src}
          // ratio="4/3"
          // height={200}
          // width={300}
          sx={{
            objectFit: 'cover',
            // width: '100%',
            // height: '100%',
            ml: "15%"
          }}
        // overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black
        //   } 95%)`}
        />
        <Typography variant="h6" sx={{ color: settings.themeMode == 'dark' ? theme.palette.text.primary : theme.palette.primary.main, textAlign: 'center', mt: '10px' }}>{partner.name}</Typography>
      </Box>
    </Box>
  );
}