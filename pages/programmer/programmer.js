(function () {
    'use strict';
}());
var mainpr = new Vue({
    el: '#main',
    data: {},
    methods: {
        register: function () {
            ipcRenderer.on('cover-message', function (event, arg) {
                console.log(arg);
            });
            ipcRenderer.send('register', 'programmer');
        }
    }
});
