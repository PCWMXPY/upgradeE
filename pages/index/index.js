(function () {
    'use strict';
}());
var ipcRenderer = require('electron').ipcRenderer;
var pref = require('../../src/preference.js');
var cdisplay = {
    cn: {
        input: 'upgrad',
        input2: 'eE',
        submit: 'SUBMIT',
        youare: 'You\'re?..'
    }
};
var main = new Vue({
    el: '#main',
    data: {
        test: '',
        display: cdisplay.cn,
        button: false,
        oppoid: '',
        domainid: '',
        newuser: 1,
        mypng: '../../css/favicon.ico',
        oppopng: '../../css/favicon.ico'
    },
    methods: {
        preGet: function () {
            Prefsystem.preLoad(function () {
                main.newuser = 0;
            }, function (data) {
                main.newuser = 1;
                riotapi.make(data, function () {
                    console.log('Index.ts Preget -> Maked:' + data);
                });
                console.log('Index.ts Preget ->: ' + data);
            });
        },
        register: function () {
            ipcRenderer.on('cover-message', function (event, arg) {
                console.log(arg);
                switch (arg) {
                    case 'RAS':
                        main.preGet();
                        break;
                }
            });
            ipcRenderer.send('register', 'mainpage');
        },
        sendSummorid: function () {
            this.button = true;
            riotapi.make(this.test, function () {
                main.newuser = 1;
                main.button = false;
            });
        },
        getGame: function () {
            var _this = this;
            riotapi.find(function (data) {
                if (data != 404) {
                    main.newuser = 2;
                    main.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    _this.oppoid = data[1][1].summonerName;
                    main.domainid = data[1][0].summonerName;
                    main.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, function (data) {
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
});
