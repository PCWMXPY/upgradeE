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
                riotapi.make(data, () => { });
                console.log(data);
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
                    main.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                }
            });
        }
    }
})
