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
                // console.log(champid);
            } else {
                people[1].push(lane);
                ids[1].push(champid);
            }
        }
        //mid,bot,top,sup,jungle
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
        return result;
    }
}
const nodefunctions = {
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
    terminal: (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                switch (j) {
                    case 0:
                        console.log('Mid:' + array[i][j]);
                        break;
                    case 1:
                        console.log('Bot:' + array[i][j]);
                        break;
                    case 2:
                        console.log('Top:' + array[i][j]);
                        break;
                    case 3:
                        console.log('Sup:' + array[i][j]);
                        break;
                    case 4:
                        console.log('Jungle:' + array[i][j]);
                        break;
                }
            }
        }
    },
    getSummonerId: (id: string, fun: Function) => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                this.near = data;
                fun(data);
            } else {
                console.log(response.statusCode);
            }
        })
    }
}

// nodefunctions.getSummonerId('apollo', (data) => {
//     var miao = new playstat(data.id);
//     miao.getCurrent(data => {
//         console.log(data);
//         console.log(miao.analysisNear());
//     })
//     // console.log(data.id);
// })
var miao = new playstat(123);
miao.setNear(testjson);
nodefunctions.terminal(miao.analysisNear());
// miao.getCurrent((data) => {
//     console.log(data);
// })
