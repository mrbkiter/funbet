var users = new Vue({
        el: '#user-list',
        data: {
          users: [],
          id: null,
          name: null,
          email: null,
          password: null
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
                    id: this.id,
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
            },
            deleteUser: function(row, index)
            {
                axios.delete("/user/" + row.id)
                .then(response =>
                {
                    users.users.splice(index, 1);
                }).catch(function(e)
                {
                   alert(e);
                   console.log(e)
                })
            },
            editUser: function(row)
            {
                this.id = row.id;
                this.name = row.name;
                this.email = row.email;
                this.lock = row.lock;
                this.password = row.password;
            },
            lockUser: function(row)
            {
            var lockVal = (row.lock == null? true : !row.lock);
                var body = {
                    lock: lockVal
                };

                axios.put("/user/" + row.id + "/lock", body)
                                .then(response =>
                                {
                                    row.lock = lockVal;
                                }).catch(function(e)
                                {
                                   alert(e);
                                   console.log(e)
                                })
            }
        }
});

