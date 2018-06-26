<template>
    <div>
        <div id="loading-container" class="loading-container fb-row pad-0 mar-0 width-full middle-md center-md"
             v-show="showLoader">
            <custom-loader type="loaderNumber" :type-number="6"></custom-loader>
        </div>

        <master-layout id="layout-body">
            <div slot="page-body">

                <tournament v-for="tournament in tournaments" :key="tournament.id" :tournament="tournament"></tournament>

                <br/><br/>

            </div>
        </master-layout>

    </div>
</template>

<script>
//  import * as _ from 'lodash';
  import axios from '@/services/axios';

  import MasterLayout from 'views/layouts/MasterLayout.vue';
  import Tournament from 'views/partial/Tournament.vue';

  import CustomLoader from 'components/plugins/CustomLoader/index.vue';

  //    import anime from 'animejs';
  //    import ParticleButton from 'components/plugins/ParticleButton/ParticleButton.vue';
  //    import Particles from "imports-loader?anime=animejs!components/plugins/ParticleButton/particle.js";


  const assetImgDir = (name) => require('@/assets/images/' + name);
  export default {
    data() {
      let vm = this;
      return {
        showLoader: true,
        tournaments: []
      }
    },
    methods: {},
    components: {MasterLayout, Tournament, CustomLoader},
    mounted() {
      let vm = this;
      vm.showLoader = false;

      axios.get("/tournament").then(response => {
        vm.tournaments = response.data;
        /*if (vm.tournaments.length == 1) {
          setTimeout(() => {
            vm.showTournamentDetail(vm.tournaments[0]);
          }, 3000)
        }*/
      })

    }
  }
</script>

<style lang="scss">

    .loading-container {
        background-color: #2e3141;
        height: 100vh;
        overflow: hidden;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .8s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

</style>