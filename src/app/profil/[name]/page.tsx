import { Typography } from '@mui/material';
import { profilesData } from 'src/_mock/profile-data';
import ProfileView from 'src/sections/view/profile-view';

// ----------------------------------------------------------------------

export const metadata = {
     title: 'LDA Subotica: About Us',
};

type ProfilePageParams = {
     params: Promise<{
          name: string;
     }>;
}

export default async function ProfilePage({ params }: ProfilePageParams) {
     const resolvedParams = await params;
     return <ProfileView params={resolvedParams} />;
}
