<template>
  <div>
    <welcome-text-svg></welcome-text-svg>

  </div>

</template>
<script>
  import {TweenLite} from "gsap";
  import TimelineLite from "gsap/TimelineLite";
  import TweenMax from "gsap/TweenMax";
  import TimelineMax from "gsap/TimelineMax";
  import Draggable from "gsap/Draggable";
  import ModifiersPlugin from "gsap/ModifiersPlugin";
  import {Elastic, Linear, Expo, Power4} from "gsap/EasePack";

  //  console.log(Linear.easeNone);


  //  import CustomEase from "components/plugins/-premium/gsap-plugins/CustomEase.min.js";
  import CustomBounce from "components/plugins/-premium/gsap-plugins/CustomBounce.min.js";
  //import 'components/plugins/-premium/gsap-plugins/drawSVGPlugin.min.js';
  //  import 'components/plugins/-premium/gsap-plugins/ModifiersPlugin.min.js';

  import $ from 'jquery';
  //  import welcomeTextSvg from "svg-inline-loader?classPrefix!components/plugins/WelcomeText/welcomText.svg";
  import welcomeTextSvg from "components/plugins/WelcomeText/welcomeText.svg";

  export default {
    components: {welcomeTextSvg},
    data() {
      return {}
    },
    methods: {

      draw(elem) {
        return TweenLite.fromTo(elem, .8, {drawSVG: "50% 50%", opacity: .2}, {drawSVG: "0% 100%", opacity: 1})
      },
      drop(elem) {
        CustomBounce.create("myBounce", {strength: 0.4, squash: 2, squashID: "myBounce-squash"});
        return TweenLite.fromTo(elem, .5, {y: "-=300px", opacity: 1}, {y: "+=300px", opacity: 1, ease: "myBounce"});
      },
      zoom(elem) {
        return TweenLite.fromTo(elem, .8, {scale: 0, opacity: 1, transformOrigin:"50% 50%"}, {scale: 1})
      },
      comeFromRight(elem) {
        return TweenLite.fromTo(elem, .6, {x: '+=150px', opacity: 1}, {x: '-=150px', ease: Power4.easeIn})
      },
      initText() {
        let vm = this;
        let tl = new TimelineLite({paused: true});

        let target;

        //welcome
        tl.addLabel('_welcome');
        for (let i = 0; i < 7; i++) { // welcome
          target = $(`path:eq(${i})`, $(vm.$el));
          tl.add(
            vm.draw(target), '_welcome'
          );
        }

        tl.addLabel('_to');
        //to
        for (let i = 7; i < 9; i++) {

          target = $(`path:eq(${i})`, $(vm.$el));
          tl.add(
            vm.drop(target), '_to'
          );
        }


        tl.addLabel('_my');
        // my
        for (let i = 9; i < 11; i++) {

          target = $(`path:eq(${i})`, $(vm.$el));

          tl.add(
            vm.drop(target), '_my'
          );
        }

        tl.addLabel('_personal');
        // personal
        for (let i = 11; i < 19; i++) {
          target = $(`path:eq(${i})`, $(vm.$el));

          tl.add(
            vm.zoom(target), '_personal'
          );
        }

        tl.addLabel('_page');
        //page
        for (let i = 19; i < 23; i++) {
          target = $(`path:eq(${i})`, $(vm.$el));
          tl.add(
            vm.comeFromRight(target), '_page'
          );
        }

        tl.play();
      }
    },
    mounted() {
      let vm = this;

      vm.initText();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #welcomeTextSVG {
    path {
      opacity: 0
    }
    .st0 {
      fill: none;
      stroke: #0099FF;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }
  }
</style>