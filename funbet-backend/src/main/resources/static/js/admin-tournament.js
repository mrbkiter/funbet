var tournaments = new Vue({
        el: '#tournament-list',
        data: {
          tournaments: [],
          tournament: {
            name: null,
            defaultMoneyBet: 10000
          }
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
                axios.post("/tournament", this.tournament).then(response => {
                    tournaments.tournaments.push(response.data);
                    }
                 ).catch(function(e)
                 {
                    alert(e),
                    console.log(e)
                 })
            },
            showTournamentDetail: function($tournament)
            {
                matches.showMatches = true;
                matches.tournament = $tournament;
                var url = '/tournament/' + $tournament.id + '/match';
                 axios.get(url).then(response => {
                    matches.matches = response.data
                  })
            }
        }
});

var matches = new Vue({
    el: '#match-detail',
    data:
    {
      tournament: null,
      matches: [],
      teams: [],
      showMatches: false,
      needWriteScore: false,
      currentMatch: {
            id: null,
            teamId1: null,
          teamId2: null,
          betScore1: null,
          betScore2: null,
          startTime: null,
          moneyBet: null
      }
    },
    mounted()
    {
        axios.get("/team").then(response => {
            this.teams = response.data;
         })
         .catch(function(e)
         {
            alert(e),
            console.log(e)
         })
    },
    methods:
    {
        showWriteScore: function(_match)
        {
            this.needWriteScore = true;
        },
        writeScore: function(_match)
        {
            var url = "/match/" + _match.id + "/score";
            var body = {
               "score1": _match.score1,
               "score2": _match.score2
            };
            axios.put(url, body).then(response => {
                alert('DONE');
                this.needWriteScore = false;
            }).catch(function(e){
                alert(e);
            });
        },
        editMatch: function(_match)
        {
            this.currentMatch = _match;
        },
        deleteMatch: function(_match, index)
        {
            var url = "/match/" + _match.id;
            axios.delete(url).then(response => {
                alert("DONE");
                matches.matches.splice(index, 1);
            }).catch(function(e) {
                alert(e);
                console.log(e)
            });
        },
        saveMatch: function(event)
        {
            var url = '/tournament/' + this.tournament.id + '/match';
            //collect body
            axios.post(url, this.currentMatch).then(response => {
                if(this.currentMatch.id == null) //create new. Need push
                    matches.matches.push(response.data);
            })
            .catch(function(e)
             {
                alert(e),
                console.log(e)
             })
        }
    }
})