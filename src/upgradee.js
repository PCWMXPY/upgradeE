(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
let request = require('request');
// console.log(request);
const api_key = 'RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023';
const nodefunctions = {
    getSummonerId: (id, fun) => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + id + '?api_key=' + api_key;
        request(url, (error, response, data) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            }
        })
    },
    getGame: (id, fun) => {
        const url = 'https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/' + id + '/recent?api_key=' + api_key;
        request(url, (error, response, data) => {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                fun(data);
            } else {
                console.log(response.statusCode);
            }
        })
    }
}

// nodefunctions.getSummonerId('ponponpatapon', data => {
//     console.log(data);
//     nodefunctions.getGame(data.id, data2 => {
//         console.log(data2);
//     })
// })