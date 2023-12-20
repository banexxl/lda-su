import { Typography } from '@mui/material';
import { profilesData } from 'src/_mock/profile-data';
import ProfileView from 'src/sections/view/profile-view';

// ----------------------------------------------------------------------

export const metadata = {
     title: 'LDA Subotica: About Us',
};

type ProfilePageParams = {
     params: {
          name: string
     }
}

export default function ProfilePage({ params }: ProfilePageParams) {

     const profileToRender = profilesData.find(user => user.id === params.name);

     return <ProfileView props={profileToRender} />;
}
