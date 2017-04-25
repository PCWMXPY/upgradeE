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
const afun = require('./upgradee.js').appfunctions;
const playstat = require('./upgradee.js').playstat;
const icons = {
    favicon: path.resolve(__dirname, '..', 'css', 'favicon.ico'),
    mengwio: path.resolve(__dirname, '..', 'css', 'mengw.ico')
};
const version = {
    str: "1.3.3",
    int: 10303
}
let gloarg = {
    version: {
        update: 0,
        str: version.str,
        link: ''
    }
}
let renders = {
    mainpage: null,
    programmer: null
};
let currentrender = {
    rander: null,
    identification: ''
};
global.miao = {
    id: null,
    miao: null,
    near: null
};
let template = [{
    label: '召唤师',
    submenu: [{
        label: '声明召唤师ID',
        sublabel: '初始化',
        accelerator: 'CmdOrCtrl+Shift+R',
        click: (item, focusedWindow) => {
            if (currentrender.identification == 'mainpage') {
                storage.remove('summorid', function (error) {
                    if (error) throw error;
                });
                currentrender.rander.sender.send('cover-message', 'RAS');
            }
        }
    }, {
        label: '返回主菜单',
        accelerator: 'CmdOrCtrl+K',
        click: (item, focusedWindow) => {
            if (currentrender.identification == 'mainpage') {
                currentrender.rander.sender.send('cover-message', 'BTM');
            } else {
                mainWindow.loadURL('file://' + __dirname + '/../pages/index/index.html');
            }
        }
    }, {
        label: '启动高级编辑器',
        sublabel: '需要攻略作者ID（开发中）',
        accelerator: 'CmdOrCtrl+Shift+P',
        click: (item, focusedWindow) => {
            renders.mainpage = null;
            mainWindow.loadURL('file://' + __dirname + '/../pages/programmer/programmer.html');
        }
    }, {
        label: '设置',
        role: 'preferences',
        accelerator: 'CmdOrCtrl+,',
        click: (item, focusedWindow) => {}
    }, {
        label: '退出',
        accelerator: 'CmdOrCtrl+Q',
        click: function () {
            app.quit();
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
            label: '重新加载',
            accelerator: 'CmdOrCtrl+R',
            click: (item, focusedWindow) => {
                if (focusedWindow)
                    focusedWindow.reload();
            }
        }, {
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
    ]
}, {
    label: '帮助',
    role: 'help',
    submenu: [{
        label: 'Github',
        sublabel: '浏览源码',
        click: () => {
            shell.openExternal('https://github.com/PCWMXPY/upgradeE');
        }
    }, {
        label: 'Mengw.io',
        sublabel: '打开博客',
        click: () => {
            shell.openExternal('http://www.mengw.io');
            // c.exec("start http://www.mengw.io");
        }
    }, {
        label: '回报BUG',
        click: () => {
            shell.openExternal('https://github.com/PCWMXPY/upgradeE/issues/new');
            // c.exec("start http://www.mengw.io");
        }
    }]
}];
// 创建一个浏览器窗口，主要用来加载HTML页面
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
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
    // 同时也可以简化成：mainWindow.loadURL('./index.html');
    mainWindow.loadURL('file://' + __dirname + '/../pages/index/index.html');
    // mainWindow.openDevTools();
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    mainWindow.on("closed", function () {
        renders.mainpage = null;
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
    currentrender.rander = event;
    currentrender.identification = arg;
    afun.getVersion(version, (obj) => {
        gloarg.version = obj
        currentrender.rander.sender.send('version', gloarg.version);
    });
    console.log('From Event-Register<-app.js: ' + arg);
});