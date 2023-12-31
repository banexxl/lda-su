import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Activity } from 'src/types/activity';

import { FeaturedActivityItem } from './featured-activities-item';

// ----------------------------------------------------------------------

type Props = {
  featuredCompletedActivities: Activity[];
};

export const FeaturedActivities = ({ featuredCompletedActivities }: Props) => {
  console.log(featuredCompletedActivities);

  const featuredActivity = featuredCompletedActivities[0];

  return (
    <Container
      sx={{
        pt: { xs: 0, md: 5 },
        pb: 10,
      }}
    >
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
      >
        <FeaturedActivityItem activity={featuredActivity} largeActivity />

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {featuredCompletedActivities.slice(1, 5).map((activity) => (
            <FeaturedActivityItem key={activity._id} activity={activity} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
