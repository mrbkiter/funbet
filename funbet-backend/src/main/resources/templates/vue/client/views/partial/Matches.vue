<template>
    <div>
        <div>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuOnChange">
                <el-menu-item index="recentMatches">
                    <a href="javascript:;">Recent Matches</a>
                </el-menu-item>
                <el-menu-item index="allMatches">
                    <a href="javascript:;">All Matches</a>
                </el-menu-item>
            </el-menu>

            <div class="panel-block">
                <el-table v-loading="tableLoader" :data="matches" style="width: 100%" empty-text="No record"
                          @selection-change="matchesSelectionChange">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column type="selection" width="50"></el-table-column>

                    <el-table-column prop="teamName1" label="Team Name 1" width="150">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.score1 !=null && (dataItem.row.score1 + dataItem.row.betScore1) > (dataItem.row.score2 + dataItem.row.betScore2)">🏅</span>
                            <span :class="{'line-through': dataItem.row.score1 !=null && (dataItem.row.score1 + dataItem.row.betScore1) < (dataItem.row.score2 + dataItem.row.betScore2)}">{{dataItem.row.teamName1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Bet Score" width="120">
                        <template slot-scope="dataItem">
                            {{dataItem.row.betScore1}} - {{dataItem.row.betScore2}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="Score" width="100" sortable>
                        <template slot-scope="dataItem">
                            <span>{{dataItem.row.score1}} - {{dataItem.row.score2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="teamName2" label="Team Name 2" width="150">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.score1 !=null && (dataItem.row.score1 + dataItem.row.betScore1) < (dataItem.row.score2 + dataItem.row.betScore2)">🏅</span>
                            <span :class="{'line-through': dataItem.row.score2 !=null && (dataItem.row.score1 + dataItem.row.betScore1) > (dataItem.row.score2 + dataItem.row.betScore2)}">{{dataItem.row.teamName2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column pro="betMoney" label="Stake" width="80"></el-table-column>
                    <el-table-column prop="startTime" label="Start Time" width="150" sortable></el-table-column>
                    <el-table-column prop="selectedTeamName" label="Selected Team" width="120"></el-table-column>
                    <el-table-column prop="betStatus" label="Betting Status" width="100" sortable  :render-header="renderBetStatusHeader">
                        <template slot-scope="dataItem">
                            <div v-if="dataItem.row.betStatus == 'LOSE'" class="flex">
                                <img :src="assetImgDir('beaten.png')" width="25" height="25" class="mr-5" /> <span class="label-box-danger bold">LOSE</span>
                            </div>

                            <div v-if="dataItem.row.betStatus == 'WIN'" class="flex">
                                <img :src="assetImgDir('big-boss.png')" width="25" height="25" class="mr-5" /> <span class="label-box-success bold">WIN</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="Choose Team" align="center">

                        <template slot-scope="dataItem">

                            <div v-if="dataItem.row.editable==true && dataItem.row.betStatus == null">
                                <el-button style="width:120px" :class="{'el-button--success': dataItem.row.selectedTeamId == dataItem.row.teamId1, 'is-plain': dataItem.row.selectedTeamId != dataItem.row.teamId1}"
                                           size="mini"
                                           @click="saveSelectedTeam(dataItem.row, '1')">{{dataItem.row.teamName1}}</el-button>

                                <el-button style="width:120px" class="mv-10 ml-0" :class="{'el-button--success': dataItem.row.selectedTeamId == dataItem.row.teamId2, 'is-plain': dataItem.row.selectedTeamId != dataItem.row.teamId2}"
                                           size="mini"
                                           @click="saveSelectedTeam(dataItem.row, '2')">{{dataItem.row.teamName2}}</el-button>

                            </div>

                            <el-tooltip placement="top">
                                <div slot="content">You can't bet this match<br/>Because it started already</div>
                                <i v-if="dataItem.row.editable==false" class="ti-lock"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="space-20"></div>
            </div>

            <div class="space-20"></div>
            <bonus v-if="tournament" :tournament="tournament"></bonus>
            <div class="space-20"></div>
            <user-reports v-if="tournament" ref="userReportComponent" :tournament="tournament" :selected-matches="selectedMatches"></user-reports>

        </div>

        <div class="space-20"></div>

    </div>
</template>

<script>
  //import * as _ from 'lodash';
  import axios from '@/services/axios.js';
  import Vue from 'vue';
  import UserReports from 'views/partial/UserReports.vue';
  import Bonus from 'views/partial/Bonus.vue';

  const assetImgDir = (name) => require('@/assets/images/' + name);

  export default {
    data() {
      let vm = this;
      return {
        assetImgDir,
        activeIndex: 'recentMatches',
        matches: [],
        tableLoader: true,
        showMatches: false,
        currentMatch: {
          matchId: null,
          teamId1: null,
          teamId2: null,
          betScore1: null,
          betScore2: null,
          startTime: null,
          moneyBet: null,
          selectedTeamId: null
        },
        selectedMatches: []
      }
    },

    props: ['tournament'],
    components: {UserReports, Bonus},
    methods: {
      menuOnChange(key, keyPath) {
        let vm = this;
        if(key == 'recentMatches'){
          vm.showRecentMatches();
        }
        else if(key == 'allMatches'){
          vm.showAllMatches();
        }
      },
      matchesSelectionChange(selection){
        this.selectedMatches = _.map(selection, (m) => {return m.matchId});
      },
      showRecentMatches: function () {
        this.showMatchesInTournament(true);
      },
      showAllMatches: function (event) {
        this.showMatchesInTournament(false);
      },
      showMatchesInTournament: function (recent) {
        let vm = this;
        var url = '/tournament/' + vm.tournament.id + '/match/bet';
        if (recent)
          url = '/tournament/' + vm.tournament.id + '/match/recent/bet';
        axios.get(url).then(response => {
          vm.matches = response.data;
          vm.matches.map(item => {
            Vue.set(item, 'editable', item.editable);
            Vue.set(item, 'needChooseTeam', false);
          });

          // hide loader
          vm.tableLoader = false;
        })
      },
      showSelectedTeam: function (_match) {
        Vue.set(_match, 'needChooseTeam', !_match.needChooseTeam);
      },
      saveSelectedTeam: function (_match, whichTeamNumber) {
        _match.selectedTeamId = _match[`teamId${whichTeamNumber}`];
        var url = "/match/" + _match.matchId + "/team/" + _match.selectedTeamId + "/bet";
        axios.put(url).then(response => {
          _match.selectedTeamName = _match[`teamName${whichTeamNumber}`]

        }).catch(function (e) {
          alert(e.response.data);
        }).finally(() => {
          Vue.set(_match, 'needChooseTeam', false);
        });
      },

      renderBetStatusHeader(h, { column, $index }){

        let vm = this;
        return h('span', {'class': 'text-ellipsis'}, [
          'Result'
        ])
      }
    },
    computed: {
      selectAllMatches: {
        get: function () {
          return this.matches ? this.selectedMatches.length == this.matches.length : false;
        },
        set: function (value) {
          var selectedMatches = [];

          if (value) {
            this.matches.forEach(function (m) {
              selectedMatches.push(m.matchId);
            });
          }

          this.selectedMatches = selectedMatches;
        }
      }
    },
    mounted(){
      let vm = this;
      vm.showRecentMatches();
    }


  }
</script>

<style lang="scss">

</style>