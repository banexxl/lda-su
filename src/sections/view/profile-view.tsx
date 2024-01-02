"use client"
import { Box, Typography, useTheme } from "@mui/material";
import backgroundURL from "../../../public/background-scaled-wpv_1024x.jpg"
import { profilesData } from "src/_mock/profile-data";
import { useResponsive } from "src/hooks/use-responsive";

export default function ProfileView({ params }: any) {

     const mdUp = useResponsive('up', 'md');
     const theme = useTheme()

     const profileToRender = profilesData.find(user => user.id === params.name);

     return (
          <Box
               sx={{
                    // width: mdUp ? '100vw' : '90%',
                    // margin: mdUp ? '50px' : '20px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '50px',
                    borderRadius: '10px',
                    padding: mdUp ? '20px' : '0px',
                    boxShadow: `5px 10px 20px ${theme.palette.primary.dark} inset`,
                    backgroundImage: `url(${backgroundURL.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
               }}
          >

               <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                         sx={{
                              margin: '20px',
                              display: 'flex',
                              flexDirection: 'column', // Change to column layout
                              gap: '20px',
                         }}
                    >
                         <Box sx={{ display: 'flex', gap: '20px', flexDirection: mdUp ? 'row' : 'column' }}>
                              <Box
                                   sx={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        width: mdUp ? '33%' : '100%',
                                        height: '300px',
                                        boxShadow: `10px 5px 5px ${theme.palette.primary.dark}`,
                                        backgroundImage: `url(${profileToRender?.imageURL})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                   }}
                              />

                              <Box sx={{ flex: '1' }}>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Ime: <span style={{ color: theme.palette.text.primary, fontSize: mdUp ? '1.5rem' : '1rem' }}>{profileToRender!.name}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Email: <span style={{ color: theme.palette.text.primary, fontSize: mdUp ? '1.5rem' : '1rem' }}>{profileToRender!.email}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Age: <span style={{ color: theme.palette.text.primary, fontSize: mdUp ? '1.5rem' : '1rem' }}>{profileToRender!.dateOfBirth}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Location: <span style={{ color: theme.palette.text.primary, fontSize: mdUp ? '1.5rem' : '1rem' }}>{profileToRender!.location}</span>
                                   </Typography>
                              </Box>
                         </Box>

                         <Box >
                              <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                   Biografija:
                              </Typography>
                              <Typography sx={{ marginBottom: '10px', color: theme.palette.text.primary, textAlign: 'justify', fontSize: mdUp ? '1rem' : '.9re' }}>
                                   {profileToRender!.bio}
                              </Typography>
                         </Box>
                    </Box>
               </Box>

          </Box>

     );
}