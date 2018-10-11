var teams = new Vue({
        el: '#team-list',
        data: {
          teams: [],
          name: null,
        },
        mounted()
        {
          axios.get("/team").then(response => {
            this.teams = response.data
          })
        },
        methods:
        {
            saveTeam: function(event)
            {
                var body = {
                   name: this.name
                };

                axios.post("/team", body).then(response => {
                    teams.teams.push(response.data);
                      }
                 ).catch(function(e)
                 {
                    alert(e),
                    console.log(e)
                 })
            },
            deleteTeam: function(id, index)
            {
                var url = "/team/" + id;
                axios.delete(url).then(response => {
                    teams.teams.splice(index, 1);
                }).catch(function(e) {
                    alert(e);
                    console.log(e)
                });
            }
        }
});

