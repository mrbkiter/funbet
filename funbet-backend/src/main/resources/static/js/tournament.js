var tournaments = new Vue({
        el: '#tournament-list',
        data: {
          tournaments: [],
          name: null,
          default_money_bet: 10000
        },
        mounted()
        {
          axios.get("/tournament").then(response => {
            this.tournaments = response.data
          })
        },
        methods:
        {
            saveTournament: function(event)
            {
                var body = {
                   name: this.name,
                   default_money_bet: this.default_money_bet
                };

                axios.post("/tournament", body).then(response => {
                    tournaments.tournaments.push(body);
                      }
                 ).catch(function(e)
                 {
                    alert(e),
                    console.log(e)
                 })
            }
        }
});

