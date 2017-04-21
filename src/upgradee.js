"use strict";
var _this = this;
exports.__esModule = true;
(function () {
    'use strict';
}());
var request = require('request');
var storage = require('electron-json-storage');
var perference = require('./preference.js');
var api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
var get_url = 'http://localhost:8080/upgradeE/server/requests/getTips.php';
var post_url = 'http://localhost:8080/upgradeE/server/requests/pushTips.php';
var playstat = (function () {
    function playstat(id, name) {
        this.id = id + '';
        this.name = name;
    }
    playstat.prototype.getNear = function () {
        return this.near;
    };
    playstat.prototype.setNear = function (near) {
        this.near = near;
    };
    playstat.prototype.getRecent = function (fun, err) {
        var url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + this.id + '/recent?api_key=' + api_key;
        request(url, function (error, response, data) {
        });
    };
    return playstat;
}());
exports.playstat = playstat;
exports.nodefunctions = {
    getTips: function (domain, oppo, fun) {
        var url = get_url + '?domain=' + domain + '&oppo=' + oppo;
        request(url, function (error, response, data) {
            if (!error) {
                data = JSON.parse(data);
                fun(data);
            }
            else {
                throw error;
            }
        });
    },
    postTips: function (domain, side, content, fun) {
        request.post({
            url: post_url,
            form: {
                'domain': domain,
                'side': side,
                'content': content
            }
        }, function (err, httpResponse, body) {
            if (err)
                throw err;
            body = JSON.parse(body);
            fun(body);
        });
    },
    returnJson: function (error, response, data, fun, err) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(data);
            fun(data);
        }
        else {
            err(response.statusCode);
            console.log(response.statusCode);
        }
    },
    getCurrent: function (id, fun, err) {
        var url = 'https://na.api.riotgames.com/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
            else {
                err(response.statusCode);
                console.log(response.statusCode);
            }
        });
    },
    smallest: function (array) {
        var smalllest = array[0];
        var pointer = 0;
        for (var i = 1; i < array.length; i++) {
            if (array[i] < smalllest) {
                smalllest = array[i];
                pointer = i;
            }
        }
        return pointer;
    },
    getSummonerId: function (id, fun, errors) {
        var url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                _this.near = data;
                fun(data, id);
                console.log('From GetSummonerId<-Upgradee.ts: ' + id);
            }
            else {
                errors(response.statusCode);
                console.log('From GetSummonerId<-Upgradee.ts: ' + response.statusCode);
            }
        });
    },
    analysisNear: function (near, miao) {
        var people = [[], []];
        var ids = [[], []];
        var result = [[], []];
        var participants = near['participants'];
        for (var i = 0; i < participants.length; i++) {
            var champid = participants[i]['championId'];
            var summorskill = [participants[i]['spell1Id'], participants[i]['spell2Id']];
            var lane = perference.getlane(champid);
            for (var j = 0; j < summorskill.length; j++) {
                lane = perference.weightspell(summorskill[j], lane);
            }
            if (participants[i]['teamId'] == 100) {
                people[0].push(lane);
                ids[0].push(champid);
            }
            else {
                people[1].push(lane);
                ids[1].push(champid);
            }
        }
        for (var i = 0; i < people.length; i++) {
            for (var j = 0; j < people[i].length; j++) {
                var ar = [];
                for (var k = 0; k < people[i].length; k++) {
                    ar.push(people[i][k][j]);
                }
                result[i].push(perference.getChampName(ids[i][exports.nodefunctions.smallest(ar)]));
                people[i][exports.nodefunctions.smallest(ar)] = [6, 6, 6, 6, 2.5];
            }
        }
        var temp = [];
        for (var i = 0; i < participants.length; i++) {
            if (participants[i].summonerName.replace(/\s+/g, "").toLowerCase() == miao) {
                temp.push(participants[i]);
                i = 10;
            }
        }
        var ourTeamId = temp[0].teamId;
        var oppoTeamId = (ourTeamId == 100) ? 200 : 100;
        var ourResultcount = (ourTeamId == 100) ? 0 : 1;
        var TheirResultcount = (ourTeamId == 100) ? 1 : 0;
        var theirChampName = '';
        for (var i = 0; i < result[ourResultcount].length; i++) {
            if (perference.getChampName(temp[0].championId) == result[ourResultcount][i]) {
                theirChampName = result[TheirResultcount][i];
                i = 10;
            }
        }
        for (var i = 0; i < participants.length; i++) {
            if (participants[i].teamId == oppoTeamId) {
                if (perference.getChampName(participants[i].championId) == theirChampName) {
                    temp.push(participants[i]);
                    i = 10;
                }
            }
        }
        var real = [result, temp];
        return real;
    }
};
module.exports = { nodefunctions: exports.nodefunctions, playstat: playstat };
