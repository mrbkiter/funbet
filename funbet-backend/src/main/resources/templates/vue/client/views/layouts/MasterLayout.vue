<template>
  <div v-cloak class="wrapper">
    <page-header></page-header>
    <slot name='page-header'></slot>

    <div class="at-container flex">
      <slot name='page-body'></slot>
    </div>

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
  @import '~at-ui-style/css/at.css';
  @import '~@/assets/themes/at-ui-style/index.scss';

  /*@import '~@/assets/fonts/fontawesome-5.11/css/fontawesome-all.min.css';
  $fa-font-path: "~font-awesome/fonts";*/
  /*@import '~font-awesome/scss/font-awesome.scss';*/
  ;
  @import '~@/assets/fonts/themify/themify-icons.css';

  $textColor: #000;
  .el-table {
    thead, td {
      color: $textColor !important;
    }
  }


</style>
