<template>
  <div v-cloak>
    <page-header></page-header>
    <slot name='page-header'></slot>
    <slot name='page-body'></slot>
    <slot name='page-footer'></slot>
  </div>
</template>
<script>
  import Vue from 'vue';
//  import '@/assets/themes/ElementDodgerBlue/index.css';
  import 'element-ui/lib/theme-chalk/index.css';
  import PageHeader from 'views/partial/PageHeader.vue';

  export default {
    data() {
      return {
      }
    },
    components: {PageHeader},
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
  @import '~@/assets/scss/main.scss';

  /*@import '~@/assets/fonts/fontawesome-5.11/css/fontawesome-all.min.css';
  $fa-font-path: "~font-awesome/fonts";*/
  /*@import '~font-awesome/scss/font-awesome.scss';*/
  ;
  @import '~@/assets/fonts/themify/themify-icons.css';
</style>
