<template>

    <div v-if="showReport"  style="overflow-x:auto;">
        <label>User Report Section</label>

        <br/>
        <span>
        <div>
            <label>User List</label>
        (Select All<input type="checkbox" v-model="selectAllUsers">)
        <div id="user-list" v-for="t in users">
            <input name="user" type="checkbox" :value="t.id" v-model="selectedUsers">
            <span><label>{{t.name}}</label> <span v-if="t.lock">(Locked)</span></span>
        </div>
        </div>
        <div>
            <label>Match list</label>
            <div id="team-list" v-for="m in matches">

    </div>
        </div>
    </span>
        <br/>
        <button v-on:click="buildReportDashboard">Show report</button>
        <br/><br/>
        <table>
            <thead>
            <tr>
                <td/>
                <td v-for="h in matchReport.matchHeaders">{{h.name}}</td>
            </tr>
            </thead>
            <tbody v-for="(r, idx1) in matchReport.matchRows">
            <tr>
                <td v-for="(ele, idx2) in r" v-if="idx2 == 0">
                    {{ele.teamName1}} ({{ele.follower1}}) - {{ele.teamName2}} ({{ele.follower2}})
                </td>
                <td v-else>
                    <span v-if="ele.selectedTeamName == null"> - {{ele.betStatus}}</span>
                    <span v-else>{{ele.selectedTeamName}} - {{ele.betStatus}}</span>
                </td>
            </tr>
            </tbody>
        </table>
        <br/><br/>
        <table>
            <thead>
            <tr>
                <td>Player</td>
                <td>Contribution</td>
                <td>Remaining Debt</td>
                <td>Other fee</td>
                <td>Bonus</td>
                <!--<td v-if="loggedInUser.role == 'ADMIN'">
                    <button v-on:click="clearAllDebt">Clear all debt</button>
                </td>-->
            </tr>
            </thead>
            <tbody v-for="t in financeReport.reports">
            <tr>
                <td>{{t.name}}</td>
                <td>{{t.contribution}}</td>
                <td>{{t.remainingDebt}}
                    <span  v-if="loggedInUser.role == 'ADMIN'">
                &nbsp; <button v-on:click="clearDebt(t.userId)">Clear debt</button>
            </span>
                </td>
                <td>{{t.remainingDebtOtherFee}}
                    <span  v-if="loggedInUser.role == 'ADMIN'">
                     &nbsp;
                    <button v-on:click="showAddFee(t)">Add fee</button>
                    <div v-if="t.enableAddFee">
                        <input type="number" v-model="t.fee" placeholder="How much" />
                        <input type="text" v-model="t.feeNote" placeholder="Note"/>
                        <button v-on:click="saveFee(t)">Save</button>
                    </div>
                    <button v-on:click="clearFee(t)">Clear</button>
                </span>

                </td>
                <td>{{t.remainingBonus}}</td>
            </tr>
            </tbody>
        </table>
        <br/><br/>
        <label>Total Contribution: </label> {{financeReport.totalContribution}} <br/>

        <label>Total remaining debt: </label> {{financeReport.totalRemainingDebt}}
    </div>
</template>

<script>
    //import * as _ from 'lodash';
    import axios from '@/services/axios.js';

    export default {
        data() {
            let vm = this;
            return {
              matchReport: {
                matchRows: [],
                matchHeaders: []
              },
              showReport: false,
              users: [],
              matches: [],
              selectedUsers: [],
              selectedMatches: [],
              tournament: null,
              financeReport: [],
              loggedInUser: null
            }
        },
      mounted(){
        axios.get("/user/loggedInUser").then(response => {
          this.loggedInUser = response.data;
        });

      },
      methods: {
        showAddFee: function(row)
        {
          row.enableAddFee == undefined ? Vue.set(row, 'enableAddFee', true)
            : Vue.set(row, 'enableAddFee', !row.enableAddFee);
        },
        saveFee: function(row)
        {
          row.enableAddFee = !row.enableAddFee;
          var body = {
            fee: row.fee,
            note: row.note
          };

          var url = '/tournament/' + this.tournament.id + '/finance/user/'
            + row.userId + '/fee';
          axios.post(url, body).then(response => {
            this.buildFinanceReport();
          }).catch(function(e)
          {
            alert(e.response.data);
          });
        },
        clearFee: function(row)
        {
          var url = '/tournament/' + this.tournament.id + '/finance/user/'
            + row.userId + '/fee/clear';
          axios.put(url).then(response => {
            this.buildFinanceReport();
          });
        },
        buildReportDashboard: function(event){
          this.selectedMatches = matches.selectedMatches;
          var body = {
            "userIds": this.selectedUsers,
            "matchIds": this.selectedMatches
          };
          axios.post("/report/tableboard", body).then(response => {
            this.matchReport.matchRows = response.data.rows;
            this.matchReport.matchHeaders = response.data.headers;
          });
          this.buildFinanceReport();
        },
        buildFinanceReport()
        {
          var url = '/tournament/' + this.tournament.id + '/finance/report';
          axios.post(url, this.selectedUsers).then(response => {
            this.financeReport = response.data;
            this.financeReport.reports.forEach(function(r) {
              Vue.set(r, 'fee', 0);
              Vue.set(r, 'note', '');
            });
          })
        },
        clearAllDebt: function(event) {
          var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
          axios.put(url, this.selectedUsers).then(response =>
          {
            this.buildFinanceReport();
          }).catch(function(e){
            alert(e.response.data);
          });
        },
        clearDebt: function(userId)
        {
          var body = [
            userId
          ];

          var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
          axios.put(url, body).then(response =>
          {
            this.buildFinanceReport();
          }).catch(function(e){
            alert(e.response.data);
          });
        }
      },
      computed: {
        selectAllUsers: {
          get: function () {
            return this.users ? this.selectedUsers.length == this.users.length : false;
          },
          set: function (value) {
            var selectedUsers = [];

            if (value) {
              this.users.forEach(function (user) {
                selectedUsers.push(user.id);
              });
            }

            this.selectedUsers = selectedUsers;
          }
        }
      }
    }
</script>

<style lang="scss">

</style>