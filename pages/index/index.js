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
        gameperiod: '',
        stopper: [],
        data2: null,
        vars: {
            domain: [],
            oppo: [],
            runes: [],
            Mysterys: []
        },
        tips: {
            domain: [],
            oppo: [],
            runes: [],
            Mysterys: []
        },
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
            this.stopeverything();
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
            this.stopeverything();
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
        updatetips: function () {
            var date = new Date();
            var gametime = (date.getTime() - this.data2.starttime) / 60000;
            console.log(gametime);
            if (gametime < 10) {
                this.gameperiod = 'In Early Game:';
            }
            else if (gametime < 20) {
                this.gameperiod = 'In Middle Game:';
            }
            else if (gametime < 30) {
                this.gameperiod = 'In Late Game:';
            }
            else {
                this.gameperiod = 'In REALLY Late Game:';
            }
            this.stopeverything();
            this.stopper.push(setTimeout(function () {
                main.updatetips();
            }, 3000));
        },
        stopeverything: function () {
            for (var i = 0; i < this.stopper; i++) {
                clearTimeout(this.stopper[i]);
            }
            this.stopper = [];
        },
        getGame: function () {
            var _this = this;
            this.stopeverything();
            riotapi.find(function (data) {
                console.log(data);
                if (data != 404) {
                    _this.newuser = 2;
                    _this.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    _this.domainchamp.name = pref.getChampName(data[1][0].championId);
                    _this.domainchamp.id = data[1][0].championId;
                    _this.data2 = data[2];
                    _this.oppoid = data[1][1].summonerName;
                    _this.domainid = data[1][0].summonerName;
                    _this.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                    _this.oppochamp.name = pref.getChampName(data[1][1].championId);
                    _this.oppochamp.id = data[1][1].championId;
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, function (data) {
                        var fixed = Prefsystem.fixdata(data);
                        main.vars.domain = fixed[0];
                        main.vars.oppo = fixed[1];
                        main.updatetips();
                    });
                }
            });
        }
    }
});
