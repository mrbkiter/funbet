<template>

    <div v-if="showMatches" style="overflow-x:auto;">
        <a href="#" v-on:click="showRecentMatches">Recent Matches</a> |
        <a href="#" v-on:click="showAllMatches">All Matches</a>
        <br />
        <table>
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
        </table>
    </div>
</template>

<script>
    //import * as _ from 'lodash';
    import axios from '@/services/axios.js';

    export default {
        data() {
            let vm = this;
            return {
              tournament: null,
              matches: [],
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


      methods: {
          showRecentMatches: function(event)
          {
            this.showMatchesInTournament(true);
          },
          showAllMatches: function(event)
          {
            this.showMatchesInTournament(false);
          },
          showMatchesInTournament: function(recent)
          {
            var url = '/tournament/' + this.tournament.id + '/match/bet';
            if(recent)
              url = '/tournament/' + this.tournament.id + '/match/recent/bet';
            axios.get(url).then(response => {
              this.matches = response.data;
              this.matches.map(item => {
                Vue.set(item, 'editable', item.editable);
                Vue.set(item, 'needChooseTeam', false);
              });
            })
          },
          showSelectedTeam: function(_match)
          {
            Vue.set(_match, 'needChooseTeam', !_match.needChooseTeam);
          },
          saveSelectedTeam: function(_match)
          {
            var url = "/match/" + _match.matchId + "/team/" + _match.selectedTeamId + "/bet";
            axios.put(url).then(response => {
              if(_match.selectedTeamId == _match.teamId1)
                _match.selectedTeamName = _match.teamName1;
              else
                _match.selectedTeamName = _match.teamName2;

            }).catch(function(e){
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
      }


    }
</script>

<style lang="scss">

</style>