var headerBar = new Vue({
    el: "#header-bar",
    data: {
        profile: {
            name: null,
            email: null,
            password: null
        },
        isShowProfile: false
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
});