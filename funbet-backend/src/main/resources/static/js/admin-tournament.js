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
            this.tournaments = response.data;
            if(this.tournaments.length == 1)
            {
                this.showTournamentDetail(this.tournaments[0]);
                this.showBonusDetail(this.tournaments[0]);
            }
          })
        },
        methods:
        {
            saveTournament: function(event)
            {
                axios.post("/tournament", this.tournament).then(response => {

                    tournaments.tournaments.push(response.data);
                 }).catch(function(e)
                 {
                    alert(e),
                    console.log(e)
                 })
            },
            showTournamentDetail: function($tournament)
            {
                matches.showMatches = true;
                matches.tournament = $tournament;
                matches.currentMatch.betMoney = $tournament.defaultMoneyBet;
                var url = '/tournament/' + $tournament.id + '/match';
                 axios.get(url).then(response => {
                    matches.matches = response.data;
                    matches.matches.map(item => {
                        Vue.set(item, 'needWriteScore', false)
                    })
                  })
            },
            showBonusDetail: function($tournament)
            {
                bonuses.showBonusSection = true;
                bonuses.tournament = $tournament;
                var url = '/tournament/' + $tournament.id + '/prediction';
                axios.get(url).then(response => {
                    bonuses.bonuses = response.data;
                    bonuses.bonuses.map(item => {
                        if(item.selectedTeamIds == null)
                            Vue.set(item, 'selectedTeamIds', []);
                    });
                });
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
      currentMatch: {
        id: null,
        teamId1: null,
        teamId2: null,
        betScore1: null,
        betScore2: null,
        startTime: null,
        betMoney: null
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
        showWriteScore: function(_match, index)
        {
            Vue.set(_match, 'needWriteScore', true)
        },
        writeScore: function(_match)
        {
            var url = "/match/" + _match.id + "/score";
            var body = {
               "score1": _match.score1,
               "score2": _match.score2
            };
            axios.put(url, body).then(response => {
                Vue.set(_match, 'needWriteScore', false)
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
                matches.matches.splice(index, 1);
            }).catch(function(e) {
                alert(e.response.data);
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
                alert(e.response.data);
                console.log(e)
             })
        }
    }
});

var bonuses = new Vue({
    el: '#bonus-section',
    data: {
        bonuses: [],
        showBonusSection: false,
        currentBonus: {
            id: null,
            name: null,
            bonusAmount: null,
            endTimestamp: null,
            selectedTeamIds: []
        },
        tournament: null,
        teams: []
    },
    methods: {
        openPredictionAnswerDialog: function($bonus)
        {
            bonuses.teams = matches.teams;
            Vue.set($bonus, 'enableAnswerDialog', !$bonus.enableAnswerDialog);
        },
        savePredictionAnswer: function($bonus)
        {
            var url = '/tournament/prediction/' + $bonus.id + '/answer';
            var body = {
                teamIds: $bonus.selectedTeamIds
            };

            axios.post(url, body).then(response => {
                Vue.set($bonus, 'enableAnswerDialog', !$bonus.enableAnswerDialog);
                $bonus.teamNames = response.data.teamNames;
            }).catch(function(e){
                alert(e.response.data);
            });
        },
        saveBonus: function(event)
        {
            var url = '/tournament/' + this.tournament.id + '/prediction';
            axios.post(url, this.currentBonus).then(response => {
                if(this.currentBonus.id == null)
                {
                   this.currentBonus = response.data;
                   this.bonuses.push(this.currentBonus);
                   this.currentBonus = {
                        id: null,
                        name: null,
                        bonusAmount: null,
                        endTimestamp: null
                   };
                }

            }).catch(function(e){
                alert(e.response.data);
            });
        },
        editBonus: function($bonus)
        {
            this.currentBonus = $bonus;
        }
    }

});