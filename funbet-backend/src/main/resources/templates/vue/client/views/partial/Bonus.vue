<template>

    <div>
        <h3>Forecast Section</h3>

        <div class="space-20"></div>

        <div class="panel-block">
            <el-table v-loading="forecastTableLoader" :data="bonuses" style="width: 100%" empty-text="No record">
                <el-table-column prop="name" label="Bonus Name"></el-table-column>
                <el-table-column width="110" prop="noOfTeam" label="No of teams"></el-table-column>
                <el-table-column width="200" prop="endTimestamp" label="End Time (UTC +07)"></el-table-column>
                <el-table-column width="150" prop="bonusAmount" label="Bonus Amt"></el-table-column>
                <el-table-column prop="teams" label="Selected teams"></el-table-column>
                <el-table-column prop="asnweredTeams" label="Answer Result"></el-table-column>
                <el-table-column width="150" prop="predictionStatus" label="Predict Status"></el-table-column>

                <el-table-column label="Actions" width="120">
                    <template slot-scope="dataItem">
                        <el-button v-if="dataItem.row.editable" @click="predictNow(dataItem.row)" type="text" size="small">
                            Predict Now
                        </el-button>
                        <el-button v-else type="text" @click="showOtherPredict(dataItem.row)" size="small">Show Others
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <div class="space-20"></div>
        <div class="space-20"></div>

        <el-dialog v-if="currentPrediction"
                title="Predict Team"
                :visible.sync="showAnswerSection"
                width="75%">
            <!-- Dialog Body -->
            <div class="panel-block">
                <label>Please select {{currentPrediction.noOfTeam}} team(s)</label>
                <div class="space-20"></div>

                <!--<ul class="user-list">
                    <li class="user-item" v-for="t in users">
                        <input name="user" type="checkbox" :value="t.id" v-model="selectedUsers">
                        &lt;!&ndash;<el-checkbox v-model="t.id" name="user"></el-checkbox>&ndash;&gt;
                        <span><label>{{t.name}}</label> <span v-if="t.lock">(Locked)</span></span>
                    </li>
                </ul>-->
                <el-checkbox-group v-model="currentPrediction.selectedTeamIds">
                    <el-checkbox v-for="t in teams" :label="t.id">{{t.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- /Dialog Body -->

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveUserPrediction">Save</el-button>
            </span>
        </el-dialog>



        <el-dialog
                title="Other predictions"
                :visible.sync="showAllSection"
                width="75%">
            <!-- Dialog Body -->
            <el-table v-loading="allPredictionTableLoader" :data="allPredictions" style="width: 100%" empty-text="No record">
                <el-table-column width="300" prop="userName" label="Name"></el-table-column>
                <el-table-column prop="teams" label="Selected teams"></el-table-column>
                <el-table-column prop="predictionStatus" label="Predict Status"></el-table-column>
            </el-table>
            <!--  Dialog Body -->

            <!--<span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showUserFeeDetailDialog = false">Close</el-button>
            </span>-->
        </el-dialog>
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
        forecastTableLoader: true,
        bonuses: [],
        showBonusSection: false,
        teams: [],
        currentPrediction: null,
        showAnswerSection: false,
        showAllSection: false,
        allPredictionTableLoader: true,
        allPredictions: []
      }
    },
    props: ['tournament'],
    mounted() {
      let vm = this;
      axios.get("/team").then(response => {
        vm.teams = response.data;
        vm.showBonusDetail(vm.tournament);
      })
        .catch(function (e) {
          alert(e),
            console.log(e)
        });

    },
    methods: {
      predictNow: function (prediction) {
        let vm = this;
        vm.showAnswerSection = !vm.showAnswerSection;
        if(!prediction.selectedTeamIds){
          prediction.selectedTeamIds = [];
        }
        vm.currentPrediction = prediction;
      },
      saveUserPrediction() {
        let vm = this;

        let teamIds = Object.values(vm.currentPrediction.selectedTeamIds);
        if(teamIds.length > vm.currentPrediction.noOfTeam){
          vm.$notify.error({
            title: 'Error',
            message: `Only ${vm.currentPrediction.noOfTeam} teams can be selected. Please uncheck other teams`
          });
          return false;
        }else{
          var url = '/tournament/prediction/' + vm.currentPrediction.tournamentPredictionId + '/user';
          var body = {
            teamIds: teamIds
          };

          axios.post(url, body).then((response) => {
            vm.showAnswerSection = !vm.showAnswerSection;
            vm.showBonusDetail(vm.tournament);
            vm.showAnswerSection = false;
            vm.currentPrediction = null;

            vm.$notify.success({
              title: 'Success',
              message: 'Save change successfully'
            });
          }).catch(function (e) {
            alert(e);
          });
        }


      },
      showOtherPredict: function (prediction) {
        let vm = this;
        var url = '/tournament/prediction/' + prediction.tournamentPredictionId;
        vm.showAllSection = !vm.showAllSection;
        axios.get(url).then(response => {
          vm.allPredictions = response.data;
          vm.allPredictionTableLoader = false;
        });
      },
      showBonusDetail: function(){
        let vm = this;
        vm.showBonusSection = true;
        var url = '/tournament/' + vm.tournament.id + '/prediction/user';
        axios.get(url).then(response => {
          vm.bonuses = response.data;
          vm.forecastTableLoader = false;
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
</style>