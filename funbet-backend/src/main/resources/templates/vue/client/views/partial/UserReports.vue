<template>

    <div>
        <h3>User Report Section</h3>


        <div class="panel-block">
            <label>User List</label>
            (Select All <el-checkbox v-model="selectAllUsers"></el-checkbox>)
            <ul class="user-list">
                <li class="user-item" v-for="t in users">
                    <input name="user" type="checkbox" :value="t.id" v-model="selectedUsers">
                    <!--<el-checkbox v-model="t.id" name="user"></el-checkbox>-->
                    <span><label>{{t.name}}</label> <span v-if="t.lock">(Locked)</span></span>
                </li>
            </ul>
        </div>

        <div class="space-20"></div>

        <el-button @click="buildReportDashboard()" type="primary" plain icon="ti-clipboard mr-5">Show report</el-button>


        <div class="space-20"></div>
        <div class="space-20"></div>


        <div class="panel-block" v-if="matchReport.matchHeaders !=null && matchReport.matchHeaders.length>0">
            <!--<el-table v-loading="userMatchTableLoader" :data="matchReport.matchRows" style="width: 100%" empty-text="No record">
                <el-table-column width="200" :render-header="renderHeader">
                    <template slot-scope="dataItem">


                        <el-table :data="dataItem.row" ng-if="dataItem.length>0" :show-header="false">
                            <el-table-column width="180">
                                <template slot-scope="subDataItem">

                                    <span v-if="subDataItem.$index == 0">
                                        {{subDataItem.row.teamName1}} ({{subDataItem.row.follower1}}) - {{subDataItem.row.teamName2}} ({{subDataItem.row.follower2}})
                                    </span>
                                    <span v-else>
                                        <span v-if="subDataItem.row.selectedTeamName == null"> - {{subDataItem.row.betStatus}}</span>
                                        <span v-else>{{subDataItem.row.selectedTeamName}} - {{subDataItem.row.betStatus}}</span>
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>



                    </template>
                </el-table-column>
            </el-table>-->

            <table class="el-table">
                <thead>
                <tr class="el-table__row">
                    <td/>
                    <td class="cell"  v-for="h in matchReport.matchHeaders">{{h.name}}</td>
                </tr>
                </thead>
                <tbody v-for="(r, idx1) in matchReport.matchRows">
                    <tr class="el-table__row">
                        <td class="cell" v-for="(ele, idx2) in r" v-if="idx2 == 0">
                            {{ele.teamName1}} ({{ele.follower1}}) - {{ele.teamName2}} ({{ele.follower2}})
                        </td>
                        <td class="cell" v-else>
                            <span v-if="ele.selectedTeamName == null"> - {{ele.betStatus}}</span>
                            <span v-else>{{ele.selectedTeamName}} - {{ele.betStatus}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="space-20"></div>
        <div class="space-20"></div>

        <div class="panel-block">
            <el-table v-loading="financeTableLoader" :data="financeReport.reports" style="width: 100%" empty-text="No record">
                <el-table-column prop="name" label="Player" width="150"></el-table-column>
                <el-table-column prop="contribution" label="Contribution" width="200"></el-table-column>
                <el-table-column prop="remainingDebt" label="Remaining Debt" width="380">
                    <template slot-scope="dataItem">
                        <span>{{dataItem.row.remainingDebt}}</span>
                        <el-button v-if="loggedInUser.role == 'ADMIN'" @click="clearDebt(dataItem.row.userId)" round>Clear debt</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="remainingDebtOtherFee" label="Other Fee" width="400">
                    <template slot-scope="dataItem">
                        <span>{{dataItem.row.remainingDebtOtherFee}}</span>
                        <div v-if="loggedInUser.role == 'ADMIN'">


                            <el-button @click="showAddFee(dataItem.row)" round>Add fee</el-button>
                            <div v-if="dataItem.row.enableAddFee">
                                <el-input-number v-model="dataItem.row.fee" :min="0"></el-input-number>

                                <el-input placeholder="Note" v-model="dataItem.row.feeNote"></el-input>

                                <el-button @click="saveFee(dataItem.row)" type="primary" round>Save</el-button>
                            </div>
                            <button @click="clearFee(t)">Clear</button>

                        </div>
                        <el-button v-if="loggedInUser.role == 'ADMIN'" @click="clearDebt(dataItem.row.userId)" round>Clear debt</el-button>
                    </template>

                </el-table-column>
                <el-table-column prop="remainingBonus" label="Bonus" width="200"></el-table-column>
            </el-table>
            <!--<table>
                <thead>
                <tr>
                    <td>Player</td>
                    <td>Contribution</td>
                    <td>Remaining Debt</td>
                    <td>Other fee</td>
                    <td>Bonus</td>
                    &lt;!&ndash;<td v-if="loggedInUser.role == 'ADMIN'">
                        <button v-on:click="clearAllDebt">Clear all debt</button>
                    </td>&ndash;&gt;
                </tr>
                </thead>
                <tbody v-for="t in financeReport.reports">
                <tr>
                    <td>{{t.name}}</td>
                    <td>{{t.contribution}}</td>
                    <td>{{t.remainingDebt}}
                        <span v-if="loggedInUser.role == 'ADMIN'">
                    &nbsp; <button v-on:click="clearDebt(t.userId)">Clear debt</button>
                </span>
                    </td>
                    <td>{{t.remainingDebtOtherFee}}
                        <span v-if="loggedInUser.role == 'ADMIN'">
                         &nbsp;
                        <button v-on:click="showAddFee(t)">Add fee</button>
                        <div v-if="t.enableAddFee">
                            <input type="number" v-model="t.fee" placeholder="How much"/>
                            <input type="text" v-model="t.feeNote" placeholder="Note"/>
                            <button v-on:click="saveFee(t)">Save</button>
                        </div>
                        <button v-on:click="clearFee(t)">Clear</button>
                    </span>

                    </td>
                    <td>{{t.remainingBonus}}</td>
                </tr>
                </tbody>
            </table>-->
        </div>



        <div class="space-20"></div>
        <div class="space-20"></div>
        <label>Total Contribution: </label> {{financeReport.totalContribution}} <br/>

        <label>Total remaining debt: </label> {{financeReport.totalRemainingDebt}}
    </div>
</template>

<script>
  //import * as _ from 'lodash';
  import axios from '@/services/axios.js';
  import Vue from 'vue';

  export default {
    data() {
      let vm = this;
      return {
        matchReport: {
          matchRows: [],
          matchHeaders: []
        },
        users: [],
        matches: [],
        selectedUsers: [],
        financeReport: [],
        loggedInUser: null,

        userMatchTableLoader: false,
        financeTableLoader: false
      }
    },
    props: ['tournament', 'selectedMatches'],
    mounted() {
      let vm = this;
      axios.get("/user/loggedInUser").then(response => {
        this.loggedInUser = response.data;
      });

      vm.updateReportByTournament();

    },
    methods: {
      showAddFee: function (row) {
        row.enableAddFee == undefined ? Vue.set(row, 'enableAddFee', true)
          : Vue.set(row, 'enableAddFee', !row.enableAddFee);
      },
      saveFee: function (row) {
        row.enableAddFee = !row.enableAddFee;
        var body = {
          fee: row.fee,
          note: row.note
        };

        var url = '/tournament/' + this.tournament.id + '/finance/user/'
          + row.userId + '/fee';
        axios.post(url, body).then(response => {
          this.buildFinanceReport();
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      clearFee: function (row) {
        var url = '/tournament/' + this.tournament.id + '/finance/user/'
          + row.userId + '/fee/clear';
        axios.put(url).then(response => {
          this.buildFinanceReport();
        });
      },
      buildReportDashboard: function (event) {
        let vm = this;

        this.selectedMatches = vm.selectedMatches;

        if(vm.selectedUsers.length > 0){

          vm.userMatchTableLoader = true;
          var body = {
            "userIds": vm.selectedUsers,
            "matchIds": vm.selectedMatches
          };

          axios.post("/report/tableboard", body).then(response => {
            this.matchReport.matchRows = response.data.rows;
            this.matchReport.matchHeaders = response.data.headers;

            vm.userMatchTableLoader = false;
          });
          this.buildFinanceReport();
        }else{
          vm.$notify.info({
            title: 'Info',
            message: 'Please tick into the checkbox to select a user for the report.'
          });
        }
      },
      buildFinanceReport() {
        let vm = this;
        vm.financeTableLoader = true;
        var url = '/tournament/' + vm.tournament.id + '/finance/report';
        axios.post(url, vm.selectedUsers).then(response => {
          vm.financeReport = response.data;
          vm.financeReport.reports.forEach(function (r) {
            Vue.set(r, 'fee', 0);
            Vue.set(r, 'note', '');
          });
          vm.financeTableLoader = false;
        })
      },
      clearAllDebt: function (event) {
        var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
        axios.put(url, this.selectedUsers).then(response => {
          this.buildFinanceReport();
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      clearDebt: function (userId) {
        var body = [
          userId
        ];

        var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
        axios.put(url, body).then(response => {
          this.buildFinanceReport();
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      updateReportByTournament: function () {
        let vm = this;
        var teamUrl = '/tournament/' + vm.tournament.id + '/match';

        axios.get(teamUrl).then(response => {
          vm.matches = response.data;
        });

        axios.get("/user").then(response => {
          vm.users = response.data
        });
      },
      renderHeader(h, { column, $index }){

        let vm = this;
//        console.log("renderHeader", $index, vm.matchReport.matchHeaders);
        if(vm.matchReport.matchHeaders.length > 0)
            return h('div', null, [
              h('div', null, vm.matchReport.matchHeaders[$index].name)
            ])
        else
          return ""
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

<style lang="scss" scoped>
    .user-list{
        list-style: none;
        .user-item{
            margin-bottom: 18px;
        }
    }
</style>