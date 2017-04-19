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
const rewave = [];
const cdisplay = {
    cn: {
        input: '输入召唤师名称',
        submit: '提交'
    }
}
let main = new Vue({
    el: '#main',
    data: {
        test: '',
        display: cdisplay.cn
    },
    methods: {
        sendSummorid: function () {
            ipcRenderer.send('make-summnor', this.test);
        },
        getGame: function () {
            ipcRenderer.once('ana-near', (event, arg) => {
                console.log(arg);
            })
            ipcRenderer.send('get-game');
        }
    }
})
ipcRenderer.on('send-error', (event, arg) => {
    console.log(arg);
});