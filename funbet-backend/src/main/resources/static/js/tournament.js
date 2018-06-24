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
                //show recent match only
                matches.showRecentMatches(null);
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
      },
      selectedMatches: []
    },
    methods:
    {
        showRecentMatches: function(event)
        {
            this.showMatchesInTournament(true);
        },
        showAllMatches: function(event)
        {
            this.showMatchesInTournament(false);
        },
        showMatchesInTournament: function(recent)
        {
            var url = '/tournament/' + this.tournament.id + '/match/bet';
            if(recent)
                url = '/tournament/' + this.tournament.id + '/match/recent/bet';
             axios.get(url).then(response => {
                this.matches = response.data;
                this.matches.map(item => {
                    Vue.set(item, 'editable', item.editable);
                    Vue.set(item, 'needChooseTeam', false);
                });
              })
        },
        showSelectedTeam: function(_match)
        {
            Vue.set(_match, 'needChooseTeam', !_match.needChooseTeam);
        },
        saveSelectedTeam: function(_match)
        {
            var url = "/match/" + _match.matchId + "/team/" + _match.selectedTeamId + "/bet";
            axios.put(url).then(response => {
                if(_match.selectedTeamId == _match.teamId1)
                    _match.selectedTeamName = _match.teamName1;
                else
                    _match.selectedTeamName = _match.teamName2;

            }).catch(function(e){
                alert(e.response.data);
            }).finally(() => {
                Vue.set(_match, 'needChooseTeam', false);
            });
        }
    },
    computed: {
                selectAllMatches: {
                    get: function () {
                        return this.matches ? this.selectedMatches.length == this.matches.length : false;
                    },
                    set: function (value) {
                        var selectedMatches = [];

                        if (value) {
                            this.matches.forEach(function (m) {
                                selectedMatches.push(m.matchId);
                            });
                        }

                        this.selectedMatches = selectedMatches;
                    }
                }
            }
        }
    );

var userReport = new Vue({
    el: "#match-user-board",
    data: {
        matchReport: {
            matchRows: [],
            matchHeaders: []
        },
        showReport: false,
        users: [],
        matches: [],
        selectedUsers: [],
        selectedMatches: [],
        tournament: null,
        financeReport: [],
        loggedInUser: null
    },
    mounted()
    {
        axios.get("/user/loggedInUser").then(response => {
            this.loggedInUser = response.data;
        });

    },
    methods: {
        showAddFee: function(row)
        {
            row.enableAddFee == undefined ? Vue.set(row, 'enableAddFee', true)
            : Vue.set(row, 'enableAddFee', !row.enableAddFee);
        },
        saveFee: function(row)
        {
            row.enableAddFee = !row.enableAddFee;
            var body = {
                fee: row.fee,
                note: row.note
            };

            var url = '/tournament/' + this.tournament.id + '/finance/user/'
            + row.userId + '/fee';
            axios.post(url, body).then(response => {
                this.buildFinanceReport();
            });
        },
        clearFee: function(row)
        {
            var url = '/tournament/' + this.tournament.id + '/finance/user/'
                        + row.userId + '/fee/clear';
                        axios.put(url).then(response => {
                            this.buildFinanceReport();
                        });
        },
        buildReportDashboard: function(event){
            this.selectedMatches = matches.selectedMatches;
            var body = {
                "userIds": this.selectedUsers,
                "matchIds": this.selectedMatches
               };
              axios.post("/report/tableboard", body).then(response => {
                this.matchReport.matchRows = response.data.rows;
                this.matchReport.matchHeaders = response.data.headers;
              });
              this.buildFinanceReport();
        },
        buildFinanceReport()
        {
            var url = '/tournament/' + this.tournament.id + '/finance/report';
                          axios.post(url, this.selectedUsers).then(response => {
                            this.financeReport = response.data;
                            this.financeReport.reports.forEach(function(r) {
                                Vue.set(r, 'fee', 0);
                                Vue.set(r, 'note', '');
                            });
                          })
        },
        clearAllDebt: function(event) {
            var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
            axios.put(url, this.selectedUsers).then(response =>
            {
                this.buildFinanceReport();
            }).catch(function(e){
                alert(e.response.data);
            });
        },
        clearDebt: function(userId)
        {
            var body = [
                userId
            ];

            var url = '/tournament/' + this.tournament.id + '/finance/debt/clear';
            axios.put(url, body).then(response =>
            {
                this.buildFinanceReport();
            }).catch(function(e){
                alert(e.response.data);
            });
        }
    },
     computed: {
            selectAllUsers: {
                get: function () {
                    return this.users ? this.selectedUsers.length == this.users.length : false;
                },
                set: function (value) {
                    var selectedUsers = [];

                    if (value) {
                        this.users.forEach(function (user) {
                            selectedUsers.push(user.id);
                        });
                    }

                    this.selectedUsers = selectedUsers;
                }
            }
        }

});