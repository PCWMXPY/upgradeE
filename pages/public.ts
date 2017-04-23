(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare var Vue: any;
declare var rewave: any;
declare function require(name: string);
const storage = require('electron-json-storage');
const { remote } = require('electron');
const nfun = require('../../src/upgradee.js')
    .nodefunctions;
const playstat = require('../../src/upgradee.js').playstat;
Vue.component('re-wave', {
    data: function () {
        return {
            buttonsinvue: rewave
        };
    },
    methods: {
        updatebutton: function () {
            this.buttonsinvue = rewave;
        }
    },
    template: '<div class="div_right_bottom"><span class="button-dropdown" data-buttons="dropdown"><button class="button button-rounded button-square" id="re-wave"><i class="fa fa-caret-down"></i></button><ul class="button-dropdown-list"><li><button class="button button-square" id="re-wave-setting"><i class="fa fa-cog"></i></button></li><li v-for="butt in buttonsinvue"><button class="button button-square" v-bind:id="butt.id" v-on:click="butt.fun"><i class="fa" v-bind:class="butt.icon"></i></button></li><li><button class="button button-square" id="re-wave-github"><i class="fa fa-github"></i></button></li></ul></span><button v-on:click="updatebutton" id="re-waveupdatebutton" style="display:none;"></button></div>'
});
Vue.component('re-credit', {
    template: '<div><p style="color:#565656"><i class="fa fa-code"></i> Review.md with <i class="fa fa-heart"></i> by WMXPY@<a href="http://mengw.io">mengw.io</a> 2016</p></div>'
});
const Prefsystem = {
    preLoad: (notexist: Function, exist: Function) => {
        storage.get('summorid', function (error, data) {
            if (error) throw error;
            if (data.id == null) {
                notexist();
            } else {
                exist(data.id);
            }
        });
    },
    updateTitle: function (content: string) {
        document.getElementById('title').innerHTML = 'UpgradeE -> ' + content;
    },
    resetTitle: function () {
        document.getElementById('title').innerHTML = 'UpgradeE';
    },
    fixdata: (data: Array<Array<string>>) => {
        let re = [];
        for (let i = 0; i < data.length; i++) {
            re.push([]);
            for (let j = 0; j < data[i].length; j++) {
                let q = {
                    time: data[i][j].substring(0, 1),
                    content: data[i][j].substring(1, data[i][j].length)
                }
                re[i].push(q);
            }
        }
        let temp = [];
        for (let i = 0; i < re.length; i++) {
            let ttemp = {
                L: [],
                E: [],
                M: [],
                A: [],
                R: []
            };
            for (let j = 0; j < re[i].length; j++) {
                ttemp[re[i][j].time].push(re[i][j].content);
            }
            temp.push(ttemp);
        }
        return temp;
    },
    readPref: () => {
        storage.get('summorid', function (error, data) {
            if (error) throw error;
            console.log(data);
        });
    },
    writePref: (ids: string) => {
        storage.set('summorid', { id: ids }, function (error) {
            if (error) throw error;
        });
    },
    getKeys: () => {
        storage.keys(function (error, keys) {
            if (error) throw error;

            for (var key of keys) {
                console.log('There is a key called: ' + key);
            }
        });
    },
    reMovePref: () => {
        storage.clear('summorid', function (error) {
            if (error) throw error;
        });
    },
    clearPref: () => {
        storage.clear(function (error) {
            if (error) throw error;
        });
    }
};
const riotapi = {
    //remote.getGlobal('miao').id = 'new value';
    make: (id: any, fun: Function, err: Function) => {
        nfun.getSummonerId(id, (data, name) => {
            remote.getGlobal('miao').miao = id;
            Prefsystem.writePref(id);
            remote.getGlobal('miao').id = data.id;
            Prefsystem.updateTitle(data.name);
            fun();
        }, error => {
            err();
            console.log(error);
        });
    },
    find: (fun: Function) => {
        nfun.getCurrent(remote.getGlobal('miao').id, data => {
            remote.getGlobal('miao').near = nfun.analysisNear(data, remote.getGlobal('miao').miao);
            fun(remote.getGlobal('miao').near);
        }, error => {
            console.log(error);
        })
    },
    gtips: (domain: number, oppo: number, fun: Function) => {
        let dom = 'C' + domain;
        let opp = 'C' + oppo;
        nfun.getTips(dom, opp, data => {
            fun(data);
        });
    },
    ptips: (domain: number, categery: string, period: string, side: number, content: string) => {
        //Champion C, Runes R, Mysterys Y
        if (categery.length != 1 || period.length != 1) {
            return false;
        }
        const topic = categery + domain;
        const cont = period + content;
        nfun.postTips(topic, side, cont, data => {
            console.log(data);
        });
        return true;
    }
};