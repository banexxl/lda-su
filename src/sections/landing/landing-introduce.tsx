import { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import bgImage from "public/background-blue-gradient.jpg"
import bgImage2 from "public/background-blue-gradient.png"
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoundingClientRect } from 'src/hooks/use-bounding-client-rect';
import imageURL from "public/logo_main.jpg"
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { ActivityPrevAndNext } from '../activity/common/activities-prev-and-next';
import { LandingActivityItemCarousel } from '../activity/activities-list/landing-activities-item-carousel';
import { ActivityList } from '../activity/activities-list/activities-list';
import { TrendingTopicActivityItem } from '../activity/activities-list/trending-activities';
import { TrendingTopics } from '../activity/activities-list/trending-activities-list';
import { Project } from 'src/types/project';
import { Activity } from 'src/types/activity';
import { ProjectSummary } from 'src/types/projectSummary';

export const LandingIntroduce = () => {

  const mdUp = useResponsive('up', 'md');

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container && container.left + 20;

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
        backgroundImage: `url(${bgImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container ref={containerRef}>
        <Stack
          spacing={3}
          sx={{
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
            display: 'flex',
            flexDirection: mdUp ? 'row' : 'column',
            justifyContent: 'space-between',

          }}
        >
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h2" sx={{ color: 'whitesmoke', marginBottom: '20px' }}>LDA Subotica</Typography>

            <Typography sx={{ color: 'whitesmoke', textAlign: mdUp ? 'start' : 'justify', width: mdUp ? '70%' : '100%' }}>
              Agencije lokalne demokratije nastale su kao izraz želje lokalnih i regionalnih vlasti Evrope da pruže podršku i pomoć lokalnim vlastima tokom ratnih sukoba u bivšoj Jugoslaviji. Prva Agencija osnovana je u Subotici, 1993. godine.<br />
              <br />
              U početnoj fazi aktivnosti Agencija bile su usmerene na pružanje humanitarne pomoći a ubrzo potom one bivaju uključene u složeni proces revitalizacije lokalnih zajednica u najširem smislu, obnove poverenja i dijaloga između različitih etničkih grupa i zaštite ljudskih prava.<br />
              <br />
              Agencije lokalne demokratije danas predstavljaju značajne aktere u procesu stabilizacije i dugoročnog jačanja demokratskih institucija u zemljama Jugoistočne Evrope.<br />
            </Typography>
          </Box>
          <Box >
            <Image
              alt="cover"
              sx={{
                width: '300px',
                height: mdUp ? '250px' : '300px',
                display: mdUp ? 'flex' : 'none',
                backgroundImage: `url(${imageURL.src})`,
                backgroundSize: 'cover',
              }}
            />
          </Box>
        </Stack>
      </Container>

      {/* <TrendingTopics /> */}

      {/* <ActivityList posts={allActivities} /> */}

      {/* <ActivitiesPrevAndNext /> */}

      {/* <LandingActivityItemCarousel post={{
        id: '',
        title: '',
        heroUrl: '',
        tags: undefined,
        createdAt: new Date(),
        category: '',
        coverUrl: '',
        favorited: false,
        description: '',
        author: {
          name: '',
          role: '',
          about: undefined,
          avatarUrl: '',
          phoneNumber: undefined,
          email: ''
        }
      }} /> */}

    </Box>
  );
}
