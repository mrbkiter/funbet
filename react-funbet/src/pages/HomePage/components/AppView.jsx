import React, { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AwesomeIcon from 'components/AwesomeIcon';
import AppCurrentVisits from 'sections/overview/app-current-visits';
import AppWidgetSummary from 'sections/overview/app-widget-summary';
import AppConversionRates from 'sections/overview/app-conversion-rates';
import useMatches from 'pages/Matches/hooks/useMatches';
import useGamblers from 'pages/Gamblers/hooks/useGamblers';
import { betStatusAnalysis } from 'pages/Matches/helper';
import { filterTopContributor } from 'pages/Gamblers/helper';
import ShortMatches from './ShortMatches';
// import Forecast from './Forecast';

export default function AppView() {
  const { data, actions } = useMatches();
  const { data: gamblers, actions: actionsGamblers } = useGamblers();

  useEffect(() => {
    actions.getAllMatches();
    actionsGamblers.getAllGamblers();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome to Risk Management System
      </Typography>
      {data && data.getAllMatches && gamblers && gamblers.allGamblers && (
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Win"
              total={betStatusAnalysis(data.getAllMatches, 'WIN')}
              icon={
                <AwesomeIcon
                  size={52}
                  color="rgb(16, 157, 16)"
                  iconName="fas fa-smile-wink"
                />
              }
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Draw"
              total={betStatusAnalysis(data.getAllMatches, 'DRAW')}
              icon={
                <AwesomeIcon
                  size={52}
                  color="rgb(241, 168, 33)"
                  iconName="fas fa-meh"
                />
              }
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Lose"
              total={betStatusAnalysis(data.getAllMatches, 'LOSE')}
              icon={
                <AwesomeIcon
                  size={52}
                  color="rgb(255, 86, 48)"
                  iconName="fas fa-sad-tear"
                />
              }
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Remaining"
              total={betStatusAnalysis(data.getAllMatches, null)}
              icon={
                <AwesomeIcon
                  size={52}
                  color="rgb(15, 112, 184)"
                  iconName="fas fa-smile"
                />
              }
            />
          </Grid>
          <Grid xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Top 10 Contributor"
              subheader="They're people who make the difference of the game."
              chart={{
                series: filterTopContributor(gamblers.allGamblers.reports),
              }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Betting Analysis"
              chart={{
                series: [
                  {
                    label: 'Win',
                    value: betStatusAnalysis(data.getAllMatches, 'WIN'),
                  },
                  {
                    label: 'Lose',
                    value: betStatusAnalysis(data.getAllMatches, 'LOSE'),
                  },
                  {
                    label: 'Draw',
                    value: betStatusAnalysis(data.getAllMatches, 'DRAW'),
                  },
                  {
                    label: 'Remaining',
                    value: betStatusAnalysis(data.getAllMatches, null),
                  },
                ],
                colors: [
                  'rgb(16, 157, 16)',
                  'rgb(246, 69, 29)',
                  'rgb(241, 168, 33)',
                  'rgb(15, 112, 184)',
                ],
              }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={12}>
            <ShortMatches />
          </Grid>
          <Grid xs={12} md={6} lg={12}>
            {/* <Forecast /> */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
