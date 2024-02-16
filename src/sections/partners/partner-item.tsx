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
        <Stack
          spacing={1}
          sx={{
            py: 3,
            width: 1,
            zIndex: 9,
            bottom: 0,
            textAlign: 'center',
            // position: 'absolute',
            color: 'common.white',
          }}
        >
          <Typography variant="h6" >{partner.name}</Typography>

          {/* <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {topic.totalPost} posts
          </Typography> */}
        </Stack>

        <Image
          alt={partner.name}
          src={partner.src}
        // ratio="4/3"
        // overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black
        //   } 95%)`}
        />
      </Box>
    </Box>
  );
}
