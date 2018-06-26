<template>
  <div :style="{width: width + 'px', height: height+ 'px'}">
    <svg :view-box.camel="svgViewBoxSize" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax meet">
      <defs>
        <path id="testTubeOutline" d="M166.91,253H134.45a2.72,2.72,0,0,0-2.71,2.71v2.7a2.72,2.72,0,0,0,2.71,2.71h2.77c0,.44-.07.89-.07,1.35V304.4a13.53,13.53,0,0,0,27,0V262.47c0-.46,0-.91-.07-1.35h2.78a2.72,2.72,0,0,0,2.7-2.71v-2.7A2.72,2.72,0,0,0,166.91,253Z"/>

        <clipPath id="testTubeMask">
          <use xlink:href="#testTubeOutline" fill="red"/>
        </clipPath>
        <g class="popGroup" stroke="#62B6CB" stroke-width="2">
          <line x1="37" y1="37" y2="0" x2="37" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="63.16" y2="10.84" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="74" y2="37" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="63.16" y2="63.16" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="37" y2="74" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="10.84" y2="63.16" fill="none" stroke-miterlimit="10"/>
          <line x1="37" x2="0" y1="37" y2="37" fill="none" stroke-miterlimit="10"/>
          <line x1="37" y1="37" x2="10.84" y2="10.84" fill="none" stroke-miterlimit="10"/>
        </g>
        <circle class="singleBubble" cx="150" cy="270" r="10" fill="#62B6CB" stroke="none" stroke-width="1"/>
        <g class="valueBubble" id="numBubble">
          <circle cx="150" cy="270" r="20" fill="#62B6CB" stroke="none" stroke-width="1" fill-opacity="0.8"/>
          <circle cx="150" cy="270" r="15" fill="none" stroke="#FFFCF9" stroke-width="2" stroke-dasharray="10 89" stroke-dashoffset="45" opacity="0.5" stroke-linecap="round"/>
          <text class="label" x="150" y="280">8</text>
        </g>
      </defs>
      <line :x1="testTubeWidth" :x2="lineWidth" y1="300" y2="300" stroke="#FFFCF9" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
      <g class="draggerOld" opacity="0">
        <circle cx="150" cy="300" r="18" fill="#62B6CB" fill-opacity="1" stroke="#FFFCF9" stroke-width="4"/>
        <circle cx="150" cy="300" r="12" fill="none" stroke="#FFFCF9" stroke-width="2" stroke-dasharray="10 100" stroke-dashoffset="70" opacity="0.5"/>
      </g>
      <g class="bubbleContainer"/>
      <g class="testTubeGroup dragger" stroke="#FFFCF9">
        <g class="liquidGroup" clip-path="url(#testTubeMask)">
          <rect class="testTubeLiquid" x="31" y="276" width="238" height="143" fill="#62B6CB" stroke="none"/>
        </g>
        <use xlink:href="#testTubeOutline" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>

        <g class="testTubeScale" stroke="#FFFCF9" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
          <line class="lip" x1="145.27" y1="261.12" x2="137.15" y2="261.12" opacity="0"/>
          <line class="shine" x1="144" y1="270" x2="144" y2="305" stroke-width="3" opacity="0.3" stroke-dasharray="20 8" stroke-dashoffset="17" stroke-linecap="none" stroke-linejoin="none"/>
          <line x1="163.53" y1="269.23" x2="158.12" y2="269.23"/>
          <line x1="163.53" y1="282.76" x2="158.12" y2="282.76"/>
          <line x1="163.53" y1="296.28" x2="158.12" y2="296.28"/>
        </g>
        <text class="dragLabel" x="149" y="274" opacity="0">1</text>
      </g>
      <circle class="follower" cx="150" cy="240" r="0" fill="#62B6CB" fill-opacity="1" stroke="#FFFCF9" stroke-width="0"/>
    </svg>
  </div>
</template>
<script>
  import TweenLite from "gsap/TweenLite";
  import TweenMax from "gsap/TweenMax";
  import TimelineMax from "gsap/TimelineMax";
  import Draggable from "gsap/Draggable";
  import ModifiersPlugin from "gsap/ModifiersPlugin";
  import {Elastic, Linear, Expo} from "gsap/EasePack";

//  console.log(Linear.easeNone);


  import 'components/plugins/-premium/gsap-plugins/ThrowPropsPlugin.min.js';
  import 'components/plugins/-premium/gsap-plugins/DrawSVGPlugin.min.js';
//  import 'components/plugins/-premium/gsap-plugins/ModifiersPlugin.min.js';

  import $ from 'jquery';

  export default {
    data(){
      let vm = this;
      return {
        testTubeWidth: 150,
        numBubbles: 2,
        //maxDrag: 800,
        step: vm.maxDrag/9,
        dragCount: 0,
        dragId: 0,
        oldDragId: -1,
        followerVX: 0,
        liquidSpeed: 0,
        friction: 0.59,
        spring: 0.1
      }
    },
    props: {
      width: {
        type: Number,
        default: 800
      },
      height: {
        type: Number,
        default: 400
      },
      svgWidth: {
        type: Number,
        default: 1200
      },
      svgHeight: {
        type: Number,
        default: 600
      },
      maxDrag: {
        type: Number,
        default: 700
      },
      auto: {
        type: Boolean,
        default: false
      },
      makeDraggable: {
        type: Boolean,
        default: false
      },
      autoDelay: {
        type: Number, // number of delay seconds,
        default: 0
      },
      percent: {
        type: Number, /* from 1 to 9 */
        default: 0
      }
    },
    computed: {
      svgViewBoxSize() {
        let vm = this;
        return `0 0 ${vm.svgWidth} ${vm.svgHeight}`;
      },
      lineWidth(){
        return this.maxDrag + this.testTubeWidth;
      },

      testTubeGroup() { return this.select('.testTubeGroup') },
      follower() { return this.select('.follower') },
      testTubeLiquid() { return this.select('.testTubeLiquid')},
      popGroup() { return this.select('.popGroup')},
      dragger() { return this.select('.dragger')},
      dragLabel() { return this.select('.dragLabel')},
      bubbleContainer() { return this.select('.bubbleContainer')},
      singleBubble() { return this.select('.singleBubble')},
      valueBubble() { return this.select('.valueBubble')}
    },
    methods: {

      select(s) {
        let vm = this;
        // return document.querySelector(s);
        return vm.$el.querySelector(s);
      },

      randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      removeClone(clone, willpop){
        let vm = this;
        clone.parentNode.removeChild(clone);

        var pop, tl;
        if(willpop){
          pop = vm.popGroup.cloneNode(true);
          vm.bubbleContainer.appendChild(pop);
          //console.log(pop.querySelectorAll('line'))
          tl = new TimelineMax({onComplete:vm.removeClone, onCompleteParams:[pop]}).timeScale(3.6);
          tl.set(pop, {
            x:clone._gsTransform.x+150 - 37,
            y:clone._gsTransform.y + 270 - 37
          })
            .fromTo(pop.querySelectorAll('line'),0.4, {
              drawSVG:'30% 30%'
            },{
              drawSVG:'60% 80%',
              ease:Linear.easeNone
            })
            .to(pop.querySelectorAll('line'), 1, {
              drawSVG:'100% 100%'
            })
        }
      },
      createBubbleCloud() {
        let vm = this;
        vm.dragCount++;
        var i = vm.numBubbles, clone, tweenDuration, id, originX, originY, tl;

        vm.dragId = Math.round(vm.dragger._gsTransform.x / vm.step) + 1;
        vm.dragLabel.textContent = vm.dragId;

        originX = vm.randomBetween(-50, 50);
        originY = vm.randomBetween(-50, 50)

        while (--i > -1) {
          clone = (i > 0) ? vm.singleBubble.cloneNode(true) : vm.valueBubble.cloneNode(true);

          vm.bubbleContainer.appendChild(clone);
          tweenDuration = (i > 0) ? vm.randomBetween(5, 30) / 10 : 1;
          if (i > 0) {
            tl = new TimelineMax();
            tl.fromTo(clone, tweenDuration, {
              attr: {
                r: tweenDuration * 2.7
              },
              x: vm.dragger._gsTransform.x + 6,
              y: vm.randomBetween(vm.dragger._gsTransform.y + 10, vm.dragger._gsTransform.y - 45),
              alpha: vm.randomBetween(1, 10) / 10,
              transformOrigin: originX + '%,' + originY + '%',
              rotation: 0
            }, {
              rotation: vm.randomBetween(12, 120),
              x: vm.randomBetween(vm.dragger._gsTransform.x - 25, vm.dragger._gsTransform.x + 25),
              y: vm.randomBetween(-60, -150),
              ease: Expo.easeOut
            })
              .to(clone, tweenDuration / 3, {
                alpha: 0,
                attr: {
                  r: 0
                },
                ease: Expo.easeIn,
                onComplete: vm.removeClone,
                onCompleteParams: [clone]
              }, '-=' + tweenDuration)


          } else {
            if (vm.dragCount % 15) {
              vm.removeClone(clone);
              return
            }
            ;
            //Main bubble
            clone.querySelector('.label').textContent = vm.dragId;
            tl = new TimelineMax({
              onComplete: vm.removeClone,
              onCompleteParams: [clone, true]
            });
            tl.from(clone, 2, {
              scaleY: 0,
              ease: Elastic.easeOut.config(0.9, 0.3)
            })
              .from(clone, 2, {
                scaleX: 0,
                ease: Elastic.easeOut.config(0.7, 0.3)
              }, '-=2')
              .fromTo(clone, 2.2, {
                x: vm.randomBetween(vm.dragger._gsTransform.x - 6, vm.dragger._gsTransform.x + 6),
                y: vm.randomBetween(-30, vm.dragger._gsTransform.y - 60)
              }, {
                x: vm.dragger._gsTransform.x,
                y: vm.randomBetween(-30, -120),
                ease: Linear.easeNone
              }, '-=2')

          }

        }

      },
      start(){
        let vm = this;
        TweenMax.to(vm.testTubeGroup, 3, {
          x: vm.maxDrag*vm.percent, delay: vm.autoDelay,
          repeat:0,
          onUpdate: vm.createBubbleCloud
        })
      }
    },
    mounted() {
      let vm = this;
      /*var xmlns = "http://www.w3.org/2000/svg",
        xlinkns = "http://www.w3.org/1999/xlink";*/
       /* selectAll = function(s) {
//          return document.querySelectorAll(s);
          return vm.$el.querySelectorAll(s);
        },*/


      TweenMax.set('svg', {
        visibility: 'visible'
      })

      TweenMax.set([vm.valueBubble, vm.singleBubble], {
        transformOrigin:'50% 50%'
      })

      TweenMax.set(vm.testTubeLiquid, {
        transformOrigin:'50% 0%'
      })

      TweenMax.set(vm.testTubeGroup, {
        transformOrigin:'50% 10%'
      })

      function init(){

        if(vm.makeDraggable){
            var myDragger = Draggable.create(vm.dragger, {
            type:'x, y',
            bounds:{minX:0, maxX: vm.maxDrag, minY:10, maxY:10},
            onDrag: vm.createBubbleCloud,
            onThrowUpdate: vm.createBubbleCloud,
            throwProps:true,
            overshootTolerance:0
            /*   snap:function(value){
               return Math.round(value / step) * step;
              } */
          })
        }

        TweenMax.to(vm.follower, 1, {
          x:'+=0',
          repeat:-1,
          modifiers:{
            x:function(x, target){
              vm.followerVX += (vm.dragger._gsTransform.x - vm.follower._gsTransform.x) * 0.3;
              vm.followerVX *= 0.9;
              return vm.follower._gsTransform.x + vm.followerVX;
            }
          }
        })

        TweenMax.to(vm.testTubeLiquid, 1, {
          rotation:'+=0',
          repeat:-1,
          modifiers:{
            rotation:function(rotation, target){
              return rotation+vm.followerVX*0.5

            }
          }
        })


        if(vm.auto){
          // start move the testTube object
          TweenMax.to(vm.testTubeGroup, 3, {
            x: vm.maxDrag*vm.percent, delay: vm.autoDelay,
            repeat:0,
            onUpdate: vm.createBubbleCloud
          })
        }

      }

      init()

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  svg {
    width: 100%;
    height: 100%;
    visibility: hidden;
    transform: translateY(-40%)
  }

  .label, .dragLabel{
    text-anchor:middle;
    font-family:"Gaegu", cursive;
    fill:#FFFCF9;
    font-size:12px;
    user-select:none;
    stroke:none;
  }

  .dragLabel{

    /* font-family:Helvetica,sans-serif; */
    font-size:23px;
    fill:#FFFCF9;
    stroke:none;
    font-weight:700;
    letter-spacing:-4px;
  }
</style>