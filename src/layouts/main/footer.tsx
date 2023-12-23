import Masonry from '@mui/lab/Masonry';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { buttonClasses } from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _socials } from 'src/_mock';
import footerImage from 'public/eu-lda-h-1000x450.jpg'
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { NavSubListProps } from './nav/types';
import { pageLinks, navConfig, europaLinks, suboticaLinks } from './config-navigation';
import { Box } from '@mui/system';
import Icon from 'src/assets/illustrations/pattern/icon';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

// const StyledAppStoreButton = styled(Button)(({ theme }) => ({
//   flexShrink: 0,
//   padding: '5px 12px',
//   color: theme.palette.common.white,
//   border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
//   background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
//   [`& .${buttonClasses.startIcon}`]: {
//     marginLeft: 0,
//   },
// }));

// ----------------------------------------------------------------------
export const Footer = () => {


  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const pathname = usePathname();

  const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = mdUp ? desktopList : mobileList;

  const isHome = pathname === '/';


  const mainFooter = (
    <Box sx={{
      backgroundImage: `url(${footerImage.src})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      boxShadow: `inset 0px -5px 10px -5px ${theme.palette.secondary}`
    }}>
      <Divider sx={{ boxShadow: '1' }} />
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          justifyContent: 'space-between',
          py: { xs: 8, md: 10 },
          margin: '30px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', gap: '30px' }}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            Aktivnosti LDA Subotica fokusirane su na kreiranje aktivnog građanstva s jedne,
            te transparentnih i odgovornih vlasti s druge strane,
            s krajnjim ciljem uspostavljanja modernog i demokratskog društva.
          </Typography>

          <Typography variant="h6">Let’s stay in touch</Typography>

          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            Subscribe to our newsletter to receive latest articles to your inbox weekly.
          </Typography>

          <TextField
            hiddenLabel
            placeholder="Email address"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" color="inherit" size="large" sx={{ mr: -1.25 }}>
                    Subscribe
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Box>
            <Typography variant="h6">Social</Typography>

            <Link href='https://www.facebook.com/LocalDemocracyAgencySubotica' target='_blank' >
              <FacebookIcon sx={{ color: 'primary.main' }} />
            </Link>

            <Link href='https://www.facebook.com/LocalDemocracyAgencySubotica' target='_blank'>
              <LinkedInIcon sx={{ color: 'primary.main' }} />
            </Link>
          </Box>

        </Box>

        <Box>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>ALDA mreža</Typography>
          {mdUp ? (
            <Box >
              {renderLists.map((list: any) => (
                <ListDesktop key={list.subheader} list={list} />
              ))}
            </Box>
          ) : (
            <Box >
              {renderLists.map((list: any) => (
                <ListDesktop key={list.subheader} list={list} />
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ gap: '30px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>Subotica</Typography>
          <Box >
            {suboticaLinks.map((list: any) => (
              <ListDesktop key={list.subheader} list={list} />
            ))}
          </Box>
          <Typography variant="h5" sx={{ margin: '20px 0px' }}>Europe</Typography>
          <Box >
            {europaLinks.map((list: any) => (
              <ListDesktop key={list.subheader} list={list} />
            ))}
          </Box>
        </Box>
      </Box >

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            © 2023. All rights reserved, LDA Subotica
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            {/* <Link variant="caption" sx={{ color: 'text.primary' }}>
              Help Center
            </Link>

            <Link variant="caption" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link> */}
          </Stack>
        </Stack>

      </Container>
    </Box >
  );

  return mainFooter
}

// ----------------------------------------------------------------------

function ListDesktop({ list }: any) {
  const pathname = usePathname();
  const theme = useTheme();
  return (
    <Stack spacing={1} alignItems="flex-start" >

      {list.items?.map((link: any) => (
        <Link
          key={link.title}
          href={link.path}
          sx={{ color: theme.palette.primary.contrastText }}
          target="_blank"
        >
          {link.title}
        </Link>
      ))}
    </Stack>
  );
}

function ListMobile({ list }: any) {
  const pathname = usePathname();
  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          icon={
            listExpand.value
              ? 'carbon:chevron-down'
              : 'carbon:chevron-right'
          }
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link: any) => (
            <Typography key={link.title}>
              <Link
                href={link.path}
              >
                {link.title}
              </Link>
            </Typography>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}