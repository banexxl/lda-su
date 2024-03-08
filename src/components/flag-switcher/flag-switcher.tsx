import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import Flag from 'react-world-flags';

export const FlagSwitcher = () => {
     const [currentFlag, setCurrentFlag] = useState('688');

     const switchFlag = () => {
          setCurrentFlag(currentFlag === '688' ? '826' : '688');
     };
     console.log(currentFlag);

     return (
          <Box sx={{ display: 'flex', paddingBottom: '22px' }}>
               {/* First flag */}
               <Box style={{ display: 'flex', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '688' ? 1 : 0 }} onClick={switchFlag}>
                    <Flag code={'688'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
               </Box>

               {/* Second flag */}
               <Box style={{ display: 'flex', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '826' ? 1 : 0 }} onClick={switchFlag}>
                    <Flag code={'826'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
               </Box>
          </Box>
     );
};
