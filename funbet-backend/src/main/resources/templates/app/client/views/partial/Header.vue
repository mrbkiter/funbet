<template>
    <div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/logout' }">Logout</el-breadcrumb-item>
            <el-breadcrumb-item @click="showProfile()">Hello {{profile.name}}. Need to update???</el-breadcrumb-item>
        </el-breadcrumb>

        <div v-if="isShowProfile == true">
            <label>Name: <input type="text" v-model="profile.name" placeholder="Full Name"/> </label>
            <label>Email: <input type="email" v-model="profile.email" placeholder="email"/></label>
            <label>Password: <input type="password" v-model="profile.password" placeholder="password"></label>
            <button @click="saveProfile()">Save Profile</button>
        </div>
        <br />

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
            showProfile: function(event)
            {
                this.isShowProfile = !this.isShowProfile;
            },
            saveProfile: function(event)
            {
                axios.put("/user/loggingUser", this.profile).then(response =>
                {
                    console.log("done update profile");
                    this.isShowProfile = !this.isShowProfile;

                }).catch(function(e)
                {
                    alert(e);
                })
            }
        }
    }
</script>

<style lang="scss">

</style>