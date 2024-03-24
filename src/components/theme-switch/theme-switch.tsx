import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeSwitch } from './styles';
import { useSettingsContext } from '../settings';

export const ThemeSwitchToggle = () => {

     const settings = useSettingsContext();

     return (
          <FormGroup>
               <FormControlLabel
                    control={<ThemeSwitch sx={{ m: 1 }} defaultChecked
                         onChange={() =>
                              settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark')
                         }
                    />}
                    label=""
               />
          </FormGroup>
     );
}
