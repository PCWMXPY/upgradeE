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
        newuser: false
    },
    methods: {
        preGet: function () {
            Prefsystem.preLoad(() => {
                //not exist
                this.newuser = true;
            }, (data) => {
                //exist
                this.newuser = false;
                ipcRenderer.send('make-summnor', data);
                console.log(data);
            });
        },
        register: function () {
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
        sendSummorid: function () {
            this.button = true;
            ipcRenderer.once('ana-near', (event, arg) => {
                main.preGet();
                console.log(arg);
            })
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
