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

import { NavSubListProps } from './nav-basic/types';
import { aldaLinks, navConfig, europaLinks, suboticaLinks } from './config-navigation';
import { Box } from '@mui/system';
import Icon from 'src/assets/illustrations/pattern/icon';
import { Grid, Link } from '@mui/material';

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

  const aldaList = aldaLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const isHome = pathname === '/';

  const mainFooter = (
    <Box sx={{
      backgroundImage: `url(${footerImage.src})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      boxShadow: `inset 0px -5px 10px -5px ${theme.palette.secondary}`,
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
        <Box >
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ marginRight: '50px' }}>
              {mdUp ? (
                <Box>
                  {aldaList.map((list: any, index: any) => (
                    <ListDesktop key={index} list={list} />
                  ))}
                </Box>
              ) : (
                <Stack spacing={1.5}>
                  {aldaList.map((list: any, index: any) => (
                    <ListDesktop key={index} list={list} />
                  ))}
                </Stack>
              )}
            </Box>

            <Box sx={{ gap: '30px' }}>
              <Typography sx={{ marginBottom: '20px' }}>Subotica</Typography>
              <Box >
                {suboticaLinks.map((list: any, index: any) => (
                  <ListDesktop key={index} list={list} />
                ))}
              </Box>
              <Typography sx={{ margin: '20px 0px' }}>Europe</Typography>
              <Box sx={{ marginBottom: '30px' }}>
                {europaLinks.map((list: any, index: any) => (
                  <ListDesktop key={index} list={list} />
                ))}
              </Box>

            </Box>
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
          <Stack direction="row" spacing={3} justifyContent="center">
            <Box>
              <Typography variant="h6">Društvene mreže</Typography>

              <Link href='https://www.facebook.com/LocalDemocracyAgencySubotica' target='_blank' >
                <FacebookIcon sx={{ color: 'primary.main' }} />
              </Link>

              <Link href='https://www.linkedin.com/company/ldasubotica/about/' target='_blank'>
                <LinkedInIcon sx={{ color: 'primary.main' }} />
              </Link>
            </Box>

          </Stack>
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            © 2023. All rights reserved, LDA Subotica
          </Typography>
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
          sx={{ color: theme.palette.primary.contrastText, cursor: 'pointer' }}
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
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link: any) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}