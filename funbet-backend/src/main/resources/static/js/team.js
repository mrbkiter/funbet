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
                    teams.teams.push(body);
                      }
                 ).catch(function(e)
                 {
                    alert(e),
                    console.log(e)
                 })
            }
        }
});

