import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, ViberShareButton } from 'next-share';
import { FaViber } from 'react-icons/fa';

// ----------------------------------------------------------------------

type ShareProps = {
  shareURL: string;
};

export const SocialShare = ({ shareURL }: ShareProps) => {

  const theme = useTheme()

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
      <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5, color: theme.palette.text.primary }}>
        Share:
      </Typography>

      <Stack direction="row" alignItems="center" flexWrap="wrap">
        <FacebookShareButton
          url={shareURL}
          quote={'LDA Subotica'}
          hashtag={'#ldasubotica'}
        >
          <Button
            key={'fb'}
            size="small"
            variant="outlined"
            startIcon={<Iconify icon={'carbon:logo-facebook'} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.dark, 0.08),
              },
            }}
          >
            Facebook
          </Button>
        </FacebookShareButton>
        <TwitterShareButton
          url={shareURL}
          title={'LDA Subotica'}
        >
          <Button
            key={'fb'}
            size="small"
            variant="outlined"
            startIcon={<Iconify icon={'carbon:logo-twitter'} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.dark, 0.08),
              },
            }}
          >
            Twitter
          </Button>
        </TwitterShareButton>
        <LinkedinShareButton url={shareURL}>
          <Button
            key={'fb'}
            size="small"
            variant="outlined"
            startIcon={<Iconify icon={'carbon:logo-linkedin'} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.dark, 0.08),
              },
            }}
          >
            Linkedin
          </Button>
        </LinkedinShareButton>
        <ViberShareButton
          url={shareURL}
          title={'LDA Subotica'}
        >
          <Button
            key={'fb'}
            size="small"
            variant="outlined"
            startIcon={<FaViber />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.dark, 0.08),
              },
            }}
          >
            Viber
          </Button>
        </ViberShareButton>
        <EmailShareButton
          url={shareURL}
          subject={'LDA Subotica'}
        >
          <Button
            key={'fb'}
            size="small"
            variant="outlined"
            startIcon={<AlternateEmailIcon />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: theme.palette.primary.light,
              borderColor: theme.palette.primary.light,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.dark, 0.08),
              },
            }}
          >
            Email
          </Button>
        </EmailShareButton>
      </Stack>
    </Stack>
  );
}
