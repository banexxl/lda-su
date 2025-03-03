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
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', }}
    >
      <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', width: 300 }}>
        <Image
          alt={partner.name}
          src={partner.src}
        />
      </Box>
      <Typography variant="h6" sx={{ color: settings.themeMode == 'dark' ? theme.palette.text.primary : theme.palette.primary.main, textAlign: 'center', mt: '10px' }}>{partner.name}</Typography>
    </Box>
  );
}