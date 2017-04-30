(function () {
    'use strict';
}());
var ipcRenderer = require('electron').ipcRenderer;
var shell = require("electron").shell;
var pref = require('../../src/preference.js');
var nav = new Vue({
    el: '#nav',
    data: {
        onscreen: {
            version: {
                int: 0,
                str: ''
            }
        },
        offscreen: {
            version: {
                int: 0,
                emer: 0,
                str: '',
                link: ''
            }
        },
        navbar: [{
                icon: "fa fa-cog",
                text: "偏好设置",
                style: '',
                fun: function () {
                    nav.navbar[0].text = '更高之后';
                }
            }, {
                icon: "fa fa-question",
                text: "获取帮助",
                style: '',
                fun: null
            }, {
                icon: "fa fa-github",
                text: "访问 Github",
                style: '',
                fun: function () {
                    shell.openExternal('https://github.com/PCWMXPY/upgradeE');
                }
            }, {
                icon: "fa fa-bug",
                text: "反馈 Bug",
                style: '',
                fun: function () {
                    shell.openExternal('https://github.com/PCWMXPY/upgradeE/issues/new');
                }
            }],
        extranavbar: []
    },
    methods: {
        test: function () {
            console.log('test');
        }
    }
});
var main = new Vue({
    el: '#main',
    data: {
        page: 'login',
        display: {
            title: null
        },
        user: {
            name: null
        },
        transfer_current: null,
        gameperiod: '',
        stopper: [],
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
        selchampn: ''
    },
    methods: {
        preGet: function () {
            this.stopeverything();
            this.resetdebugdisplay();
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
        switchtoWait: function (title) {
            this.display.title = title;
            nav.extranavbar = [{
                    icon: "fa fa-video-camera",
                    text: "开始游戏",
                    style: '',
                    fun: this.test
                }, {
                    icon: "fa fa-reply-all",
                    text: "重新搜索",
                    style: '',
                    fun: this.test
                }];
            this.page = 'waiting';
        },
        backtoMain: function () {
            this.stopeverything();
            main.newuser = 1;
        },
        register: function () {
            this.stopeverything();
            ipcRenderer.on('cover-message', function (event, arg) {
                console.log(arg);
                switch (arg) {
                    case 'RAS':
                        break;
                    case 'BTM':
                        break;
                }
            });
            ipcRenderer.once('version', function (event, arg) {
                nav.onscreen.version = arg[0];
                nav.offscreen.version = arg[1];
            });
            ipcRenderer.send('register', 'mainpage');
        },
        editchamp: function (side) {
            this.edit.domain = (side == 0) ? this.domainchamp.id : this.oppochamp.id;
            this.edit.categery = 'C';
            this.edit.period = 'E';
            this.edit.counter = 'A';
            this.edit.side = side;
            this.edit.content = 'EditHere';
            this.newuser = 3;
        },
        sendSummorid: function (name, domcontrol) {
            riotapi.make(name.replace(/\s+/g, "").toLowerCase(), function (name) {
                domcontrol(1, name);
            }, function (error) {
                domcontrol(0, null);
            });
        },
        localupdate: function (categery, event) {
            this.edit[categery] = event.srcElement.innerHTML;
        },
        pushedit: function (mode) {
            if (riotapi.ptips(this.edit.domain, this.edit.categery, this.edit.period, this.edit.side, this.edit.content, this.edit.counter)) {
                if (mode == 0) {
                    main.newuser = 2;
                }
                else {
                    main.newuser = 1;
                }
                if (this.edit.side == 0) {
                    this.tips.domain.push('Just Added: ' + this.edit.content);
                }
                else {
                    this.tips.oppo.push('Just Added: ' + this.edit.content);
                }
                this.tips.domain;
            }
            else {
                console.log('error');
            }
        },
        updatetips: function () {
            var date = new Date();
            var gametime = (date.getTime() - this.data2.starttime) / 60000;
            var re = [];
            this.cleanTipsDisplay();
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
                main.displayT('T');
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
                main.displayT('T');
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
                main.displayT('T');
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
                main.displayT('T');
                return re;
            }
            return re;
        },
        doupdate: function (period) {
            switch (period) {
                case 0:
                    this.gameperiod = 'In Lane:';
                    main.displayT('L');
                    break;
                case 10:
                    this.gameperiod = 'In Early Game:';
                    main.displayT('E');
                    break;
                case 20:
                    this.gameperiod = 'In Middle Game:';
                    main.displayT('M');
                    break;
                case 30:
                    this.gameperiod = 'In Late Game:';
                    main.displayT('A');
                    break;
                case 40:
                    this.gameperiod = 'In REALLY Late Game:';
                    main.displayT('R');
                    break;
            }
        },
        displayT: function (time) {
            for (var i = 0; i < main.vars.domain[time].length; i++) {
                if (main.vars.domain[time][i].substring(0, 2) == main.data2.position || main.vars.domain[time][i].substring(0, 2) == 'AA') {
                    main.tips.domain.push(main.vars.domain[time][i].substring(2, main.vars.domain[time][i].length));
                }
                else if (main.vars.domain[time][i].substring(0, 2) == 'AB' && (main.data2.position == 'AS' || main.data2.position == 'AD')) {
                    main.tips.domain.push(main.vars.domain[time][i].substring(2, main.vars.domain[time][i].length));
                }
            }
            for (var i = 0; i < main.vars.oppo[time].length; i++) {
                if (main.vars.oppo[time][i].substring(0, 2) == main.data2.position || main.vars.oppo[time][i].substring(0, 2) == 'AA') {
                    main.tips.oppo.push(main.vars.oppo[time][i].substring(2, main.vars.oppo[time][i].length));
                }
                else if (main.vars.oppo[time][i].substring(0, 2) == 'AB' && (main.data2.position == 'AS' || main.data2.position == 'AD')) {
                    main.tips.oppo.push(main.vars.oppo[time][i].substring(2, main.vars.oppo[time][i].length));
                }
            }
        },
        cleanTipsDisplay: function () {
            main.tips = {
                domain: [],
                oppo: [],
                runes: [],
                Mysterys: []
            };
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
                if (data != 404) {
                    data[1][0].championName = pref.getChampName(data[1][0].championId);
                    data[1][1].championName = pref.getChampName(data[1][1].championId);
                    var transtemp = {
                        imgs: {
                            domain: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + data[1][0].championName + '.png',
                            oppo: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + data[1][1].championName + '.png'
                        },
                        player: {
                            domain: data[1][0],
                            oppo: data[1][1]
                        },
                        data2: data[2]
                    };
                    _this.transfer_current = transtemp;
                    _this.page = 'current';
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, function (data) {
                        var fixed = Prefsystem.fixdata(data);
                        main.vars.domain = fixed[0];
                        main.vars.oppo = fixed[1];
                        main.updatetips();
                    });
                }
            }, function (error) {
                if (error == 404) {
                    main.debugdisplay = '游戏并没有开始';
                }
                else {
                    main.debugdisplay = '出现了没有预料到的错误, 点击"帮助" -> 回报BUG告诉我们发生了什么';
                }
            });
        }
    }
});
