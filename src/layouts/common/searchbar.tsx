import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Theme, alpha, styled, SxProps } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { HEADER } from '../config-layout';
import { useState } from 'react';
import NotFoundPage from 'src/app/not-found';

// ----------------------------------------------------------------------

const StyledSearchbar = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
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

  const handleSearch = async (inputValue: string) => {

    searchOpen.onFalse

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
        }).then((response: Response) => {
          return !response.ok ?
            <NotFoundPage />
            :
            window.location.href = '/kontakt'
        }).then((data) => {
          console.log(data);

          // setSearchResults(data)
          // setLoading(false)
        }).catch((error) => {
          console.log(error);
        })
      } else {
        // setLoading(false)
        // setSearchResults({ message: 'Navedeni termin nije pronadjen!', data: [] })
      }

    } catch (error) {
      console.error('Error searching products:', error);
    }

  }


  return (
    <ClickAwayListener onClickAway={searchOpen.onFalse}>
      <div>
        <IconButton aria-label="search" onClick={searchOpen.onTrue} sx={sx}>
          <Iconify icon="carbon:search" />
        </IconButton>

        <Slide direction="down" in={searchOpen.value} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="carbon:search" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onInput={(e: any) => setInputValue(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleSearch(inputValue)} sx={{ marginRight: '20px' }}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
