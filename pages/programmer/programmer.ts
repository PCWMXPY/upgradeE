(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */

let mainpr = new Vue({
    el: '#main',
    data: {},
    methods: {
        register: function () {
            ipcRenderer.on('cover-message', (event, arg) => {
                console.log(arg);
            })
            ipcRenderer.send('register', 'programmer');
        }
    }
})