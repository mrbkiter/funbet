<template>
    <div>
        <div class="panel-block">
            <el-table :data="tournaments"  style="width: 100%">
                <el-table-column prop="name" label="Tournament Name" width="180">
                    <template slot-scope="dataItem">
                        <el-button @click="showTournamentDetail(dataItem.row)" type="text" size="small">{{dataItem.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="defaultMoneyBet" label="Default Bet Amount" width="180">
                </el-table-column>
            </el-table>
            <div class="space-20"></div>
        </div>
        <div>
            <matches v-if="tournament" ref="matchesComponent" :tournament="tournament"></matches>
        </div>
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
        loader: true,
        selectedUser: [],
        selectedMatch: []
      }
    },
    props: ['tournament'],
    computed: {
      tournaments(){
        let vm = this;
        return [vm.tournament];
      }
    },
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
        //vm.$refs.matchesComponent.showRecentMatches(null);
      }
    }

  }
</script>

<style lang="scss">

</style>