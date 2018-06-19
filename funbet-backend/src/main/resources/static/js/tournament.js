var tournaments = new Vue({
        el: '#tournament-list',
        data: {
          tournaments: [],
          tournament: {
            name: null,
            defaultMoneyBet: 10000
          },
          selectedUser: [],
          selectedMatch: []
        },
        mounted()
        {
          axios.get("/tournament").then(response => {
            this.tournaments = response.data;
            if(this.tournaments.length == 1)
               {
                    this.showTournamentDetail(this.tournaments[0]);
               }
          })
        },
        methods:
        {
            showTournamentDetail: function($tournament)
            {
                //show match section
                matches.showMatches = true;
                //show report section
                userReport.showReport = true;
                userReport.tournament = $tournament;
                matches.tournament = $tournament;
                var url = '/tournament/' + $tournament.id + '/match/bet';
                 axios.get(url).then(response => {
                    matches.matches = response.data;
                    matches.matches.map(item => {
                        Vue.set(item, 'enableModified', item.enableModified);
                        Vue.set(item, 'needChooseTeam', false);
                    });
                  })
                  var teamUrl = '/tournament/' + $tournament.id + '/match';
                   axios.get(teamUrl).then(response => {
                      userReport.matches = response.data;
                 });

                  axios.get("/user").then(response => {
                    userReport.users = response.data
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
      showMatches: false,
      currentMatch: {
            matchId: null,
            teamId1: null,
          teamId2: null,
          betScore1: null,
          betScore2: null,
          startTime: null,
          moneyBet: null,
          selectedTeamId: null
      }
    },
    methods:
    {
        showSelectedTeam: function(_match)
        {
            Vue.set(_match, 'needChooseTeam', !_match.needChooseTeam);
        },
        saveSelectedTeam: function(_match)
        {
            var url = "/match/" + _match.matchId + "/team/" + _match.selectedTeamId + "/bet";
            axios.put(url).then(response => {
                alert('DONE');
                if(_match.selectedTeamId == _match.teamId1)
                    _match.selectedTeamName = _match.teamName1;
                else
                    _match.selectedTeamName = _match.teamName2;

            }).catch(function(e){
                alert(e.response.data);
            }).finally(() => {
                Vue.set(_match, 'needChooseTeam', false);
            });
        },
        seeAll: function()
        {

        }
    }
});

var userReport = new Vue({
    el: "#match-user-board",
    data: {
        matchRows: [],
        matchHeaders: [],
        showReport: false,
        users: [],
        matches: [],
        selectedUsers: [],
        selectedMatches: [],
        tournament: null
    },
    mounted()
            {
                          /*
                var body = {
                           	"userIds": [2,3],
                           	"matchIds": [1,3]
                           };
              axios.post("/match/tableboard", body).then(response => {
                this.matchRows = response.data.rows;
                this.matchHeaders = response.data.headers;
              })*/
            },
    methods: {
        buildReportDashboard: function(event){
            var body = {
                "userIds": this.selectedUsers,
                "matchIds": this.selectedMatches
               };
              axios.post("/match/tableboard", body).then(response => {
                this.matchRows = response.data.rows;
                this.matchHeaders = response.data.headers;
              })
        }
    }

});