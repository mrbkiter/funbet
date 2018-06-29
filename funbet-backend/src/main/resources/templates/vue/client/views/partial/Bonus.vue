<template>

    <div class="ph-20">
        <h3>Forecast Section</h3>

        <div class="space-20"></div>

        <div class="panel-block">
            <el-table v-loading="forecastTableLoader" :data="bonuses" style="width: 100%" empty-text="No record">
                <el-table-column width="200" prop="name" label="Bonus Name"></el-table-column>
                <el-table-column width="200" prop="noOfTeam" label="No of teams"></el-table-column>
                <el-table-column width="200" prop="endTimestamp" label="End Time (UTC +07)"></el-table-column>
                <el-table-column width="200" prop="bonusAmount" label="Bonus Amt"></el-table-column>
                <el-table-column width="200" prop="teams" label="Selected teams"></el-table-column>

                <el-table-column fixed="right" label="Actions" width="120">
                    <template slot-scope="dataItem">
                        <el-button v-if="t.editable" @click="predictNow(dataItem.row)" type="text" size="small">
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
        vm.currentPrediction = prediction;
      },
      saveUserPrediction: function () {
        let vm = this;
        var url = '/tournament/prediction/' + vm.currentPrediction.tournamentPredictionId + '/user';
        var body = {
          teamIds: vm.currentPrediction.selectedTeamIds
        };

        axios.post(url, body).then(response => {
          vm.showAnswerSection = !vm.showAnswerSection;
          tournaments.showBonusDetail(vm.tournament);
          vm.currentPrediction = null;
        }).catch(function (e) {
          alert(e.response.data);
        });
      },
      showOtherPredict: function (prediction) {
        let vm = this;
        var url = '/tournament/prediction/' + prediction.tournamentPredictionId;
        vm.showAllSection = !vm.showAllSection;
        axios.get(url).then(response => {
          vm.allPredictions = response.data;
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