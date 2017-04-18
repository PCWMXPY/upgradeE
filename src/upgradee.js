var _this = this;
(function () {
    'use strict';
}());
var request = require('request');
var perference = require('./preference.js');
var testjson = require('./test.js');
var api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
// console.log(request);
var playstat = (function () {
    function playstat(id) {
        this.id = id + '';
    }
    playstat.prototype.getNear = function () {
        return this.near;
    };
    playstat.prototype.setNear = function (near) {
        this.near = near;
    };
    playstat.prototype.returnJson = function (error, response, data, fun) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(data);
            this.near = data;
            fun(data);
        }
        else {
            console.log(response.statusCode);
        }
    };
    playstat.prototype.getCurrent = function (fun) {
        var _this = this;
        var url = 'https://na.api.riotgames.com/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + this.id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            _this.returnJson(error, response, data, fun);
        });
    };
    playstat.prototype.getRecent = function (fun) {
        var _this = this;
        var url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + this.id + '/recent?api_key=' + api_key;
        request(url, function (error, response, data) {
            _this.returnJson(error, response, data, fun);
        });
    };
    playstat.prototype.analysisNear = function () {
        var people = [[], []];
        var participants = this.near['participants'];
        for (var i = 0; i < participants.length; i++) {
            var champid = participants[i]['championId'];
            var summorskill = [participants[i]['spell1Id'], participants[i]['spell2Id']];
            var lane = perference.getlane(champid);
            for (var j = 0; j < summorskill.length; j++) {
                lane = perference.weightspell(summorskill[j], lane);
                console.log(lane);
            }
            if (participants[i]['teamId'] == 100) {
                people[0].push(lane);
            }
            else {
                people[1].push(lane);
            }
        }
        return people;
    };
    return playstat;
}());
var nodefunctions = {
    getSummonerId: function (id, fun) {
        var url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            _this.returnJson(error, response, data, fun);
        });
    }
};
var miao = new playstat(69802946);
miao.setNear(testjson);
console.log(miao.analysisNear());
// miao.getCurrent((data) => {
//     console.log(data);
// })
