var angularapp = angular.module('myApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when("/record", {
            controller: "recordController",
            templateUrl: "record.html"
        });
        $routeProvider.when("/main", {
            controller: "mainController",
            templateUrl: "main.html"
        });
        $routeProvider.when("/mygame", {
            controller: "mgController",
            templateUrl: "mygame.html"
        });
        $routeProvider.when("/welcome", {
            controller: "WCController",
            templateUrl: "Welcome.html"
        });
    });
angularapp.controller('indexController', function($scope) {

});
angularapp.controller('WCController', function($scope) {

});
angularapp.controller('mgController', function($scope) {
    $scope.SummonerName = "";
    $scope.feature = "";
    $scope.Cnames = "";
    $scope.player = "";
    $scope.messages = ["Game Not Found", "Search Summoner to check out game Analysis", "", ""];
    $scope.request = function() {
        var SName = $scope.SummonerName.replace(" ", "");
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SName + '?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(json) {
                document.getElementById("progressmygame").style.width = "45%";
                var array = $.map(json, function(value, index) {
                    return [value];
                });
                $.ajax({
                    url: 'sendget.php',
                    type: 'GET',
                    data: {
                        'url': 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + array[0].id + '?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023'
                    },
                    success: function(json) {
                        try {
                            document.getElementById("progressmygame").style.width = "85%";
                            json = JSON.parse(json);
                            var temp = [];
                            var ptemp = [];
                            var ftemp = json.gameMode;
                            for (j = 0; j < 10; j++) {
                                var thisplayer = json.participants[j];
                                var Cname = preference.getChampName(thisplayer.championId);
                                var spellid = preference.getSpellName(thisplayer.spell1Id);
                                var spell2id = preference.getSpellName(thisplayer.spell2Id);
                                ptemp.push([spellid, spell2id, thisplayer.summonerName]);
                                temp.push(Cname);
                            }
                            $scope.messages[0] = "Game is Running";
                            $scope.messages[1] = "Game Analysis";
                            $scope.messages[2] = "Game Mode: " + json.gameMode;
                            $scope.messages[3] = "Game Type: " + json.gameType;
                            $scope.$apply(function() {
                                $scope.feature = ftemp;
                                $scope.Cnames = temp;
                                $scope.player = ptemp;
                            });
                            stopcode = setInterval(setTime, 1000);
                            timess = json.gameLength;
                            analysis.ChartF(json.participants);
                            document.getElementById("progressmygame").style.width = "100%";
                        } catch (err) {
                            alert("ERROR: " + err + " \n Server Problem or Name Error \n Please Try again");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("error getting Summoner data!");
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });

    };
});
angularapp.controller('mainController', function($scope) {
    $scope.feature = [];
    $scope.Cnames = [];
    $scope.player = [];
    $scope.gameList = 0;
    $scope.data = [];
    document.getElementById("progressmain").style.width = "25%";
    $.ajax({
        url: 'https://na.api.pvp.net/observer-mode/rest/featured?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function(json) {
            $scope.data = json;
            document.getElementById("progressmain").style.width = "45%";
            var temp = [];
            var ftemp = [];
            var ptemp = [];
            for (i = 0; i < 5; i++) {
                ftemp.push((i + 1) + " - " + json.gameList[i].gameMode);
                temp.push([]);
                ptemp.push([]);
                for (j = 0; j < 10; j++) {
                    var thisplayer = json.gameList[i].participants[j];
                    var Cname = preference.getChampName(thisplayer.championId);
                    var spellid = preference.getSpellName(thisplayer.spell1Id);
                    var spell2id = preference.getSpellName(thisplayer.spell2Id);
                    ptemp[i].push([spellid, spell2id, thisplayer.summonerName]);
                    temp[i].push(Cname);
                }
            }
            $scope.$apply(function() {
                $scope.feature = ftemp;
                $scope.Cnames = temp;
                $scope.player = ptemp;
            });
            stopcode = setInterval(setTime, 1000);
            timess = json.gameList[0].gameLength;
            document.getElementById("progressmain").style.width = "100%";
            analysis.ChartF($scope.data.gameList[$scope.gameList].participants);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data!");
        }
    });
    $scope.switch = function(game) {
        $scope.gameList = game.substring(0, 1) - 1;
        timess = $scope.data.gameList[$scope.gameList].gameLength;
        analysis.ChartF($scope.data.gameList[$scope.gameList].participants);
    };
});
angularapp.controller('recordController', function($scope, $http) {
    $scope.games = [];
    $scope.groups = [];
    $scope.gamelist = 0;
    $scope.switch = function(game) {
        switch (game) {
            case "1-8":
                $scope.gamelist = 0;
                break;
            case "9-16":
                $scope.gamelist = 1;
                break;
            case "17-24":
                $scope.gamelist = 2;
                break;
            case "25-32":
                $scope.gamelist = 3;
                break;
        }
    };
    $scope.message = ["Search for Play Style Stat", ""];
    $scope.request = function() {
        var SName = $scope.SummonerName.replace(" ", "");
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SName + '?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(json) {
                var syccess = false;
                var array = $.map(json, function(value, index) {
                    return [value];
                });
                document.getElementById("progressrecord").style.width = "30%";
                $.ajax({
                    url: 'sendget.php',
                    type: 'GET',
                    data: {
                        'url': 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + array[0].id + '?beginIndex=0&endIndex=32&api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023'
                    },
                    success: function(json) {
                        try {
                            var temp = [];
                            document.getElementById("progressrecord").style.width = "45%";
                            var games = JSON.parse(json).matches;
                            for (j = 0; j < 4; j++) {
                                temp.push([]);
                                for (i = 0; i < 8; i++) {
                                    var Cname = preference.getChampName(games[8 * j + i].champion);
                                    var lane = games[8 * j + i].lane;
                                    temp[j].push([Cname, lane, games[8 * j + i].queue]);
                                }
                            }
                            $scope.$apply(function() {
                                $scope.groups = temp;
                            });
                            analysis.ChartH(games);
                            if (syccess) {
                                document.getElementById("progressrecord").style.width = "100%";
                            } else {
                                document.getElementById("progressrecord").style.width = "70%";
                                syccess = true;
                            }
                        } catch (err) {
                            alert("ERROR: " + err + " \n Server Problem or Name Error \n Please Try again2");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("error getting Summoner data!");
                    }
                });
                $.ajax({
                    url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + array[0].id + '/summary?season=SEASON2016&api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    success: function(json) {
                        try {
                            $scope.message[0] = "Champion Style Stat";
                            $scope.message[1] = "Play Style Stat";
                            analysis.ChartD(json.playerStatSummaries);
                            if (syccess) {
                                document.getElementById("progressrecord").style.width = "100%";
                            } else {
                                document.getElementById("progressrecord").style.width = "70%";
                                syccess = true;
                            }
                        } catch (err) {
                            alert("ERROR: " + err + " \n Server Problem or Name Error \n Please Try again2");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("error getting Summoner data!");
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    };
});
