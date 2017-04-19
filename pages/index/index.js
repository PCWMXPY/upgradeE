(function () {
    'use strict';
}());
var ipcRenderer = require('electron').ipcRenderer;
var rewave = [];
var cdisplay = {
    cn: {
        input: '输入召唤师名称',
        submit: '提交'
    }
};
var main = new Vue({
    el: '#main',
    data: {
        test: '',
        display: cdisplay.cn
    },
    methods: {
        sendSummorid: function () {
            ipcRenderer.send('makesummnor', this.test);
        }
    }
});
