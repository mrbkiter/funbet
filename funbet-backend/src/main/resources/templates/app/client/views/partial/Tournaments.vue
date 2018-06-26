<template>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Tournament Name</th>
                    <th>Current default money bet</th>
                </tr>
                </thead>
                <tbody v-for="t in tournaments">
                <tr>
                    <td><a href="#" v-on:click="showTournamentDetail(t)">{{t.name}}</a></td>
                    <td>{{t.defaultMoneyBet}}</td>
                </tr>
                </tbody>
            </table>
            <br/><br/>
        </div>

</template>

<script>
    //import * as _ from 'lodash';
    import axios from '@/services/axios.js';

    export default {
        data() {
            let vm = this;
            return  {
            tournaments: [],
              tournament: {
              name: null,
                defaultMoneyBet: 10000
            },
            selectedUser: [],
              selectedMatch: []
          }
        },
      mounted() {
        axios.get("/tournament").then(response => {
          this.tournaments = response.data;
          if(this.tournaments.length == 1)
          {
            this.showTournamentDetail(this.tournaments[0]);
          }
        })
      },
      methods: {
          showTournamentDetail: function($tournament)
          {
            //show match section
            matches.showMatches = true;
            //show report section
            userReport.showReport = true;
            userReport.tournament = $tournament;
            matches.tournament = $tournament;
            //show recent match only
            matches.showRecentMatches(null);
            var teamUrl = '/tournament/' + $tournament.id + '/match';
            axios.get(teamUrl).then(response => {
              userReport.matches = response.data;
            });

            axios.get("/user").then(response => {
              userReport.users = response.data
            });
          }
        }

    }
</script>

<style lang="scss">

</style>