var users = new Vue({
        el: '#user-list',
        data: {
          users: [],
          name: null,
          email: null
        },
        mounted()
        {
          axios.get("/user").then(response => {
            this.users = response.data
          })
        },
        methods:
        {
            saveUser: function(event)
            {
                var body = {
                   name: this.name,
                   email: this.email,
                   password: this.password
                };

                axios.post("/user", body).then(response => {
                    users.users.push(body);
                      }
                 ).catch(function(e)
                 {
                    alert(e);
                    console.log(e)
                 })
            }
        }
});

