import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Flag from 'react-world-flags';
export const FlagSwitcher = () => {
     const [currentFlag, setCurrentFlag] = useState('688');
     const router = useRouter();
     const path = usePathname();

     //688-serbian, 826-english
     const switchLanguage = (locale: string) => {
          console.log(locale);

          if (locale.includes('en')) {
               router.push('/en');
               setCurrentFlag('826');
          } else {
               router.push('/sr');
               setCurrentFlag('688');
          }
     };

     return (

          <Box sx={{ display: 'flex', paddingBottom: '22px' }}>
               {/* First flag */}
               <Box style={{ display: 'flex', cursor: 'pointer', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '688' ? 1 : 0 }} onClick={() => switchLanguage('sr')}>
                    <Flag code={'688'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
               </Box>

               {/* Second flag */}
               <Box style={{ display: 'flex', cursor: 'pointer', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '826' ? 1 : 0 }} onClick={() => switchLanguage('en')}>
                    <Flag code={'826'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
               </Box>
          </Box>

     );
};
