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
        edit: {
            domain: '',
            categery: '',
            period: '',
            side: '',
            content: ''
        },
        oppochamp: {
            id: 0,
            name: ''
        },
        domainchamp: {
            id: 0,
            name: ''
        },
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
        editchamp: function (side) {
            this.edit.domain = (side == 0) ? this.domainchamp.id : this.oppochamp.id;
            this.edit.categery = 'C';
            this.edit.period = 'E';
            this.edit.side = side;
            this.edit.content = 'EditHere';
            this.newuser = 3;
        },
        sendSummorid: function () {
            this.button = true;
            riotapi.make(this.test, function () {
                main.newuser = 1;
                main.button = false;
            });
        },
        localupdate: function (categery, event) {
            this.edit[categery] = event.srcElement.innerHTML;
        },
        pushedit: function () {
            if (riotapi.ptips(this.edit.domain, this.edit.categery, this.edit.period, this.edit.side, this.edit.content)) {
            }
        },
        getGame: function () {
            var _this = this;
            riotapi.find(function (data) {
                if (data != 404) {
                    _this.newuser = 2;
                    _this.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    _this.domainchamp.name = pref.getChampName(data[1][0].championId);
                    _this.domainchamp.id = data[1][0].championId;
                    _this.oppoid = data[1][1].summonerName;
                    _this.domainid = data[1][0].summonerName;
                    _this.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                    _this.oppochamp.name = pref.getChampName(data[1][1].championId);
                    _this.oppochamp.id = data[1][1].championId;
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, function (data) {
                        console.log(data);
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
