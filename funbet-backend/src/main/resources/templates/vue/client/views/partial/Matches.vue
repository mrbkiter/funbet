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
                    <el-table-column prop="betMoney" label="Stake" width="80"></el-table-column>
                    <el-table-column prop="startTime" label="Start Time" width="150" sortable></el-table-column>
                    <el-table-column prop="selectedTeamName" label="Selected Team" width="120"></el-table-column>
                    <el-table-column prop="betStatus" label="Betting Status" width="150" sortable>
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.betStatus == 'LOSE'">😞 LOSE</span>
                            <span v-if="dataItem.row.betStatus == 'WIN'">😎 WIN</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="Choose Team" align="center">

                        <template slot-scope="dataItem">

                            <div v-if="dataItem.row.editable==true && dataItem.row.betStatus == null">
                                <el-button :class="{'el-button--success': dataItem.row.selectedTeamId == dataItem.row.teamId1, 'is-plain': dataItem.row.selectedTeamId != dataItem.row.teamId1}"
                                           size="mini"
                                           @click="saveSelectedTeam(dataItem.row, '1')">{{dataItem.row.teamName1}}</el-button>

                                <el-button :class="{'el-button--success': dataItem.row.selectedTeamId == dataItem.row.teamId2, 'is-plain': dataItem.row.selectedTeamId != dataItem.row.teamId2}"
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
            <user-reports v-if="tournament" ref="userReportComponent" :tournament="tournament" :selected-matches="selectedMatches"></user-reports>

            <!--<table>
                <thead>
                <tr>
                    <th></th>
                    <th><input type="checkbox" v-model="selectAllMatches"></th>
                    <th>Team 1</th>
                    <th>Score</th>
                    <th>Match Betting</th>
                    <th>Team 2</th>
                    <th>Stake</th>
                    <th>Start Time</th>
                    <th>Selected Team</th>
                    <th>Betting Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody v-for="(t, index) in matches">
                <tr>
                    <td>{{index + 1}}</td>
                    <td><input name="match" type="checkbox" :value="t.matchId" v-model="selectedMatches"></td>
                    <td>{{t.teamName1}}</td>
                    <td><span v-if="t.score1 != null">{{t.score1}} - {{t.score2}}</span></td>
                    <td>{{t.betScore1}} - {{t.betScore2}}</td>
                    <td>{{t.teamName2}}</td>
                    <td>{{t.betMoney}}</td>
                    <td>{{t.startTime}}</td>
                    <td>{{t.selectedTeamName}}</td>
                    <td>{{t.betStatus}}</td>
                    <td>
                        <div v-if="t.editable">
                    <span>
                        <button v-on:click="showSelectedTeam(t)">Choose Team</button>
                        <span v-if="t.needChooseTeam">
                            <select v-model="t.selectedTeamId">
                                <option :value="t.teamId1">{{t.teamName1}}</option>
                                <option :value="t.teamId2">{{t.teamName2}}</option>
                                <option></option>
                            </select>
                            <button v-on:click="saveSelectedTeam(t)">Save</button>
                        </span>
                    </span>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>-->
        </div>


        <div class="space-20"></div>
        <div class="space-20"></div>

    </div>
</template>

<script>
  //import * as _ from 'lodash';
  import axios from '@/services/axios.js';
  import Vue from 'vue';
  import UserReports from 'views/partial/UserReports.vue';

  export default {
    data() {
      let vm = this;
      return {
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
    components: {UserReports},
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