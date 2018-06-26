<template>
    <div>
        <table>
            <thead>
            <tr>
                <th>Tournament Name</th>
                <th>Current default money bet</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><a href="#" @click="showTournamentDetail()">{{tournament.name}}</a></td>
                <td>{{tournament.defaultMoneyBet}}</td>
            </tr>
            </tbody>
        </table>
        <br/><br/>


    <matches v-if="tournament" ref="matchesComponent" :tournament="tournament"></matches>
    </div>
</template>

<script>
  //import * as _ from 'lodash';
  import axios from '@/services/axios';
  import Matches from 'views/partial/Matches.vue';

  export default {
    data() {
      let vm = this;
      return {
        /*tournament: {
          name: null,
          defaultMoneyBet: 10000
        },*/
        selectedUser: [],
        selectedMatch: []
      }
    },
    props: ['tournament'],
    components: {Matches},
    mounted() {

      let vm = this;
      vm.showTournamentDetail();
    },
    methods: {
      showTournamentDetail: function () {
        let vm = this;
        //show match section
        vm.showMatches = true;
        //show report section
        vm.tournament = vm.tournament;

        //show recent match only
        vm.$refs.matchesComponent.showRecentMatches(null);
      }
    }

  }
</script>

<style lang="scss">

</style>