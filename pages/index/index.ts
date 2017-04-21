(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare var Vue: any;
declare function require(name: string);
const ipcRenderer = require('electron').ipcRenderer;
const pref = require('../../src/preference.js');
const cdisplay = {
    cn: {
        input: 'upgrad',
        input2: 'eE',
        submit: 'SUBMIT',
        youare: 'You\'re?..'
    }
}
let main = new Vue({
    el: '#main',
    data: {
        test: '',
        display: cdisplay.cn,
        button: false,
        oppoid: '',
        newuser: 1,
        mypng: '../../css/favicon.ico',
        oppopng: '../../css/favicon.ico'
    },
    methods: {
        preGet: function () {
            Prefsystem.preLoad(() => {
                //not exist
                this.newuser = 0;
            }, (data) => {
                //exist
                this.newuser = 1;
                console.log('Index.ts Preget ->: ' + data);
            });
        },
        register: function () {
            ipcRenderer.on('cover-message', (event, arg) => {
                console.log(arg);
                switch (arg) {
                    case 'RAS':
                        main.preGet();
                        break;
                }
            })
            ipcRenderer.send('register', 'mainpage');
        },
        sendSummorid: function () {
            this.button = true;
            riotapi.make(this.test, () => {
                main.preGet();
            });
        },
        getGame: function () {
            riotapi.find((data) => {
                if (data != 404) {
                    main.newuser = 2;
                    main.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    main.oppoid = data[1][1].summonerName;
                    main.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, data => {
                        switch (data[0]) {
                            case 0:
                                break;
                            case 1:
                                break;
                            case 2:
                                break;
                        }
                    });
                }
            });
        }
    }
})
