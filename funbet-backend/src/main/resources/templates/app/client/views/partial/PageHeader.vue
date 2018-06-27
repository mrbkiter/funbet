<template>
    <div>
        <el-row :gutter="5">
            <el-col :sm="{span: 8, offset: 16}" :md="{span: 6, offset: 18}" :lg="{span: 6, offset: 20}">
                <!--<el-button type="primary" icon="el-icon-edit mr-5" @click="showProfile()">{{profile.name}}</el-button>-->
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


                    <el-button slot="reference" type="primary" icon="el-icon-edit mr-5">{{profile.name}}</el-button>
                </el-popover>


                <el-button type="warning" icon="ti-power-off mr-5" @click="logOut()">Logout</el-button>
            </el-col>
        </el-row>


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
        if(
          _.get(vm.profile, 'name', '') == '' ||
          _.get(vm.profile, 'email', '') == '' ||
          _.get(vm.profile, 'password', '') == ''
        ){
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