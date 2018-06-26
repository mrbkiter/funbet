<template>
  <div v-cloak>
    <slot name='page-header'></slot>
    <slot name='page-body'></slot>
    <slot name='page-footer'></slot>
  </div>
</template>
<script>
  import Vue from 'vue';
  import * as _ from 'lodash';


  //import * as skel from 'skel-framework-npm';

  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {},

    mounted() {
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import '~@/assets/less/flexboxgrid-less/flexboxgrid.less';

  @import '~flexboxgrid-helpers/dist/flexboxgrid-helpers.min.css';
</style>
<style rel="stylesheet/scss" lang="scss">
  [v-cloak] {
    display: none;
  }
  @import '~compass-mixins/lib/_compass.scss';
  /*@import '~vendors/solid-state/assets/css/main.css';*/
  @import '~@/assets/fonts/fontawesome-5.11/css/fontawesome-all.min.css';
  @import '~@/assets/scss/main.scss';
  @import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One');

  $fa-font-path: "~font-awesome/fonts";
  /*@import '~font-awesome/scss/font-awesome.scss';*/
  ;
  @import '~@/assets/fonts/themify/themify-icons.css';
</style>
