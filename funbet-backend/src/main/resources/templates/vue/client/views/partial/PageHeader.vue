<template>
    <div class="page-header collapse">
        <div class="nav-container">
            <div class="nav-left">
                <div class="logo"><a href="#/en" class="router-link-active"><img src="" preload="" class="logo-img">
                    <span>FunBet</span></a></div>
                <i class="icon icon-menu nav-icon"></i></div>
            <div class="nav-right">
                <!--<ul class="navbar">
                    <li><a href="#/en/guide/" class="">Guide</a></li>
                    <li><a href="#/en/docs/" class="router-link-active">Component</a></li>
                    <li><a href="#/en/resource/" class="">Resource</a></li>
                </ul>-->
                <div class="btn-logout">
                    <el-popover
                            placement="right"
                            width="400" v-model="isShowProfile"
                            trigger="click">

                        <div class="form-edit pad-10">
                            <el-row class="mb-15">
                                <h3>Update Your Account Settings</h3>
                            </el-row>
                            <el-row class="mb-15">
                                <el-col :span="24">
                                    <el-input placeholder="Full Name (required)" v-model="profile.name" required></el-input>
                                </el-col>
                            </el-row>

                            <el-row class="mb-15">
                                <el-col :span="24">
                                    <input type="email" class="el-input__inner" v-model="profile.email"
                                           placeholder="Email (required)"/>
                                </el-col>
                            </el-row>

                            <el-row class="mb-15">
                                <el-col :span="24">
                                    <input type="password" class="el-input__inner" v-model="profile.password"
                                           placeholder="Login password (required)"/>
                                </el-col>
                            </el-row>

                            <el-button type="success" round @click="saveProfile()">Update</el-button>
                        </div>


                        <el-button slot="reference" icon="el-icon-edit mr-5" plain>{{profile.name}}</el-button>
                    </el-popover>


                    <el-button icon="ti-power-off mr-5" @click="logOut()" plain>Logout</el-button>
                </div>
            </div>
        </div>


        <br/>

    </div>
</template>

<script>
  import * as _ from 'lodash';
  import axios from '@/services/axios.js';

  export default {
    data() {
      let vm = this;
      return {
        profile: {
          name: null,
          email: null,
          password: null
        },
        isShowProfile: false
      }
    },

    mounted() {
      axios.get("/user/loggedInUser").then(response => {
        this.profile = response.data;
      });
    },
    methods: {
      logOut() {
        //this.$router.push('/logout')
        window.location.href = '/logout';
      },
      showProfile(event) {
        this.isShowProfile = !this.isShowProfile;
      },
      saveProfile() {
        let vm = this;
        if (
          _.get(vm.profile, 'name', '') == '' ||
          _.get(vm.profile, 'email', '') == '' ||
          _.get(vm.profile, 'password', '') == ''
        ) {
          vm.$notify.error({
            title: 'Sai tè le',
            message: 'Field nào cũng required hết, vui lòng điền đầy đủ giùm nha.'
          });
          return false;
        }
        axios.put("/user/loggingUser", vm.profile).then(response => {
//          console.log("done update profile");
          vm.isShowProfile = false;

          vm.$notify.success({
            title: 'Success',
            message: 'Your change has been updated successfully'
          });

        }).catch(function (e) {
          alert(e);
        })
      }
    }
  }
</script>

<style lang="scss">

</style>