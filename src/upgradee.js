(function () {
    'use strict';
}());
var request = require('request');
var api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
// console.log(request);
var playstat = (function () {
    function playstat(id) {
        this.id = id + '';
    }
    playstat.prototype.getCurrent = function (fun) {
        var url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + this.id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
        });
    };
    playstat.prototype.getRecent = function (fun) {
        var url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + this.id + '/recent?api_key=' + api_key;
        request(url, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
            else {
                console.log(response.statusCode);
            }
        });
    };
    return playstat;
}());
var nodefunctions = {
    getSummonerId: function (id, fun) {
        var url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
        });
    }
};
nodefunctions.getSummonerId('mascotmiao', function (data) {
    console.log(data);
    var miao = new playstat(data.id);
    miao.getRecent(function (data) {
        console.log(data);
    });
});
// nodefunctions.getGame('50576112', (data2) => {
//     console.log(data2);
// }) 
