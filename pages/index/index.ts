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
            Prefsystem.preLoad(() => {
                //not exist
                main.newuser = 0;
                Prefsystem.resetTitle();
            }, (data) => {
                //exist
                main.newuser = 1;
                riotapi.make(data, () => {
                    // console.log('Index.ts Preget -> Maked:' + data);
                }, () => {

                })
                // console.log('Index.ts Preget ->: ' + data);
            });
        },
        register: function () {
            this.stopeverything();
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
        editchamp: function (side) {
            //Champion C, Runes R, Mysterys Y
            //Early, Middle, Late
            this.edit.domain = (side == 0) ? this.domainchamp.id : this.oppochamp.id;
            this.edit.categery = 'C';
            this.edit.period = 'E';
            this.edit.side = side;
            this.edit.content = 'EditHere';
            this.newuser = 3;
        },
        sendSummorid: function () {
            this.button = true;
            riotapi.make(this.test, () => {
                main.newuser = 1;
                main.button = false;
            }, () => {
                main.button = false;
            });
        },
        localupdate: function (categery: string, event) {
            this.edit[categery] = event.srcElement.innerHTML;
        },
        pushedit: function () {
            if (riotapi.ptips(this.edit.domain, this.edit.categery, this.edit.period, this.edit.side, this.edit.content)) {
            }
        },
        updatetips: function () {
            let date = new Date();
            let gametime = (date.getTime() - this.data2.starttime) / 60000;
            let re = [];
            this.stopeverything();
            if (gametime < 40) {
                let t = (40 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(() => {
                    main.doupdate(40);
                }, t))
            } else {
                main.doupdate(40);
                return re;
            }
            if (gametime < 30) {
                let t = (30 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(() => {
                    main.doupdate(30);
                }, t))
            } else {
                main.doupdate(30);
                return re;
            }
            if (gametime < 20) {
                let t = (20 - gametime) * 60000;
                re.push(t);
                this.stopper.push(setTimeout(() => {
                    main.doupdate(20);
                }, t))
            } else {
                main.doupdate(20);
                return re;
            }
            if (gametime < 10) {
                let t = (10 - gametime) * 60000;
                re.push(t);
                main.doupdate(0);
                this.stopper.push(setTimeout(() => {
                    main.doupdate(10);
                }, t))
            } else {
                main.doupdate(10);
                return re;
            }
            return re;
        },
        doupdate: function (period: number) {
            switch (period) {
                case 0:
                    this.gameperiod = 'In Lane:';
                    this.tips.domain = this.vars.domain.L;
                    this.tips.oppo = this.vars.oppo.L;
                    break;
                case 10:
                    this.gameperiod = 'In Early Game:';
                    this.tips.domain = this.vars.domain.E;
                    this.tips.oppo = this.vars.oppo.E;
                    break;
                case 20:
                    this.gameperiod = 'In Middle Game:';
                    this.tips.domain = this.vars.domain.M;
                    this.tips.oppo = this.vars.oppo.M;
                    break;
                case 30:
                    this.gameperiod = 'In Late Game:';
                    this.tips.domain = this.vars.domain.A;
                    this.tips.oppo = this.vars.oppo.A;
                    break;
                case 40:
                    this.gameperiod = 'In REALLY Late Game:';
                    this.tips.domain = this.vars.domain.R;
                    this.tips.oppo = this.vars.oppo.R;
                    break;
            }
        },
        stopeverything: function () {
            for (let i = 0; i < this.stopper; i++) {
                clearTimeout(this.stopper[i]);
            }
            this.stopper = [];
        },
        getGame: function () {
            this.stopeverything();
            riotapi.find((data) => {
                if (data != 404) {
                    this.newuser = 2;
                    this.mypng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][0].championId) + '.png';
                    this.domainchamp.name = pref.getChampName(data[1][0].championId);
                    this.domainchamp.id = data[1][0].championId;
                    this.data2 = data[2];
                    this.oppoid = data[1][1].summonerName;
                    this.domainid = data[1][0].summonerName;
                    this.oppopng = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + pref.getChampName(data[1][1].championId) + '.png';
                    this.oppochamp.name = pref.getChampName(data[1][1].championId);
                    this.oppochamp.id = data[1][1].championId;
                    riotapi.gtips(data[1][0].championId, data[1][1].championId, data => {
                        const fixed = Prefsystem.fixdata(data);
                        main.vars.domain = fixed[0];
                        main.vars.oppo = fixed[1];
                        main.updatetips();
                    });
                }
            });
        }
    }
})
