(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare function require(name: string);
let request = require('request');
let perference = require('./preference.js');
var testjson = require('./test.js');
const api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
// console.log(request);
class playstat {
    private id: string;
    private near: object;
    constructor(id: number) {
        this.id = id + '';
    }
    getNear() {
        return this.near;
    }
    setNear(near: object) {
        this.near = near;
    }
    returnJson(error, response, data, fun: Function) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(data);
            this.near = data;
            fun(data);
        } else {
            console.log(response.statusCode);
        }
    }
    getCurrent(fun: Function) {
        const url = 'https://na.api.riotgames.com/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + this.id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            this.returnJson(error, response, data, fun);
        })
    }
    getRecent(fun: Function) {
        const url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + this.id + '/recent?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            this.returnJson(error, response, data, fun);
        })
    }
    analysisNear() {
        let people = [[], []];
        let participants = this.near['participants'];
        for (let i = 0; i < participants.length; i++) {
            let champid = participants[i]['championId'];
            let summorskill = [participants[i]['spell1Id'], participants[i]['spell2Id']];
            let lane = perference.getlane(champid);
            for (let j = 0; j < summorskill.length; j++) {
                lane = perference.weightspell(summorskill[j], lane);
                console.log(lane);
            }
            if (participants[i]['teamId'] == 100) {
                people[0].push(lane);
            } else {
                people[1].push(lane);
            }
        }
        return people;
    }
}
const nodefunctions = {
    getSummonerId: (id: string, fun: Function) => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            this.returnJson(error, response, data, fun);
        })
    }
}


var miao = new playstat(69802946);
miao.setNear(testjson);
console.log(miao.analysisNear());
// miao.getCurrent((data) => {
//     console.log(data);
// })
