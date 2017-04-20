(function () {
    'use strict';
}());
var ipcRenderer = require('electron').ipcRenderer;
var cdisplay = {
    cn: {
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
        newuser: false
    },
    methods: {
        preGet: function () {
            var _this = this;
            Prefsystem.preLoad(function () {
                _this.newuser = true;
            }, function (data) {
                _this.newuser = false;
                ipcRenderer.send('make-summnor', data);
                console.log(data);
            });
        },
        register: function () {
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
        sendSummorid: function () {
            this.button = true;
            ipcRenderer.once('ana-near', function (event, arg) {
                main.preGet();
                console.log(arg);
            });
            ipcRenderer.send('make-summnor', this.test);
        },
        getGame: function () {
            ipcRenderer.once('ana-near', function (event, arg) {
                console.log(arg);
            });
            ipcRenderer.send('get-game');
        }
    }
});
ipcRenderer.on('send-error', function (event, arg) {
    console.log(arg);
});