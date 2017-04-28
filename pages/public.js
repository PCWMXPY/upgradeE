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
var indexfuncton = {};
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
