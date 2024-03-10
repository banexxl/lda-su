'use'
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import Flag from 'react-world-flags';
import { SplashScreen } from '../loading-screen';
import { usePathname } from 'next/navigation';

export const FlagSwitcher = () => {

     //688-serbian, 826-english
     const [currentFlag, setCurrentFlag] = useState('688');
     const [loading, setLoading] = useState(false); // State to manage loading
     const router = useRouter();
     const path = usePathname();

     const switchLanguage = (locale: string) => {
          //setLoading(true);
          const pathArray = path.split('/')
          const currentRoute = pathArray[1]
          console.log(currentRoute, locale);

          const concatenatedString = pathArray.slice(1).join('/');

          router.push(`/${currentRoute}/${concatenatedString}`);
          router.push(`/${currentRoute}/${concatenatedString}`);
          setCurrentFlag('688');
          router.push('/sr');
          setLoading(false);
     }

     if (loading) {
          return <SplashScreen sx={{ height: '100dvh', width: '100dvw', position: 'absolute', transform: 'translateX(-50%)' }} />;
     }

     return (
          <Box>
               <Box sx={{ display: 'flex', paddingBottom: '22px' }}>
                    {/* First flag */}
                    <Box style={{ display: 'flex', cursor: 'pointer', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '688' ? 1 : 0 }} onClick={() => switchLanguage('sr')}>
                         <Flag code={'688'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
                    </Box>

                    {/* Second flag */}
                    <Box style={{ display: 'flex', cursor: 'pointer', position: 'absolute', transition: 'opacity 0.5s', opacity: currentFlag === '826' ? 1 : 0 }} onClick={() => switchLanguage('en')} />
                    <Flag code={'826'} style={{ height: '20px', width: '20px', borderRadius: '10px' }} />
               </Box>
          </Box>
     );
};
