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
        newuser: 1,
        mypng: '../../css/favicon.ico',
        oppopng: '../../css/favicon.ico'
    },
    methods: {
        preGet: function () {
            var _this = this;
            Prefsystem.preLoad(function () {
                _this.newuser = 0;
            }, function (data) {
                _this.newuser = 1;
                riotapi.make(data, function () { });
                console.log(data);
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
                main.preGet();
            });
        },
        getGame: function () {
            riotapi.find(function (data) {
                if (data != 404) {
                    main.newuser = 2;
                    main.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    main.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                }
            });
        }
    }
});
