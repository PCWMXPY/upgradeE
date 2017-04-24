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
            counter: '',
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
        selchampn: '',
        mypng: '../../css/favicon.ico',
        oppopng: '../../css/favicon.ico'
    },
    computed: {
        selectedchampname: function () {
            return pref.getChampName(parseInt(this.edit.domain));
        }
    },
    methods: {
        preGet: function () {
            this.stopeverything();
            Prefsystem.preLoad(function () {
                main.newuser = 0;
                Prefsystem.resetTitle();
            }, function (data) {
                main.newuser = 1;
                riotapi.make(data, function () {
                }, function () {
                });
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
            }, function () {
                main.button = false;
            });
        },
        localupdate: function (categery, event) {
            this.edit[categery] = event.srcElement.innerHTML;
        },
        pushedit: function () {
            console.log(this.edit);
        },
        updatetips: function () {
            var date = new Date();
            var gametime = (date.getTime() - this.data2.starttime) / 60000;
            var re = [];
            this.stopeverything();
            if (gametime < 40) {
                var t = (40 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(function () {
                    main.doupdate(40);
                }, t));
            }
            else {
                main.doupdate(40);
                return re;
            }
            if (gametime < 30) {
                var t = (30 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(function () {
                    main.doupdate(30);
                }, t));
            }
            else {
                main.doupdate(30);
                return re;
            }
            if (gametime < 20) {
                var t = (20 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(function () {
                    main.doupdate(20);
                }, t));
            }
            else {
                main.doupdate(20);
                return re;
            }
            if (gametime < 10) {
                var t = (10 - gametime) * 60000;
                re.push(t);
                main.doupdate(0);
                this.stopper.push(setTimeout(function () {
                    main.doupdate(10);
                }, t));
            }
            else {
                main.doupdate(10);
                return re;
            }
            return re;
        },
        doupdate: function (period) {
            switch (period) {
                case 0:
                    this.gameperiod = 'In Lane:';
                    display('L');
                    break;
                case 10:
                    this.gameperiod = 'In Early Game:';
                    display('E');
                    break;
                case 20:
                    this.gameperiod = 'In Middle Game:';
                    display('M');
                    break;
                case 30:
                    this.gameperiod = 'In Late Game:';
                    display('A');
                    break;
                case 40:
                    this.gameperiod = 'In REALLY Late Game:';
                    display('R');
                    break;
            }
            function display(time) {
                for (var i = 0; i < main.vars.domain[time].length; i++) {
                    if (main.vars.domain[time][i].substring(0, 1) == main.data2.position || main.data2.position == 'A') {
                        main.tips.domain.push(main.vars.domain[time][i].substring(1, main.vars.domain[time][i].length));
                    }
                    else if (main.vars.domain[time][i].substring(0, 1) == 'B' && (main.data2.position == 'S' || main.data2.position == 'D')) {
                        main.tips.domain.push(main.vars.domain[time][i].substring(1, main.vars.domain[time][i].length));
                    }
                }
                for (var i = 0; i < main.vars.oppo[time].length; i++) {
                    if (main.vars.oppo[time][i].substring(0, 1) == main.data2.position || main.data2.position == 'A') {
                        main.tips.oppo.push(main.vars.oppo[time][i].substring(1, main.vars.oppo[time][i].length));
                    }
                    else if (main.vars.oppo[time][i].substring(0, 1) == 'B' && (main.data2.position == 'S' || main.data2.position == 'D')) {
                        main.tips.oppo.push(main.vars.oppo[time][i].substring(1, main.vars.oppo[time][i].length));
                    }
                }
            }
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
