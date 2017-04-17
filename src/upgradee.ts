(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare function require(name: string);
let request = require('request');
// console.log(request);
const api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
const nodefunctions = {
    getSummonerId: (id: string, fun: Function) => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
        })
    },
    getGame: (id: string, fun: Function) => {
        const url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + id + '/recent?api_key=' + api_key;
        request(url, (error, response, data: string) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            } else {
                console.log(response.statusCode);
            }
        })
    }
}

// nodefunctions.getSummonerId('ezlife13', (data) => {
//     console.log(data);
//     nodefunctions.getGame(data.id, (data2) => {
//         console.log(data2);
//     })
// })