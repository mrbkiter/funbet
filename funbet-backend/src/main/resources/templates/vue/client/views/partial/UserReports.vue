<template>

    <div v-if="loggedInUser">
        <h3>User Report Section</h3>
        <div class="space-20"></div>


        <div class="panel-block">
            <label>User List</label>
            (Select All
            <el-checkbox v-model="selectAllUsers"></el-checkbox>
            )
            <ul class="user-list">
                <li class="user-item" v-for="t in users">
                    <input name="user" type="checkbox" :value="t.id" v-model="selectedUsers">
                    <!--<el-checkbox v-model="t.id" name="user"></el-checkbox>-->
                    <span><label>{{t.name}}</label> <span v-if="t.lock">(Locked)</span></span>
                </li>
            </ul>
        </div>

        <div class="space-20"></div>

        <el-button @click="showReportDashboard()" type="primary" plain icon="ti-clipboard mr-5">Show report</el-button>


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
                    <td class="cell" v-for="h in matchReport.matchHeaders">{{h.name}}</td>
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
            <el-table v-loading="financeTableLoader" :data="financeReport.reports" style="width: 100%"
                      empty-text="No record">
                <el-table-column prop="name" sortable label="Player" width="150"></el-table-column>
                <el-table-column prop="contribution" sortable label="Contribution" width="200"></el-table-column>
                <el-table-column prop="remainingDebt" sortable label="Remaining Debt" width="380">

                    <template slot-scope="dataItem">
                        <span v-if="loggedInUser.role != 'ADMIN'">{{dataItem.row.remainingDebt}}</span>
                        <el-dropdown v-if="loggedInUser.role == 'ADMIN'">
                            <el-button type="primary">
                                {{dataItem.row.remainingDebt}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <span @click="clearDebt(dataItem.row.userId)">Clear debt</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <el-table-column prop="remainingDebtOtherFee" label="Other Fee" width="400">
                    <template slot-scope="dataItem">
                        <a href="javascript:;" v-if="loggedInUser.role != 'ADMIN'" @click="showUserFeeDetail(dataItem.row)">{{dataItem.row.remainingDebtOtherFee}}</a>
                        <el-dropdown v-if="loggedInUser.role == 'ADMIN'">
                            <el-button type="primary">
                                {{dataItem.row.remainingDebtOtherFee}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <span @click="showAddFee(dataItem.row)">Add fee</span>
                                    <el-dialog title="Add fee" :visible.sync="dataItem.row.enableAddFee" append-to-body>
                                        <el-form :model="dataItem.row">
                                            <el-dropdown-item>
                                                <span @click="showUserFeeDetail(dataItem.row)">View Other Fee Detail</span>
                                            </el-dropdown-item>
                                            <el-form-item label="Fee">
                                                <el-input-number v-model="dataItem.row.fee" :min="0"></el-input-number>
                                            </el-form-item>
                                            <el-form-item label="Note">
                                                <el-input placeholder="Note" v-model="dataItem.row.feeNote"></el-input>
                                            </el-form-item>

                                        </el-form>
                                        <span slot="footer" class="dialog-footer">
                                                <el-button @click="dataItem.row.enableAddFee = false">Cancel</el-button>
                                                <el-button type="primary" @click="saveFee(dataItem.row)">Save</el-button>
                                            </span>
                                    </el-dialog>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <span @click="clearFee(dataItem.row)">Clear fee</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>

                </el-table-column>
                <el-table-column prop="remainingBonus" sortable label="Bonus" width="200">
                    <template slot-scope="dataItem">
                        <a href="javascript:;" v-if="loggedInUser.role != 'ADMIN'" @click="showUserBonusDetail(dataItem.row)">{{dataItem.row.remainingBonus}}</a>
                        <el-dropdown v-if="loggedInUser.role == 'ADMIN'">
                            <el-button type="primary">
                                {{dataItem.row.remainingBonus}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <span @click="showUserBonusDetail(dataItem.row)">View Bonus Detail</span>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <span @click="clearBonus(dataItem.row.userId)">Clear Bonus</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>

                </el-table-column>
            </el-table>

            <el-dialog
                    title="User's Bonus Details"
                    :visible.sync="showUserBonusDetailDialog"
                    width="75%">


                <!-- Bonus Dialog Body -->
                <el-table :data="userBonusDetailList" style="width: 100%" empty-text="No record">

                    <el-table-column prop="otherFee" sortable label="Other Fee"></el-table-column>
                    <el-table-column prop="bonus" sortable label="Bonus"></el-table-column>
                    <el-table-column prop="note" label="Note" width="150"></el-table-column>
                    <el-table-column  sortable label="Fee Paid">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.otherFeePaid == true">Yes</span>
                            <span v-else>No</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="bonusPaid" sortable label="Bonus Paid">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.bonusPaid == true">Yes</span>
                            <span v-else>No</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- /Bonus Dialog Body -->


                <!--<span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showUserBonusDetailDialog = false">Close</el-button>
                </span>-->
            </el-dialog>

            <el-dialog
                    title="User's Fee Details"
                    :visible.sync="showUserFeeDetailDialog"
                    width="75%">
                <!-- Fee Dialog Body -->
                <el-table :data="userFeeDetailList" style="width: 100%" empty-text="No record">
                    <el-table-column prop="otherFee" sortable label="Other Fee"></el-table-column>
                    <el-table-column prop="bonus" sortable label="Bonus"></el-table-column>
                    <el-table-column prop="note" label="Note" width="150"></el-table-column>
                    <el-table-column prop="otherFeePaid" sortable label="Paid"></el-table-column>
                    <el-table-column  sortable label="Fee Paid">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.otherFeePaid == true">Yes</span>
                            <span v-else>No</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bonusPaid" sortable label="Bonus Paid">
                        <template slot-scope="dataItem">
                            <span v-if="dataItem.row.bonusPaid == true">Yes</span>
                            <span v-else>No</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- /Fee Dialog Body -->

                <!--<span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showUserFeeDetailDialog = false">Close</el-button>
                </span>-->
            </el-dialog>


        </div>
        <div class="space-20"></div>

        <div v-if="otherFees.length>0">
            <h3>Other Fee Section</h3>
            <div class="space-20"></div>

            <div class="panel-block" v-if="otherFees.length>0">
                <ul>
                    <li class="pv-5" v-for="o in otherFees"> {{o.otherFee}} ({{ o.note }}) </li>
                </ul>
                <div class="space-20"></div>

                <div v-if="loggedInUser.role == 'ADMIN'">
                <span>
                    <el-input-number v-model="otherFee.amount" placeholder="Other Fee"></el-input-number>
                    <el-input v-model="otherFee.note" placeholder="Note"></el-input>
                    <el-button type="primary" plain icon="ti-save mr-5" @click="saveOtherFee">Save</el-button>
                </span>
                </div>
            </div>
            <div class="space-20"></div>
            <div class="space-20"></div>
        </div>


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
        financeTableLoader: false,
        otherFees: [],
        otherFee: {
          amount: 0,
          note: null
        },

        showUserBonusDetailDialog: false,
        userBonusDetailList: [],


        showUserFeeDetailDialog: false,
        userFeeDetailList: []
      }
    },
    props: ['tournament', 'selectedMatches'],
    mounted() {
      let vm = this;
      axios.get("/user/loggedInUser").then(response => {
        vm.loggedInUser = response.data;
      });

      vm.updateReportByTournament();

    },
    methods: {
      showAddFee: function (row) {
        row.enableAddFee == undefined ? Vue.set(row, 'enableAddFee', true)
          : Vue.set(row, 'enableAddFee', !row.enableAddFee);
      },

      saveOtherFee: function (event) {
        axios.post('/tournament/' + vm.tournament.id + '/otherfee', vm.otherFee)
          .then(response => {
            vm.otherFees.push(response.data);
            vm.buildFinanceReport();
            vm.buildOtherFeeBlock();
            vm.$notify.success({
              title: 'Success',
              message: 'Save change successfully'
            });
          }).catch(function (e) {
          alert(e.response.data);
        });
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
          vm.$notify.success({
            title: 'Success',
            message: 'Save change successfully'
          });
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      clearFee: function (row) {
        let vm = this;
        var url = '/tournament/' + this.tournament.id + '/finance/user/'
          + row.userId + '/fee/clear';
        axios.put(url).then(response => {
          vm.$notify.success({
            title: 'Success',
            message: 'Save change successfully'
          });
          vm.buildFinanceReport();
        });
      },
      showReportDashboard: function (event) {
        let vm = this;

        vm.selectedMatches = vm.selectedMatches;

        if (vm.selectedUsers.length > 0) {

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
          vm.buildFinanceReport();

          vm.buildOtherFeeBlock();
        } else {
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
      buildOtherFeeBlock() {
        let vm = this;
        axios.get('/tournament/' + vm.tournament.id + '/otherfee').then(response => {
          vm.otherFees = response.data;
        });
      },
      clearAllDebt: function (event) {
        var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
        axios.put(url, this.selectedUsers).then(response => {
          this.buildFinanceReport();

          vm.$notify.success({
            title: 'Success',
            message: 'Save change successfully'
          });
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      clearDebt: function (userId) {
        let vm = this;
        var body = [
          userId
        ];

        var url = '/tournament/' + vm.tournament.id + '/finance/debt/clear';
        axios.put(url, body).then(response => {
          this.buildFinanceReport();

          vm.$notify.success({
            title: 'Success',
            message: 'Save change successfully'
          });
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      clearBonus: function(userId){
        let vm = this;
        var body = [
          userId
        ];

        var url = '/tournament/' + vm.tournament.id + '/finance/user/' + userId + '/bonus/clear';
        axios.put(url, body).then(response =>
        {
          vm.buildFinanceReport();
          vm.$notify.success({
            title: 'Success',
            message: 'Save change successfully'
          });
        }).catch(function(e){
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
      renderHeader(h, {column, $index}) {

        let vm = this;
//        console.log("renderHeader", $index, vm.matchReport.matchHeaders);
        if (vm.matchReport.matchHeaders.length > 0)
          return h('div', null, [
            h('div', null, vm.matchReport.matchHeaders[$index].name)
          ])
        else
          return ""
      },
      
      showUserBonusDetail(item){
        let vm = this;
        vm.userBonusDetailList = [];

        var url = `tournament/${vm.tournament.id}/finance/user/${item.userId}/bonus`;
        axios.get(url).then(response =>
        {
           vm.userBonusDetailList = response.data
           vm.showUserBonusDetailDialog = true;
        }).catch(function(e){
          vm.$notify.error({
            title: 'Error',
            message: e.response.data
          });

        });
      },
      showUserFeeDetail(item){
        let vm = this;
        vm.userFeeDetailList = [];

        var url = `tournament/${vm.tournament.id}/finance/user/${item.userId}/fee`;
        axios.get(url).then(response =>
        {
           vm.userFeeDetailList = response.data
           vm.showUserFeeDetailDialog = true;
        }).catch(function(e){
          vm.$notify.error({
            title: 'Error',
            message: e.response.data
          });

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

<style lang="scss" scoped>
    .user-list {
        list-style: none;
        .user-item {
            margin-bottom: 18px;
        }
    }

    .el-input {
        width: 200px;
    }

    .el-input-number {
        width: 200px;
    }
</style>