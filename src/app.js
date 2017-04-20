(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
// --- 主要依赖 ---

// 载入electron模块
const {
    electron,
    BrowserWindow,
    app,
    ipcMain,
    Menu,
    MenuItem,
    shell
} = require("electron");
const path = require('path');
const storage = require('electron-json-storage');
// const c = require('child_process');
const nodefunctions = require('./upgradee.js').nodefunctions;
const playstat = require('./upgradee.js').playstat;
const icons = {
    favicon: path.resolve(__dirname, '..', 'css', 'favicon.ico'),
    mengwio: path.resolve(__dirname, '..', 'css', 'mengw.ico')
}
global.sharedObject = {
    test: 'test'
};
let renders = {
    mainpage: null
};
let template = [{
    label: 'Summoner',
    submenu: [{
            label: 'Re-Announce Summoner',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: (item, focusedWindow) => {
                storage.remove('summorid', function (error) {
                    if (error) throw error;
                });
                makesummnor();
                renders.mainpage.sender.send('cover-message', 'RAS');
            }
        }, {
            label: 'Test Function',
            accelerator: 'CmdOrCtrl+K',
            click: (item, focusedWindow) => {
                renders.mainpage.sender.send('cover-message', 'test');
            }
        },
        {
            label: 'Preferences',
            role: 'preferences',
            accelerator: 'CmdOrCtrl+,',
            click: (item, focusedWindow) => {}
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
            click: (item, focusedWindow) => {
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
        click: () => {
            shell.openExternal('https://github.com/PCWMXPY/upgradeE');
        }
    }, {
        label: 'Mengw.io',
        sublabel: 'Open Mengw.io',
        click: () => {
            shell.openExternal('http://www.mengw.io');
            // c.exec("start http://www.mengw.io");
        }
    }]
}];
let currentsession = {
    summoner: '',
    miao: undefined
};
// 创建一个浏览器窗口，主要用来加载HTML页面
// const Tray = electron.Tray;
// const path = electron.path;
// --- 窗口 ---
// 声明一个BrowserWindow对象实例
let mainWindow;
//定义一个创建浏览器窗口的方法

function createWindow() {
    // 创建一个浏览器窗口对象，并指定窗口的大小
    // 1024×768 合理的窗口大小
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: icons.favicon
    });
    makesummnor();
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
    // 同时也可以简化成：mainWindow.loadURL('./index.html');
    mainWindow.loadURL('file://' + __dirname + '/../pages/index/index.html');
    mainWindow.openDevTools();
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
// 监听应用程序对象是否初始化完成，初始化完成之后即可创建浏览器窗口
app.on("ready", createWindow);

// 监听应用程序对象中的所有浏览器窗口对象是否全部被关闭，如果全部被关闭，则退出整个应用程序。该
app.on("window-all-closed", function () {
    // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
    if (process.platform != "darwin") {
        // 退出整个应用程序
        app.quit();
    }
});

// 监听应用程序图标被通过点或者没有任何浏览器窗口显示在桌面上，那我们应该重新创建并打开浏览器窗口，避免Mac OS X系统回收或者销毁浏览器窗口
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
ipcMain.on('register', (event, arg) => {
    renders[arg] = event;
    console.log(arg);
});
const makesummnor = function () {
    ipcMain.removeAllListeners('get-game');
    ipcMain.removeAllListeners('make-summnor');
    ipcMain.once('make-summnor', (event, arg) => {
        currentsession.summonerid = arg;
        console.log(arg);
        storage.set('summorid', {
            id: arg
        }, function (error) {
            if (error) throw error;
        });
        nodefunctions.getSummonerId(arg, (data, id) => {
            currentsession.miao = new playstat(data.id, id);
            currentsession.miao.getCurrent(data => {
                event.sender.send('ana-near', currentsession.miao.analysisNear());
            }, error => {
                event.sender.send('send-error', error);
            })
        })
        ipcMain.on('get-game', (event, arg) => {
            console.log('get-game');
            currentsession.miao.getCurrent(data => {
                event.sender.send('ana-near', currentsession.miao.analysisNear());
            }, error => {
                event.sender.send('send-error', error);
            })
        })
    });
}