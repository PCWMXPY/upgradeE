(function () {
    'use strict';
}());
function test() {
    console.log('test');
}
var storage = require('electron-json-storage');
var remote = require('electron').remote;
var nfun = require('../../src/upgradee.js')
    .nodefunctions;
var playstat = require('../../src/upgradee.js').playstat;
Vue.component('uge-title', {
    props: ['size', 'secondtitle'],
    computed: {
        computedsize: function () {
            var re = 'font-size:' + this.size + 'px;';
            re += '';
            return 'font-size:' + this.size + 'px';
        }
    },
    template: '<div class="logo" v-bind:style="computedsize"><span>Upgr</span><span style="color:#790000">a</span><span style="color:#b90000">d</span><span style="color:red">e<strong>E</strong></span><span v-if="secondtitle" style="color:white">|{{secondtitle}}</span></div>'
});
Vue.component('version', {
    props: ['version', 'realversion'],
    data: function () {
        return {
            style: 'color: #454545'
        };
    },
    computed: {
        versions: function () {
            if (this.realversion.int > this.version.int) {
                return this.version.str + '->' + this.realversion.str;
            }
            return this.version.str;
        },
        displays: function () {
            if (this.realversion.int > this.version.int) {
                if (this.realversion.emer > this.version.int) {
                    this.style = 'color: #c60000;';
                    return '需要立即更新';
                }
                else {
                    this.style = 'color: #4635ed;';
                    return '推荐更新' + this.realversion.str + '版本';
                }
            }
            else {
                return '主E蕹鵺猛如虎';
            }
        }
    },
    template: '<div v-bind:style="style"><span>{{versions}}</span><br><span>{{displays}}</span></div>'
});
Vue.component('re-credit', {
    template: '<div><p style="color:#565656"><i class="fa fa-code"></i> Review.md with <i class="fa fa-heart"></i> by WMXPY@<a href="http://mengw.io">mengw.io</a> 2016</p></div>'
});
var Prefsystem = {
    preLoad: function (notexist, exist) {
        storage.get('summorid', function (error, data) {
            if (error)
                throw error;
            if (data.id == null) {
                notexist();
            }
            else {
                exist(data.id);
            }
        });
    },
    updateTitle: function (content) {
        document.getElementById('title').innerHTML = 'UpgradeE -> ' + content;
    },
    resetTitle: function () {
        document.getElementById('title').innerHTML = 'UpgradeE';
    },
    fixdata: function (data) {
        var re = [];
        for (var i = 0; i < data.length; i++) {
            re.push([]);
            for (var j = 0; j < data[i].length; j++) {
                var q = {
                    time: data[i][j].substring(0, 1),
                    content: data[i][j].substring(1, data[i][j].length)
                };
                re[i].push(q);
            }
        }
        var temp = [];
        for (var i = 0; i < re.length; i++) {
            var ttemp = {
                L: [],
                E: [],
                M: [],
                A: [],
                R: [],
                T: []
            };
            for (var j = 0; j < re[i].length; j++) {
                ttemp[re[i][j].time].push(re[i][j].content);
            }
            temp.push(ttemp);
        }
        return temp;
    },
    readPref: function () {
        storage.get('summorid', function (error, data) {
            if (error)
                throw error;
            console.log(data);
        });
    },
    writePref: function (ids) {
        storage.set('summorid', { id: ids }, function (error) {
            if (error)
                throw error;
        });
    },
    getKeys: function () {
        storage.keys(function (error, keys) {
            if (error)
                throw error;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                console.log('There is a key called: ' + key);
            }
        });
    },
    reMovePref: function () {
        storage.clear('summorid', function (error) {
            if (error)
                throw error;
        });
    },
    clearPref: function () {
        storage.clear(function (error) {
            if (error)
                throw error;
        });
    }
};
var riotapi = {
    make: function (id, fun, err) {
        nfun.getSummonerId(id, function (data, name) {
            remote.getGlobal('miao').miao = id;
            Prefsystem.writePref(id);
            remote.getGlobal('miao').id = data.id;
            Prefsystem.updateTitle(data.name);
            fun();
        }, function (error) {
            err(error);
            console.log(error);
        });
    },
    find: function (fun, errors) {
        nfun.getCurrent(remote.getGlobal('miao').id, function (data) {
            remote.getGlobal('miao').near = nfun.analysisNear(data, remote.getGlobal('miao').miao);
            fun(remote.getGlobal('miao').near);
        }, function (error) {
            errors(error);
        });
    },
    gtips: function (domain, oppo, fun) {
        var dom = 'C' + domain;
        var opp = 'C' + oppo;
        nfun.getTips(dom, opp, function (data) {
            fun(data);
        });
    },
    ptips: function (domain, categery, period, side, content, position) {
        if (categery.length != 1 || period.length != 1 || position.length != 2) {
            return false;
        }
        var topic = categery + domain;
        var cont = period + position + content;
        nfun.postTips(topic, side, cont, function (data) {
            console.log(data);
        });
        return true;
    }
};
