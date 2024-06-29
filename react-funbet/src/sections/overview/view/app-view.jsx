import React, { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Iconify from 'components/iconify';
import AwesomeIcon from 'components/AwesomeIcon';
import AppTasks from '../app-tasks';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppConversionRates from '../app-conversion-rates';
import useMatches from 'pages/Matches/hooks/useMatches';
import { betStatusAnalysis } from 'pages/Matches/helper';
import useGamblers from 'pages/Gamblers/hooks/useGamblers';
import { filterTopContributor } from 'pages/Gamblers/helper';

export default function AppView() {
  const { data, actions } = useMatches();
  const { data: dataGamblers, actions: actionsGamblers } = useGamblers();

  useEffect(() => {
    actions.getAllMatches();
    actionsGamblers.getAllGamblers();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome to Risk Management System
      </Typography>

      <Grid container spacing={3}>
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
                iconName="fas fa-frown"
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
          {dataGamblers && (
            <AppConversionRates
              title="Top 10 Contributor"
              subheader="They're people who make the difference of the game."
              chart={{
                series: filterTopContributor(dataGamblers.reports),
              }}
            />
          )}
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

        <Grid xs={12} md={6} lg={8}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: (
                  <Iconify
                    icon="eva:facebook-fill"
                    color="#1877F2"
                    width={32}
                  />
                ),
              },
              {
                name: 'Google',
                value: 341212,
                icon: (
                  <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                ),
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: (
                  <Iconify
                    icon="eva:linkedin-fill"
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: (
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />
                ),
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
