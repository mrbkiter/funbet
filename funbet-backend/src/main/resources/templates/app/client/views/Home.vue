<template>
  <div>
    <div id="loading-container" class="loading-container fb-row pad-0 mar-0 width-full middle-md center-md" v-show="showLoader">
      <custom-loader type="loaderNumber" :type-number="6"></custom-loader>
    </div>

    <layout-solid-state id="layout-body">
      <div slot="page-header">

      </div>
      <div slot="page-body">
        <div id="page-wrapper">

          <!-- Header -->
          <!--<header id="header" class="alt">
            <h1>
              <a href="index.html">Solid State</a>
            </h1>
            <nav>
              <a href="#menu">Menu</a>
            </nav>
          </header>-->

          <!-- Menu -->
          <!--<nav id="menu">
            <div class="inner">
              <h2>Menu</h2>
              <ul class="links">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="generic.html">Generic</a>
                </li>
                <li>
                  <a href="elements.html">Elements</a>
                </li>
                <li>
                  <a href="#">Log In</a>
                </li>
                <li>
                  <a href="#">Sign Up</a>
                </li>
              </ul>
              <a href="#" class="close">Close</a>
            </div>
          </nav>-->

          <!-- Banner -->
          <section id="banner">
            <div class="inner pos-relative">
              <div class="logo">
                <!--<span class="icon fa-diamond"></span>-->
                <img :src="assetImgDir('me-tshirt.png')" class="icon" style="width:156px;height:156px"/>
              </div>
              <h2 class="pos-absolute" style="top: 1.1em;left: 5em;">Hi, I am</h2>
              <typing-text-transition v-if="showName" start-text="Telvin Nguyen" @on-rendered-start-text="myNameRendered"></typing-text-transition>
              <!--<p class="info">Welcome to my personal page </p>-->
              <p class="info" v-if="showWelcomeText">
                <welcome-text></welcome-text>
              </p>
            </div>
          </section>

          <!-- Wrapper -->
          <section id="wrapper">

            <!-- One -->
            <section id="one" class="wrapper spotlight style1">
              <div class="inner">
                <a href="#" class="image">
                  <!--<img :src="`${require('vendors/solid-state/images/pic01.jpg')}`" alt=""/>-->
                  <img :src="assetImgDir('misc/developer.jpg')" alt=""/>
                </a>
                <div class="content">
                  <h2 class="major">About Me</h2>
                  <p>I am a Fullstack developer with 8+ years of experience in the website & mobile application development, I can assist on both the front-end and back-end tasks.</p>
                  <p>My aim is to make sure the users can get to the ultimate goal as fast as possible and map out the natural navigation flow we need them to follow.</p>
                  <p>Smooth, fast and intuitive navigation comes as guaranteed part of my front-end programming services as long as keeping lean code to power up all the mighty functionality created by the backend</p>
                  <!--<a href="#" class="special">Learn more</a>-->
                </div>
              </div>
            </section>

            <section class="wrapper alt spotlight style2">
              <div class="inner">
                <a href="#" class="image">
                  <img :src="assetImgDir('misc/in_blue_coat.jpg')" alt=""/>
                </a>
                <div class="content">
                  <h2 class="major">What I do</h2>
                  <ul>
                    <li>
                      <p>Ensuring quality assurance, developing strategies to support system applications, database management and providing a positive user experience</p>
                    </li>
                    <li>
                      <p>
                        Deliver well designed, highly testable, and resilient applications, do this quickly while being clever to avoid missteps. </p>
                    </li>
                    <li>
                      <p>
                        Be instrumental in driving the application technology roadmap forward and evangelizing the development and testing practices </p>
                    </li>
                    <!--<li>
                      <p>
                        Have an effective positive attitude that shines as I show my care about client and colleague concerns.
                      </p>
                    </li>-->
                    <li>
                      <p>
                        Always learning and to be a transparent communicator even when it is challenging. I thrive on challenging myself daily and seek to surround myself with like minded individuals </p>
                    </li>
                  </ul>
                  <!--<a href="#" class="special">Learn more</a>-->
                </div>
              </div>
            </section>

            <section class="wrapper spotlight style3" v-waypoint="{ active: true, callback: onWaypointSkills, options: intersectionOptions }">
              <div class="inner">
                <a href="#" class="image fb-col-md-3 hidden-sm hidden-xs">
                  <img :src="assetImgDir('skills_set_square.jpg')" alt=""/>
                </a>
                <div class="content fb-col-md-9 fb-col-sm-12">
                  <h2 class="major">My Skills & Tech</h2>

                  <div class="fb-row middle-md" v-for="skill in skills">
                    <div class="fb-col-md-3">
                      <span><i :class="skill.brandClass"></i>{{skill.name}}</span>
                    </div>
                    <div class="fb-col-md-9 middle-md">
                      <div style="width: 100%;height: 60px">
                        <science-slider ref="scienceSlider" :width="800" :height="400" :max-drag="600" :auto="false" :auto-delay="skill.delay" :percent="skill.progress"></science-slider>
                      </div>
                    </div>
                  </div>
                  <!--<a href="#" class="special">Learn more</a>-->
                </div>
              </div>
            </section>

            <section class="wrapper alt style4">
              <div class="inner">
                <h2 class="major">My Work & Contribution</h2>
                <p>The list of my previous projects that I worked on. Some of them not only have the modern responsive design at the first place, they also have include another version of mobile app or hybrid app.</p>
                <section class="features paging-1">
                  <article>
                    <a href="#" class="image">
                      <img :src="assetImgDir('work/recognition-source.jpg')" alt=""/>
                    </a>
                    <h3 class="major">Recognition Source</h3>
                    <p>The <strong>Recognition Source</strong> offers hundreds of crystal awards, many of which come in several different colors and unique styles. All awards from the <strong>Recognition Source</strong> come with free engraving and personalization.
                    </p>
                    <a href="https://www.recognitionsource.com" class="special">Learn more</a>
                  </article>
                  <article>
                    <a href="#" class="image">
                      <img :src="assetImgDir('work/mainlandtool.jpg')" alt=""/>
                    </a>
                    <h3 class="major">Mainland Tool</h3>
                    <p>
                      <strong>Mainland Tool</strong> providing the absolute best where tools and equipment repairs are concerned. The facilities and equipment are state of the art, to ensure that customers get the best services and the best value for their money in the area
                    </p>
                    <a href="https://www.mainlandtool.com" class="special">Learn more</a>
                  </article>
                  <article>
                    <a href="#" class="image">
                      <img :src="assetImgDir('work/fitkit.jpg')" alt=""/>
                    </a>
                    <h3 class="major">Fitkit</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                    <a href="https://fitkit.com" class="special">Learn more</a>
                  </article>
                  <article>
                    <a href="#" class="image">
                      <img :src="assetImgDir('work/plistings_1.jpg')" alt=""/>
                    </a>
                    <h3 class="major">pListings</h3>
                    <p>
                      <strong>pListings</strong> provides a easy way for the real estate broker experts to manage their own private listings with high customization.
                    </p>
                    <a href="http://plistings.com" class="special">Learn more</a>
                  </article>
                </section>
                <transition name="fade">

                  <section class="features paging-2" v-show="listAllShowCase">
                    <article>
                      <a href="#" class="image">
                        <img :src="assetImgDir('work/honolulu.jpg')" alt=""/>
                      </a>
                      <h3 class="major">Honolulu Time</h3>
                      <p>
                        <strong>Honolulu Time</strong> is Hawaii’s largest watch and clock service and sales center since 1978. They are Hawaii’s #1 in Pre-Owned, Never Worn Fine Watches and Jewelry. They carry only finest selection of vintage and contemporary wrist and pocket watches.
                        and specializes in sales and service for many other brands such as Rolex, Omega, Cartier, Piaget
                      </p>
                      <a href="http://honolulutime.com" class="special">Learn more</a>
                    </article>

                    <article>
                      <a href="#" class="image">
                        <img :src="assetImgDir('work/vincere_ats.png')" alt=""/>
                      </a>
                      <h3 class="major">Vincere</h3>
                      <p>
                        <strong>Vincere</strong> is a CRM/ATS weapon built for ambitious recruitment companies of all sizes. <strong>Vincere</strong> is designed specifically for data driven recruitment companies covering Direct hire, Contract & Executive search, with built-in front, middle and back office capabilities. Today, <strong>Vincere</strong> counts some of the industry's biggest names including Randstad and Empresaria Group, plus hundreds of growing recruitment firms across almost 50 countries.
                      </p>
                      <a href="https://vincere.io" class="special">Learn more</a>
                    </article>

                    <article>
                      <a href="#" class="image">
                        <img :src="assetImgDir('work/medstar.jpg')" alt=""/>
                      </a>
                      <h3 class="major">Medstar</h3>
                      <p>The main aim of <strong>MedStar</strong> is to automate the hospital process and digitalize the date to make a paperless hospital. The system also provides excellent security of data at every level. Advanced and comprehensive management system which can integrate all of your hospital organization needs
                      </p>
                      <a href="https://www.medstarhealth.org" class="special">Learn more</a>
                    </article>

                    <article>
                      <a href="#" class="image">
                        <img :src="assetImgDir('work/e_clinical_works.jpg')" alt=""/>
                      </a>
                      <h3 class="major">eClinicalWorks</h3>
                      <p>
                        <strong>eClinicalWorks</strong> is a privately held leader in healthcare IT, providing comprehensive Electronic Health Record (EHR) and Practice Management (PM) solutions used by more than 850,000 providers in more than 20 countries.
                      </p>
                      <a href="https://www.eclinicalworks.com" class="special">Learn more</a>
                    </article>
                  </section>
                </transition>

                <div class="pos-relative" style="height:50px">
                  <custom-loader v-if="didShowMoreWork" type="normalText" class="pos-absolute"></custom-loader>
                  <ul class="actions pos-absolute" :style="{backgroundColor: browseAllBtnBgColor}">
                    <li>
                      <!--<a href="#" class="button">Browse All</a>-->
                      <particle-button @on-click="browseAllWorks()">Browse All</particle-button>
                    </li>
                  </ul>
                </div>

              </div>
            </section>

            <section class="wrapper spotlight style5">
              <div class="fb-row pv-20" style="margin:0 auto;width: 55em;">

                <div class="fb-col-xs-12">
                  <h2 class="major">My Service</h2>
                </div>
                <div class="fb-col-xs-12 fb-col-sm-6 fb-col-md-4">
                  <div class="blog-card-wrapper">
                    <div class="blog-card spring-fever">
                      <div class="title-content">
                        <div class="section-icon ta-c">
                          <span class="ti-brush-alt"></span>
                        </div>
                        <h3>UI/UX Design</h3>
                        <hr/>
                        <!--<div class="intro">UI/UX Design</div>-->
                      </div><!-- /.title-content -->
                      <div class="card-info fb-row middle-md">
                        Hand craft your web/mobile application that has great user experience.
                      </div><!-- /.card-info -->

                      <div class="card-overlay-text fb-row middle-md">
                        Pixel perfection, that is my secret ingredient to make designs look nicer for no apparent reason
                      </div>

                      <!--
                      <div class="utility-info">
                        <ul class="utility-list">
                          <li class="comments">12</li>
                          <li class="date">03.12.2015</li>
                        </ul>
                      </div><!-- /.utility-info -->
                      <!-- overlays -->
                      <div class="gradient-overlay"></div>
                      <div class="color-overlay"></div>
                    </div><!-- /.blog-card -->
                  </div>
                </div>

                <div class="fb-col-xs-12 fb-col-sm-6 fb-col-md-4">
                  <div class="blog-card-wrapper">
                    <div class="blog-card spring-fever">
                      <div class="title-content">
                        <div class="section-icon ta-c">
                          <span class="ti-package"></span>
                        </div>
                        <h3>Frontend Engineering</h3>
                        <hr/>
                        <!--<div class="intro">UI/UX Design</div>-->
                      </div><!-- /.title-content -->
                      <div class="card-info fb-row middle-md">
                        Use latest technologies and frameworks to make sure your web application is robust, fast loading and responsive.
                      </div><!-- /.card-info -->

                      <div class="card-overlay-text fb-row middle-md">
                        Looks great, loads fast, smooth – that is how the final product will look like.
                      </div>

                      <!--
                      <div class="utility-info">
                        <ul class="utility-list">
                          <li class="comments">12</li>
                          <li class="date">03.12.2015</li>
                        </ul>
                      </div><!-- /.utility-info -->
                      <!-- overlays -->
                      <div class="gradient-overlay"></div>
                      <div class="color-overlay"></div>
                    </div><!-- /.blog-card -->
                  </div>
                </div>

                <div class="fb-col-xs-12 fb-col-sm-6 fb-col-md-4">
                  <div class="blog-card-wrapper">
                    <div class="blog-card spring-fever">
                      <div class="title-content">
                        <div class="section-icon ta-c">
                          <span class="ti-layout-media-right"></span>
                        </div>
                        <h3>UI Integration</h3>
                        <hr/>
                        <!--<div class="intro">UI/UX Design</div>-->
                      </div><!-- /.title-content -->
                      <div class="card-info fb-row middle-md">
                        Work closely with the development team to integrate the front end UI into the web application seamlessly, be it Java, .Net, Ruby or PHP.
                      </div>
                      <div class="card-overlay-text fb-row middle-md">
                        With the pleasure to work with the professional attitude, my passion and commitment helped me to boost the product and grow.
                      </div>
                      <!-- /.card-info -->
                      <!--
                      <div class="utility-info">
                        <ul class="utility-list">
                          <li class="comments">12</li>
                          <li class="date">03.12.2015</li>
                        </ul>
                      </div><!-- /.utility-info -->
                      <!-- overlays -->
                      <div class="gradient-overlay"></div>
                      <div class="color-overlay"></div>
                    </div><!-- /.blog-card -->
                  </div>
                </div>


              </div>
            </section>


          </section>


          <!-- Footer -->
          <section id="footer">
            <div class="inner">
              <h2 class="major width-full">Get in touch</h2>
              <div class="fb-row width-full">
                <div class="fb-col-md-7 fb-col-sm-12">
                  <div ref="contactForm" class="contact-form-container">
                  <span class="menu-trigger">
                    <i class="menu-trigger-bar top"></i>
                    <i class="menu-trigger-bar middle"></i>
                    <i class="menu-trigger-bar bottom"></i>
                  </span>
                    <span class="close-trigger">
                    <i class="close-trigger-bar left"></i>
                    <i class="close-trigger-bar right"></i>
                  </span>
                    <span class="content">

                  </span>
                    <div class="inner-container">
                      <i class="menu-bg top"></i>
                      <i class="menu-bg middle"></i>
                      <i class="menu-bg bottom"></i>
                      <div class="menu-container">
                        <div class="menu">
                          <div class="width-full ta-c pt-15">
                            <img :src="assetImgDir('free_style_300.jpg')" class="icon" style="width:120px;border-radius:100%"/>
                          </div>
                          <div class="pt-20 pad-30">
                            <p>IF YOU HAVE NEW IDEA AND LIKE TO SHARE,
                              I WILL LOVE TO HEAR FROM YOU.</p>
                            <div class="form js-contact-fields">
                              <div :class="{error: isContactFormSubmitted && trim(contactFormModel.name) == '', 'field mv-10 pos-relative': true}">
                                <label for="name">Name</label>
                                <input id="name" type="text" v-model="contactFormModel.name" placeholder="What should I call you?"/>
                                <span class="valid-err-msg pos-absolute bold" style="color: rgb(255, 102, 0);top: 2.5rem;left: 18rem;">Please type your name</span>
                              </div>
                              <div :class="{error: isContactFormSubmitted && !isEmail(contactFormModel.email), 'field mv-10 pos-relative': true}">
                                <label for="email">Email</label>
                                <input id="email" type="email" v-model="contactFormModel.email" placeholder="Where can I reach you?"/>
                                <span class="valid-err-msg pos-absolute bold" style="color: rgb(255, 102, 0);top: 2.5rem;left: 18rem;">Please type a valid email</span>
                              </div>
                              <div :class="{error: isContactFormSubmitted && trim(contactFormModel.msg) == '', 'field mv-10 pos-relative': true}">
                                <label for="message">Message</label>
                                <textarea id="message" v-model="contactFormModel.msg" rows="4" placeholder="What's in your mind?"></textarea>
                                <span class="valid-err-msg pos-absolute bold" style="color: rgb(255, 102, 0);top: 2.5rem;left: 18rem;">Hmm, an empty message, are you serious?</span>
                              </div>

                            </div><ul class="actions">
                            <li class="pos-relative">
                              <particle-button ref="btnSubmit" class="pos-absolute" style="top: -0.2rem" v-show="showSubmitButton" :require-validation="true" @on-click="validateForm()" @after-animated="formSubmitted()">Send Message</particle-button>
                              <transition name="fade">
                                <p class="thank-you-submit pos-absolute" style="top: 10px; width: 22em" v-show="showThankyou">Thank you for leaving the message. I'll get to you soon.</p>
                              </transition>

                            </li>
                          </ul>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="fb-col-md-4 fb-col-md-offset-1 fb-col-sm-12">
                  <ul class="contact">
                    <li class="fa-home">
                      15 Dam Than Huy, Phu Tho Hoa<br/>
                      Tan Phu, Ho Chi Minh city
                    </li>
                    <li class="fa-phone">(+84) 988-470 721</li>
                    <li class="fa-envelope">
                      <a href="mailto:telvinnguyen@gmail.com">telvinnguyen@gmail.com</a>
                    </li>
                    <li class="fab fa-linkedin block">
                      <a href="https://www.linkedin.com/in/telvin-nguyen-547176121/" target="_blank">See me on Linkedin</a>
                    </li>
                    <li class="fab fa-stack-overflow block">
                      <a href="https://stackoverflow.com/users/story/1041471" target="_blank">StackOverflow story</a>
                    </li>
                    <!--<li class="fa-twitter">
                      <a href="#">twitter.com/untitled-tld</a>
                    </li>
                    <li class="fa-facebook">
                      <a href="#">facebook.com/untitled-tld</a>
                    </li>
                    <li class="fa-instagram">
                      <a href="#">instagram.com/untitled-tld</a>
                    </li>-->
                  </ul>
                  <!--<ul class="copyright">
                    <li>&copy; Untitled Inc. All rights reserved.</li>
                    <li>Design:
                      <a href="http://html5up.net">HTML5 UP</a>
                    </li>
                  </ul>-->
                </div>
              </div>


            </div>
          </section>

        </div>
      </div>
      <div slot="page-footer"></div>
    </layout-solid-state>

  </div>
</template>

<script>
  import * as _ from 'lodash';

  import LayoutSolidState from 'components/layouts/home/LayoutSolidState.vue';
  import TypingTextTransition from 'components/plugins/TypingTextTransition/index.vue';
  import ScienceSlider from 'components/plugins/ScienceSlider/index.vue';
  import ParticleButton from 'components/plugins/ParticleButton/ParticleButton.vue';


  import CustomLoader from 'components/plugins/CustomLoader/index.vue';
  import WelcomeText from 'components/plugins/WelcomeText/index.vue';

  import anime from 'animejs';
  import Particles from "imports-loader?anime=animejs!components/plugins/ParticleButton/particle.js";

  import {TweenLite} from "gsap";
  import TweenMax from "gsap/TweenMax";
  import TimelineMax from "gsap/TimelineMax";
  import {Power4, Quad} from "gsap/EasePack";

  import MorphSVGPlugin from 'components/plugins/-premium/gsap-plugins/MorphSVGPlugin.min.js';

  const assetImgDir = (name) => require('@/assets/images/' + name);
  export default {
    data() {
      let vm = this;
      return {
        isContactFormSubmitted: false,
        showLoader: true,
        showContent: false,
        showWelcomeText: false,
        assetImgDir, showName: false,
        showSubmitButton: true,
        listAllShowCase: false,
        showThankyou: false,
        didShowMoreWork: true,
        browseAllBtnBgColor: '#454856',
        intersectionOptions: {
          root: null,
          rootMargin: '100px 0px 100px 0px',
          thresholds: [0.5, 0.5, 0.5, 0.5, 1]
        }, //
        contactFormModel: {
          name: '', email: '', msg: ''
        },
        skills: [
          {name: 'HTML5', progress: 1, delay: 0.5, brandClass: 'ti-html5 mr-15'},
          {name: 'CSS3', progress: 1, delay: 0.5, brandClass: 'fab fa-css3-alt mr-15'},
          {name: 'JS', progress: 1, delay: 0.5, brandClass: 'fab fa-js mr-15'},
          {name: 'AngularJS', progress: 1, delay: 0.5, brandClass: 'fab fa-angular mr-15'},
          {name: 'React', progress: 1, delay: 2.5, brandClass: 'fab fa-react mr-15'},
          {name: 'NodeJS', progress: 0.9, delay: 4.5, brandClass: 'fab fa-node mr-15'},
          {name: 'NoSQL', progress: 0.8, delay: 6.5, brandClass: 'fas fa-database mr-15'}
        ],
        showSkillEffect: false
      }
    },
    methods: {
      trim(value){
        return _.trim(value);
      },
      isEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
      },
      onWaypointSkills({going, direction}) {
        let vm = this;
        if (!vm.showSkillEffect && direction) {
          vm.showSkillEffect = true;
          vm.$refs.scienceSlider.forEach((scienceSlider) => {
            scienceSlider.start();
          })
        }
      },
      myNameRendered(){
        let vm = this;
        vm.showWelcomeText = true;
      },
      initHomePage() {
        let vm = this;
        $('body').css('overflow', 'auto');

        setTimeout(() => {
          this.showName = true;
          vm.showLoader = false;
        }, 1000)

        vm.initcontactFormModel();
      },
      validateForm(){
        let vm = this;
        vm.isContactFormSubmitted = true;
        if(_.trim(vm.contactFormModel.name) != '' && _.trim(vm.contactFormModel.msg) != ''
          && vm.isEmail(vm.contactFormModel.email) ){
          vm.$refs.btnSubmit.doAnimate();
        }
        
      },
      formSubmitted() {

        let vm = this;

        setTimeout(() => {
          vm.showSubmitButton = false;
        }, 2500)

        setTimeout(() => {
          vm.showThankyou = true;
        }, 1000)

        vm.transformContactForm();
      },
      browseAllWorks() {

        let vm = this;
        setTimeout(() => {
          vm.browseAllBtnBgColor = 'transparent';
        }, 400)
        setTimeout(() => {
          vm.listAllShowCase = true;
          vm.didShowMoreWork = false;
        }, 3500)

      },
      initcontactFormModel() {
        let vm = this;
        let contactForm = vm.$refs.contactForm;
        var openTrigger = $('.menu-trigger', contactForm);
        var openTriggerTop = openTrigger.find('.menu-trigger-bar.top', contactForm);
        var openTriggerMiddle = openTrigger.find('.menu-trigger-bar.middle', contactForm);
        var openTriggerBottom = openTrigger.find('.menu-trigger-bar.bottom', contactForm);

        //CLOSE TRIGGER
        var closeTrigger = $('.close-trigger', contactForm);
        var closeTriggerLeft = closeTrigger.find('.close-trigger-bar.left');
        var closeTriggerRight = closeTrigger.find('.close-trigger-bar.right');

        //LOGO
        var logo = $('.logo', contactForm);

        //MENU
        var menuContainer = $('.menu-container', contactForm);
        var menu = $('.menu', contactForm);
        var menuTop = $('.menu-bg.top', contactForm);
        var menuMiddle = $('.menu-bg.middle', contactForm);
        var menuBottom = $('.menu-bg.bottom', contactForm);

        //TL
        var tlOpen = new TimelineMax({paused: true});
        var tlClose = new TimelineMax({paused: true});

        //OPEN TIMELINE
        tlOpen.add("preOpen")
          .to(logo, 0.4, {
            scale: 0.8,
            opacity: 0,
            ease: Power2.easeOut
          }, "preOpen")
          .to(openTriggerTop, 0.4, {
            x: "+80px", y: "-80px", delay: 0.1, ease: Power4.easeIn, onComplete: function () {
              closeTrigger.css('z-index', '25');
            }
          }, "preOpen")
          .to(openTriggerMiddle, 0.4, {
            x: "+=80px", y: "-=80px", ease: Power4.easeIn,
            onComplete: function () {
              openTrigger.css('visibility', 'hidden');
            }
          }, "preOpen")
          .to(openTriggerBottom, 0.4, {
            x: "+=80px", y: "-=80px", delay: 0.2, ease: Power4.easeIn
          }, "preOpen")
          .add("open", "-=0.4")
          .to(menuTop, 0.8, {
            y: "20%",
            ease: Power4.easeInOut
          }, "open")
          .to(menuMiddle, 0.8, {
            scaleY: 1,
            ease: Power4.easeInOut
          }, "open")
          .to(menuBottom, 0.8, {
            y: "-120%",
            ease: Power4.easeInOut
          }, "open")
          .fromTo(menu, 0.6, {
            y: 30, opacity: 0, visibility: 'hidden'
          }, {
            y: 0, opacity: 1, visibility: 'visible', ease: Power4.easeOut
          }, "-=0.2")
          .add("preClose", "-=0.8")
          .to(closeTriggerLeft, 0.8, {
            x: "-=100px", y: "+=100px", ease: Power4.easeOut
          }, "preClose")
          .to(closeTriggerRight, 0.8, {
            x: "+=100px", y: "+=100px", delay: 0.2, ease: Power4.easeOut
          }, "preClose");

//CLOSE TIMELINE
        tlClose.add("close")
          .to(menuTop, 0.2, {
            backgroundColor: "#6295ca", ease: Power4.easeInOut, onComplete: function () {
              logo.css('z-index', '26');
              closeTrigger.css('z-index', '5');
              openTrigger.css('visibility', 'visible');
            }
          }, "close")
          .to(menuMiddle, 0.2, {
            backgroundColor: "#6295ca", ease: Power4.easeInOut
          }, "close")
          .to(menuBottom, 0.2, {
            backgroundColor: "#6295ca", ease: Power4.easeInOut
          }, "close")
          .to(menu, 0.6, {
            y: 20, opacity: 0, ease: Power4.easeOut, onComplete: function () {
              menu.css('visibility', 'hidden');
            }
          }, "close")
          .to(logo, 0.8, {
            scale: 1, opacity: 1, ease: Power4.easeInOut
          }, "close", "+=0.2")
          .to(menuTop, 0.8, {
            y: "-130%",
            ease: Power4.easeInOut
          }, "close", "+=0.2")
          .to(menuMiddle, 0.8, {
            scaleY: 0,
            ease: Power4.easeInOut
          }, "close", "+=0.2")
          .to(menuBottom, 0.8, {
            y: "23%",
            ease: Power4.easeInOut,
            onComplete: function () {
              menuTop.css('background-color', 'rgba(0, 0, 0, 0.1)');
              menuMiddle.css('background-color', 'rgba(0, 0, 0, 0.1)');
              menuBottom.css('background-color', 'rgba(0, 0, 0, 0.1)');
            }
          }, "close", "+=0.2")
          .to(closeTriggerLeft, 0.2, {
            x: "+=100px", y: "-=100px", ease: Power4.easeIn
          }, "close")
          .to(closeTriggerRight, 0.2, {
            x: "-=100px", y: "-=100px", delay: 0.1, ease: Power4.easeIn
          }, "close")
          .to(openTriggerTop, 1, {
            x: "-=80px", y: "+=80px", delay: 0.2, ease: Power4.easeOut
          }, "close")
          .to(openTriggerMiddle, 1, {
            x: "-=80px", y: "+=80px", ease: Power4.easeOut
          }, "close")
          .to(openTriggerBottom, 1, {
            x: "-=80px", y: "+=80px", delay: 0.1, ease: Power4.easeOut
          }, "close");

//EVENTS
        openTrigger.on('click', function () {
          if (tlOpen.progress() < 1) {
            tlOpen.play();
          } else {
            tlOpen.restart();
          }
        });
        tlOpen.play();

        //vm.transformContactForm();

        closeTrigger.on('click', function () {
          if (tlClose.progress() < 1) {
            tlClose.play();
          } else {
            tlClose.restart();
          }
        });
      },
      transformContactForm(){
        let vm = this;
        let contactForm = vm.$refs.contactForm;

        TweenMax.to($('.js-contact-fields', contactForm), .2, {scale: 1.1})
        TweenMax.fromTo($('.js-contact-fields', contactForm), 5, {scale: 1.1}, {scale: 0, rotation: 360, ease:Quad.easeInOut, visibility: 'hidden'})

        /*console.log($('.menu-container', contactForm).length);
        MorphSVGPlugin.convertToPath($('.menu-container', contactForm));
        TweenLite.to($('.menu-container', contactForm), 2, {morphSVG:"240,220 240,70 70,70 70,220"});*/
      },
      hideLoader() {
        let vm = this;

        // hide loader
        let loadingContainerEl = vm.$el.querySelector('#loading-container'); // document.getElementById("green");
        TweenMax.fromTo(loadingContainerEl, 1, {
          autoAlpha: 1
        }, {
          autoAlpha: 0,
          ease: Power4.easeOut,
          onComplete: () => {
            //vm.showLoader = false;

            vm.initHomePage();
            vm.showReadyContent();
          }
        });


        //vm.initHomePage();
        //vm.showReadyContent();

      },
      showReadyContent() {
        let vm = this;
        // show ready content page
        let layoutBodyEl = vm.$el.querySelector('#layout-body'); // document.getElementById("green");
        vm.showContent = true;
        const tl = new TimelineMax({
          onComplete: () => {

          }
        })

        /*tl.set(layoutBodyEl, {
          x: window.innerWidth * 1.5,
          scale: 0.8,
          transformOrigin: '50% 50%'
        })

        tl.to(layoutBodyEl, .5, {
          x: 0,
          ease: Power4.easeOut
        });*/

        tl.to(layoutBodyEl, .5, {
          scale: 1,
          ease: Power4.easeOut
        });
      }
    },
    components: {LayoutSolidState, TypingTextTransition, ScienceSlider, ParticleButton, CustomLoader, WelcomeText},
    mounted() {
      let vm = this;
      /*setTimeout(() => {
        vm.loadingPage = false;
      }, 5000)
      TweenMax.to([loadingContainerEl], 3, {top:'-=100%', zIndex: '999', onComplete: vm.initHomePage});*/

      $('body').css('overflow', 'hidden');
      setTimeout(() => {
        vm.hideLoader();
      }, 2000)


    }
  }
</script>

<style lang="scss">
  /*@import '~compass-mixins/lib/_compass.scss';
  .thank-you-submit{
    @include transition(display 2s 2s, visibility 2s);
  }*/

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

  .contact-form-container {
    $black-100: rgba(0, 0, 0, 1);
    $black-90: rgba(0, 0, 0, 0.9);
    $black-80: rgba(0, 0, 0, 0.8);
    $black-70: rgba(0, 0, 0, 0.7);
    $black-60: rgba(0, 0, 0, 0.6);
    $black-50: rgba(0, 0, 0, 0.5);
    $black-40: rgba(0, 0, 0, 0.4);
    $black-30: rgba(0, 0, 0, 0.3);
    $black-20: rgba(0, 0, 0, 0.2);
    $black-10: rgba(0, 0, 0, 0.1);

    //White
    $white-100: rgba(255, 255, 255, 1);
    $white-90: rgba(255, 255, 255, 0.9);
    $white-80: rgba(255, 255, 255, 0.8);
    $white-70: rgba(255, 255, 255, 0.7);
    $white-60: rgba(255, 255, 255, 0.6);
    $white-50: rgba(255, 255, 255, 0.5);
    $white-40: rgba(255, 255, 255, 0.4);
    $white-30: rgba(255, 255, 255, 0.3);
    $white-20: rgba(255, 255, 255, 0.2);
    $white-10: rgba(255, 255, 255, 0.1);

    $blaze-orange: #FF6600;

    //Invisible
    $transparent: rgba(255, 255, 255, 0);

    //COLORS
    $light-grey: #e0dfe1;
    $light-grey-A: #f0f0f0;
    $grey: #9f9e9f;
    $dark-grey: #222222;
    $white: #ffffff;
    $blue: #0190ec;

    //BMW
    $light-blue: #6295ca;
    $dark-blue: #13274c;
    $red: #d1253b;

    //ANIMATIONS stuff
    $hover: all 0.2s ease-in;
    $slide: all 0.3s cubic-bezier(.55, 0, .1, 1);
    $slide-delay: all 0.4s 0.1s cubic-bezier(.55, 0, .1, 1);
    $slide-slow: all 0.5s cubic-bezier(.55, 0, .1, 1);
    $zoom: all 1s cubic-bezier(.55, 0, .1, 1);
    $zoom-slow: all 2.4s cubic-bezier(.55, 0, .1, 1);
    //MIXINS
    // ADDS A BROWSER PREFIX TO THE PROPERTY
    @mixin css3-prefix($property, $value) {
      -webkit-#{$property}: #{$value};
      -khtml-#{$property}: #{$value};
      -moz-#{$property}: #{$value};
      -ms-#{$property}: #{$value};
      -o-#{$property}: #{$value};
      #{$property}: #{$value};
    }
    // TRANSFORM
    @mixin transform($params) {
      @include css3-prefix('transform', $params);
    }

    background-color: $dark-grey;
    margin: 0 auto;
    width: 100%;
    /*max-width: 320px;*/
    min-height: 700px;
    margin: 0 auto;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: 0px 9px 13px 0px $black-30;
    -moz-box-shadow: 0px 9px 13px 0px $black-30;
    box-shadow: 0px 9px 13px 0px $black-30;
    -webkit-transform: scale(1);

    .menu-trigger, .close-trigger {
      position: absolute;
      top: 32px;
      right: 20px;
      display: block;
      width: 42px;
      height: 42px;
      cursor: pointer;
      z-index: 333;

      &:hover {
        .menu-trigger-bar {
          &:before {
            width: 100%;
          }
        }

        .close-trigger-bar {
          &:before {
            width: 100%;
          }
        }
      }
    }

    .close-trigger {
      z-index: 5;
      top: 42px;
    }

    .menu-trigger-bar {
      display: block;
      width: 100%;
      height: 4px;
      background-color: $white-100;
      margin-bottom: 6px;
      transform: rotate(-45deg);
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 0%;
        height: 100%;
        background-color: $black-20;
        transition: $slide;
      }

      &.top {
        width: 50%;
      }
      &.middle {
        &:before {
          left: auto;
          right: 0;
        }
      }
      &.bottom {
        width: 50%;
        margin-left: 50%;
      }
    }

    .close-trigger-bar {
      display: block;
      width: 100%;
      height: 4px;
      background-color: $dark-grey;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 0%;
        height: 100%;
        background-color: $white-20;
        transition: $slide;
      }

      &.left {
        transform: translateX(100px) translateY(-100px) rotate(-45deg);
      }
      &.right {
        transform: translateX(-100px) translateY(-100px) rotate(45deg);
        top: -3px;
      }
    }

    .logo {
      display: block;
      width: 64px;
      height: 64px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -52px;
      margin-left: -32px;
      text-align: center;
      z-index: 10;

      span {
        display: block;
        text-align: center;
        line-height: 62px;
        font-size: 72px;
        color: $white-100;
      }
    }

    .logo-title {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
      height: 100%;
      color: $dark-grey;
      font-size: 32px;
      line-height: 82px;
    }
    .logo-badge {
      position: absolute;
      display: block;
      width: 24px;
      height: 24px;
      top: 6px;
      right: -6px;
      border-radius: 100%;
      background-color: $light-blue;
      font-size: 12px;
      line-height: 2;
      text-align: center;
    }

    .inner-container, .menu-container {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }

    .inner-container {
      z-index: 20;
    }
    .menu-container {
      display: flex;
      align-items: center;
    }
    .menu {
      display: block;
      width: 100%;
    }

    .menu-bg {
      position: absolute;
      display: block;
      width: 200%;
      left: -53%;
      top: -25%;
      //top: -25%;
      height: 75%;
      background-color: $black-10;

      &.middle {
        top: 25%;
        left: -50%;
        transform: rotate(-45deg) scaleY(0);
      }
      &.top {
        left: -50%;
        top: -5%;
        transform: rotate(-45deg) translateY(-156%);
        //top: -25%;
      }
      &.bottom {
        //bottom: 0;
        top: 100%;
        transform: rotate(-45deg) translateY(35%);
        left: -5%;
      }
    }

    .valid-err-msg{display: none}

    .error{
      input, textarea{
        border-color: $blaze-orange;
      }
      .valid-err-msg{display: block}
    }

  }

  textarea{
    resize: none;
  }
</style>