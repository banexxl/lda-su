"use client"
import { Box, CircularProgress, Divider, Grid, ImageListItem, Typography, useTheme } from "@mui/material";
// import CardMedia from '@mui/material/CardMedia';
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import backgroundURL from "../../../public/background-scaled-wpv_1024x.jpg"
// import profileURL from "../../../public/assets/team/stanka-parac-damjanovic.jpg"
// import Loading from "src/app/loading";
import { profilesData } from "src/_mock/profile-data";

export default function ProfileView({ params }: any) {

     const theme = useTheme()
     // const [loading, setLoading] = useState(true)
     const profileToRender = profilesData.find(user => user.id === params.name);

     // useEffect(() => {
     //      const timer = setTimeout(() => {
     //           setLoading(false); // Simulate loading completion after 2 seconds
     //      }, 1000);

     //      return () => clearTimeout(timer);
     // }, []);

     return (
          <Box
               sx={{
                    width: '90dvw',
                    margin: '50px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '50px',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: `5px 10px 20px ${theme.palette.primary.dark} inset`
               }}
          >

               <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* {
                         loading ?
                              <CircularProgress color='primary' sx={{ marginLeft: '500px' }} />
                              : */}
                    <Box
                         sx={{
                              margin: '50px',
                              display: 'flex',
                              flexDirection: 'column', // Change to column layout
                              gap: '20px',
                         }}
                    >
                         <Box sx={{ display: 'flex', gap: '20px' }}>
                              <Box
                                   sx={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        width: '33%',
                                        height: '300px',
                                        boxShadow: `10px 5px 5px ${theme.palette.primary.dark}`,
                                        backgroundImage: `url(${profileToRender?.imageURL})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                   }}
                              />

                              <Box sx={{ flex: '1' }}>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Ime: <span style={{ color: theme.palette.text.primary, fontSize: '1.5rem' }}>{profileToRender!.name}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Email: <span style={{ color: theme.palette.text.primary, fontSize: '1.2rem' }}>{profileToRender!.email}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Age: <span style={{ color: theme.palette.text.primary, fontSize: '1.2rem' }}>{profileToRender!.dateOfBirth}</span>
                                   </Typography>
                                   <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                        Location: <span style={{ color: theme.palette.text.primary, fontSize: '1.2rem' }}>{profileToRender!.location}</span>
                                   </Typography>
                              </Box>
                         </Box>

                         <Box>
                              <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>
                                   Biografija:
                              </Typography>
                              <Typography variant="h4" sx={{ marginBottom: '10px', color: theme.palette.primary.main, textAlign: 'justify' }}>
                                   <span style={{ color: theme.palette.text.primary, fontSize: '1rem' }}>{profileToRender!.bio}</span>
                              </Typography>
                         </Box>
                    </Box>
                    {/* } */}
               </Box>

          </Box>

     );
}