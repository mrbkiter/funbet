<template>
  <div style="display:grid">
    <!--<button class="action">Back</button>-->
    <a href="javascript:;" class="particles-button" @click="onClick()"><slot></slot></a>
  </div>
</template>
<script>
  import anime from 'animejs';
  import Particles from "imports-loader?anime=animejs!components/plugins/ParticleButton/particle.js";

  export default {
    props: {
      requireValidation: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        particles: null
      }
    },
    methods:{
      onClick(){
        let vm = this;
        vm.$emit('on-click');
        if(!vm.requireValidation){
          vm.doAnimate();
        }
      },
      doAnimate(){
        let vm = this;
        if ( !vm.particles.isAnimating() ) {
          vm.particles.disintegrate();
        }
        vm.$emit('after-animated');
      },
      onHide(){
        let vm = this;
        vm.$emit('on-hide');
      }
    },
    mounted() {
      let vm = this;

      const bttn = vm.$el.querySelector('a.particles-button');
      //const bttnBack = vm.$el.querySelector('button.action');

      let particlesOpts = {
        color: '#fff',
        begin(){
        },
        complete() {
          vm.onHide();
          /*vm.$nextTick(() => {
            vm.showButton = false;
          })*/

          //vm.onHide();
          /*if ( !buttonVisible ) {
            anime.remove(bttnBack);
            anime({
              targets: bttnBack,
              duration: 300,
              easing: 'easeOutQuint',
              opacity: 1,
              scale: [0,1]
            });
            bttnBack.style.pointerEvents = 'auto';
          }*/
        }
      };
      vm.particles = new Particles(bttn, particlesOpts);

      let buttonVisible = true;
      /*bttn.addEventListener('click', () => {

      });*/
      /*bttnBack.addEventListener('click', () => {
        if ( !particles.isAnimating() && !buttonVisible ) {
          anime.remove(bttnBack);
          anime({
            targets: bttnBack,
            duration: 300,
            easing: 'easeOutQuint',
            opacity: 0,
            scale: 0
          });
          bttnBack.style.pointerEvents = 'none';

          particles.integrate({
            duration: 800,
            easing: 'easeOutSine'
          });
          //buttonVisible = !buttonVisible;
        }
      });*/
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .particles {
    position: relative;
    grid-area: 1 / 1 / 2 / 2;
  }

  .particles-canvas {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .particles-wrapper {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .particles-button {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    border-radius: 5px;
    border-radius: var(--radius-button);
    background: var(--color-button-bg);
    color: var(--color-button-text);
    border: 0;
    border: var(--border-button);
    margin: 0;
    padding: 1.5rem 3rem;
    padding: var(--button-padding);
  }

  .particles-button:focus {
    outline: none;
  }

  .no-js .particles-button {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>