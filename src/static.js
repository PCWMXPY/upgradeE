"use strict";
exports.__esModule = true;
(function () {
    'use strict';
}());
exports.menutemplate = [{
        label: 'Summoner',
        submenu: [{
                label: 'Re-Announce Summoner',
                accelerator: 'CmdOrCtrl+Shift+S',
                click: function (item, focusedWindow) {
                    storage.remove('summorid', function (error) {
                        if (error)
                            throw error;
                    });
                    renders.mainpage.sender.send('cover-message', 'RAS');
                }
            }, {
                label: 'Test Function',
                accelerator: 'CmdOrCtrl+K',
                click: function (item, focusedWindow) {
                    renders.mainpage.sender.send('cover-message', 'test');
                }
            },
            {
                label: 'Preferences',
                role: 'preferences',
                accelerator: 'CmdOrCtrl+,',
                click: function (item, focusedWindow) { }
            }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function () {
                    app.quit();
                }
            }
        ]
    }, {
        label: 'Window',
        role: 'window',
        submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            }, {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
        ]
    }, {
        label: 'About',
        role: 'help',
        submenu: [{
                label: 'Github',
                sublabel: 'Open Github Page',
                click: function () {
                    shell.openExternal('https://github.com/PCWMXPY/upgradeE');
                }
            }, {
                label: 'Mengw.io',
                sublabel: 'Open Mengw.io',
                click: function () {
                    shell.openExternal('http://www.mengw.io');
                }
            }]
    }];
module.exports = { menutemplate: exports.menutemplate };
