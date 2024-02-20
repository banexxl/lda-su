import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Theme, alpha, styled, SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { HEADER } from '../config-layout';
import { useState } from 'react';
import NotFoundPage from 'src/app/not-found';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';
import { useRouter } from 'next/navigation';
import { Collapse, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { Project } from 'src/types/project';
import Link from 'next/link';

// ----------------------------------------------------------------------

const StyledSearchbar = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  //zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER.H_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: HEADER.H_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

type SearchbarProps = {
  sx?: SxProps<Theme>;
};

export const Searchbar = ({ sx }: SearchbarProps) => {
  const searchOpen = useBoolean();

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [searchedData, setSearchedData] = useState<Project[]>([])
  const [openSearchExpander, setOpenSearchExpander] = useState(false)
  const offset = useOffSetTop();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const handleClickAway = () => {
    searchOpen.onFalse()
    setOpenSearchExpander(false)
  }
  const handleSearch = async (inputValue: string) => {

    setLoading(true)
    searchOpen.onFalse()

    try {
      if (/\S/.test(inputValue)) {
        await fetch('/api/search', {
          method: 'POST',
          body: JSON.stringify(inputValue),
          headers: {
            'Content-Type': 'application/text',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Cache-Control': 'no-store'
          },
        }).then(async (response) => {
          searchOpen.onFalse
          const searchedData = await response.json()
          setSearchedData(searchedData.data)

          setLoading(false)
          searchOpen.onFalse
          return searchedData.data.length == 0 ?
            router.push('/pretraga/nema-rezultata')
            :
            setOpenSearchExpander(true)
        }).catch((error) => {
          setLoading(false)
          console.log(error);

          // setOpenSearchExpander(false)
          searchOpen.onFalse
          console.log(error);
        })
      } else {
        setLoading(false)
        setOpenSearchExpander(false)
        searchOpen.onFalse()
      }
    } catch (error) {
      setLoading(false)
      setOpenSearchExpander(false)
      searchOpen.onFalse()
      console.error('Error searching products:', error);
    }
    searchOpen.onFalse()
  }

  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <div>
        <IconButton aria-label="search" onClick={searchOpen.onTrue} sx={sx}>
          <Iconify icon="carbon:search" />
        </IconButton>

        <Slide direction="down" in={searchOpen.value} mountOnEnter unmountOnExit>
          <StyledSearchbar sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90vw', mt: '25px' }}>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder="Pretraga..."
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="carbon:search" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                onInput={(e: any) => setInputValue(e.target.value)}
              />
              <LoadingButton
                loading={loading}
                loadingPosition="center"
                //loadingIndicator='Pretraga...'
                variant="outlined"
                onClick={() => handleSearch(inputValue)} sx={{ marginRight: '20px', mt: '20px' }}
              >
                Pretraga
              </LoadingButton>
            </Box>
          </StyledSearchbar>

        </Slide>

        <Slide direction="down" in={openSearchExpander} mountOnEnter unmountOnExit timeout={1000}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            top: 0,
            left: 0,
            height: 'auto',
            zIndex: 99,
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
            // height: HEADER.H_MOBILE,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
            padding: theme.spacing(0, 3),
            boxShadow: theme.customShadows.z8,
            backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
            py: '10px'
          }}>
            <Typography sx={{ marginBottom: '5px' }}>Projekti/aktivnosti kao rezultat pretrage:</Typography>
            {
              searchedData.length > 0 ? (
                (
                  searchedData.map((searchItem: Project, index: number) => (
                    <Box key={index} sx={{ marginBottom: '5px' }}>
                      <Link key={index} href={searchItem.projectURL} style={{ textDecoration: 'none' }} onClick={() => setOpenSearchExpander(false)}>
                        <Typography key={index} sx={{ textDecoration: 'none', color: theme.palette.primary.main }}>{searchItem.subTitle}</Typography>
                      </Link>
                    </Box>
                  )))
              ) : (
                <Typography>Nema rezultata pretrage...</Typography>
              )
            }
          </Box>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
