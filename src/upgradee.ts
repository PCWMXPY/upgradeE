(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare function require(name: string);
declare var module: any;
const request = require('request');
const storage = require('electron-json-storage');
const perference = require('./preference.js');
// var exec = require('child_process').exec;
// var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
// const testjson = require('./test.js');

const api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
export class playstat {
    private id: string;
    private name: string;
    private near: object;
    constructor(id: number, name: string) {
        this.id = id + '';
        this.name = name;
    }
    getNear() {
        return this.near;
    }
    setNear(near: object) {
        this.near = near;
    }
    returnJson(error, response, data, fun: Function, err: Function) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(data);
            this.near = data;
            fun(data);
        } else {
            err(response.statusCode);
            console.log(response.statusCode);
        }
    }
    getCurrent(fun: Function, err: Function) {
        const url = 'https://na.api.riotgames.com/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + this.id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            this.returnJson(error, response, data, fun, err);
        })
    }
    getRecent(fun: Function, err: Function) {
        const url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + this.id + '/recent?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            this.returnJson(error, response, data, fun, err);
        })
    }
    analysisNear() {
        //mid,bot,top,sup,jungle
        let people = [[], []];
        let ids = [[], []];
        let result = [[], []];
        let participants = this.near['participants'];
        for (let i = 0; i < participants.length; i++) {
            let champid = participants[i]['championId'];
            let summorskill = [participants[i]['spell1Id'], participants[i]['spell2Id']];
            let lane = perference.getlane(champid);
            for (let j = 0; j < summorskill.length; j++) {
                lane = perference.weightspell(summorskill[j], lane);
            }
            if (participants[i]['teamId'] == 100) {
                people[0].push(lane);
                ids[0].push(champid);
            } else {
                people[1].push(lane);
                ids[1].push(champid);
            }
        }
        for (let i = 0; i < people.length; i++) {
            for (let j = 0; j < people[i].length; j++) {
                let ar = [];
                for (let k = 0; k < people[i].length; k++) {
                    ar.push(people[i][k][j]);
                }
                result[i].push(perference.getChampName(ids[i][nodefunctions.smallest(ar)]));
                people[i][nodefunctions.smallest(ar)] = [6, 6, 6, 6, 2.5];
            }
        }
        let temp = [];
        for (let i = 0; i < participants.length; i++) {
            if (participants[i].summonerName.replace(/\s+/g, "").toLowerCase() == this.name) {
                temp.push(participants[i]);
                i = 10;
            }
        }
        const ourTeamId = temp[0].teamId;
        const oppoTeamId = (ourTeamId == 100) ? 200 : 100;
        const ourResultcount = (ourTeamId == 100) ? 0 : 1;
        const TheirResultcount = (ourTeamId == 100) ? 1 : 0;
        let theirChampName = '';
        for (let i = 0; i < result[ourResultcount].length; i++) {
            if (perference.getChampName(temp[0].championId) == result[ourResultcount][i]) {
                theirChampName = result[TheirResultcount][i];
                i = 10;
            }
        }
        for (let i = 0; i < participants.length; i++) {
            if (participants[i].teamId == oppoTeamId) {
                if (perference.getChampName(participants[i].championId) == theirChampName) {
                    temp.push(participants[i]);
                    i = 10;
                }
            }
        }
        let real = [result, temp];
        return real;
    }
}
export const nodefunctions = {
    smallest: (array) => {
        let smalllest = array[0];
        let pointer = 0;
        for (let i = 1; i < array.length; i++) {
            if (array[i] < smalllest) {
                smalllest = array[i];
                pointer = i;
            }
        }
        return pointer;
    },
    getSummonerId: (id: string, fun: Function) => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                this.near = data;
                fun(data, id);
                console.log(id);
            } else {
                console.log(response.statusCode);
            }
        })
    }
}

// nodefunctions.getSummonerId('kikikiyomi', (data, id) => {
//     var miao = new playstat(data.id, id);
//     miao.getCurrent(data => {
//         console.log(miao.analysisNear());
//     })
// })
// var miao = new playstat(123);
// miao.setNear(testjson);
// nodefunctions.terminal(miao.analysisNear());
module.exports = { nodefunctions, playstat };