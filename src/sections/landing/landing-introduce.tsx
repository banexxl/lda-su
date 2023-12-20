import { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import bgImage from "public/background-scaled-wpv_1024x.jpg"
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoundingClientRect } from 'src/hooks/use-bounding-client-rect';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { BlogsPrevAndNext } from '../blog/common/blog-prev-and-next';
import { LandingBlogItemCarousel } from '../blog/blog-list/landing-blog-item-carousel';
import { BlogList } from '../blog/blog-list/blog-list';
import { TrendingTopicBlogItem } from '../blog/blog-list/trending-topic-blog';
import { TrendingTopics } from '../blog/blog-list/trending-topics-blog-list';

export const LandingIntroduce = () => {

  const mdUp = useResponsive('up', 'md');

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container && container.left + 20;

  const imageURL = "../../../public/logoblue.png"

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
        backgroundImage: `url(${bgImage.src})`,
        width: '100dvw'
      }}
    >
      <Container ref={containerRef}>
        <Stack
          spacing={3}
          sx={{
            width: '100%',
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
            backgroundImage: `url(${imageURL})`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box>

            <Typography variant="h2">ALDA</Typography>

            <Typography sx={{ color: 'text.secondary', textAlign: 'start', width: '70%' }}>
              Agencije lokalne demokratije nastale su kao izraz želje lokalnih i regionalnih vlasti Evrope da pruže podršku i pomoć lokalnim vlastima tokom ratnih sukoba u bivšoj Jugoslaviji. Prva Agencija osnovana je u Subotici, 1993. godine.<br />
              <br />
              U početnoj fazi aktivnosti Agencija bile su usmerene na pružanje humanitarne pomoći a ubrzo potom one bivaju uključene u složeni proces revitalizacije lokalnih zajednica u najširem smislu, obnove poverenja i dijaloga između različitih etničkih grupa i zaštite ljudskih prava.<br />
              <br />
              Agencije lokalne demokratije danas predstavljaju značajne aktere u procesu stabilizacije i dugoročnog jačanja demokratskih institucija u zemljama Jugoistočne Evrope.<br />
            </Typography>
          </Box>
          <Box sx={{ marginTop: '50px' }}>
            <Image
              alt="cover"
              src="/assets/logo_main.jpg"
              sx={{ width: '400px', height: mdUp ? '250px' : '200px' }}
            />
          </Box>
        </Stack>
      </Container>

      <TrendingTopicBlogItem topic={{
        cover: '',
        totalPost: 0,
        category: ''
      }} />

      <TrendingTopics />

      <BlogList posts={[]} />

      <BlogsPrevAndNext />

      <LandingBlogItemCarousel post={{
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
      }} />
    </Box>
  );
}
