import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { Backdrop, Modal } from '@mui/material';
import { ProjectSummary } from 'src/types/projectSummary';
import { fDate } from 'src/utils/format-time';
;

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

export const ProjectSummaryItem = ({ projectSummary }: Props) => {

  const [open, setOpen] = useState(false);
  // const [favorite, setFavorite] = useState(favorited);

  // const handleChangeFavorite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFavorite(event.target.checked);
  // }, []);

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 1.5,
          pl: 2,
          pr: 1.5,
          top: 0,
          width: 1,
          zIndex: 9,
          position: 'absolute',
        }}
      >
        <Stack
          spacing={0.5}
          direction="row"
          sx={{
            px: 1,
            borderRadius: 0.75,
            typography: 'subtitle2',
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          }}
        >

        </Stack>

        {/* <Checkbox
          color="error"
          checked={favorite}
          onChange={handleChangeFavorite}
          icon={<Iconify icon="carbon:favorite" />}
          checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          sx={{ color: 'common.white' }}
        /> */}
      </Stack>

      <Image alt={'cover image'} src={projectSummary.projectSummaryCoverURL} ratio="1/1" onClick={() => setOpen(true)} />

      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Link
            href={`/projekat/${projectSummary.projectSummaryURL}`}
            sx={{
              cursor: 'pointer'
            }}>
            {projectSummary.projectSummaryTitle}
          </Link>
        </Typography>

        {/* <Link component={RouterLink} href={paths.alda.alda} >
          <TextMaxLine variant="h6" persistent>
            {slug}
          </TextMaxLine>
        </Link> */}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} /> Completed: {fDate(projectSummary.projectEndDateTime.toString())}
        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          <Box sx={{ typography: 'h6' }}>
            {/* {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber} */}
          </Box>
        </Stack>
      </Stack>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 700,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Image alt={'cover image'} src={projectSummary.projectSummaryCoverURL} ratio="1/1" onClick={() => setOpen(false)} height={650} />
          </Box>
        </Modal>
      </Backdrop>

    </Card >
  );
}
