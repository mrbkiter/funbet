<template>
    <div>


        <el-row :gutter="5">
            <el-col :sm="{span: 8, offset: 16}" :md="{span: 6, offset: 18}" :lg="{span: 6, offset: 20}">
                <el-button type="primary" icon="el-icon-edit mr-5" @click="showProfile()">{{profile.name}}</el-button>
                <el-button type="warning" icon="ti-power-off mr-5" @click="logOut()">Logout</el-button>
            </el-col>
        </el-row>

        <div v-if="isShowProfile == true">
            <label>Name: <input type="text" v-model="profile.name" placeholder="Full Name"/> </label>
            <label>Email: <input type="email" v-model="profile.email" placeholder="email"/></label>
            <label>Password: <input type="password" v-model="profile.password" placeholder="password"></label>
            <button @click="saveProfile()">Save Profile</button>
        </div>
        <br/>

    </div>
</template>

<script>
  //import * as _ from 'lodash';
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
      saveProfile(event) {
        axios.put("/user/loggingUser", this.profile).then(response => {
          console.log("done update profile");
          this.isShowProfile = !this.isShowProfile;

        }).catch(function (e) {
          alert(e);
        })
      }
    }
  }
</script>

<style lang="scss">

</style>