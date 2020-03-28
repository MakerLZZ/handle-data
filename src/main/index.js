import {
    app,
    BrowserWindow,
    Tray,
    Menu
} from 'electron';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080' :
    `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 768, // 高
        width: 1366, // 宽
        show: true, // 创建后是否显示
        frame: false, // 是否创建frameless窗口
        fullscreenable: false, // 是否允许全屏
        center: true, // 是否出现在屏幕居中的位置
        backgroundColor: '#fff', // 背景色，用于transparent和frameless窗口
        title: 'data',
        titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
        resizable: true, // 是否允许拉伸大小
        transparent: true, // 是否是透明窗口（仅macOS）
        vibrancy: 'ultra-dark', // 窗口模糊的样式（仅macOS）
        webPreferences: {
            backgroundThrottling: false // 当页面被置于非激活窗口的时候是否停止动画和计时器
        }
        // ... 以及其他可选配置
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createTray() {
    const systemBarPic = process.platform === 'darwin' ? `${__static}/tray/system_bar.png` : `${__static}/tray/system_bar_nodarwin.png`;
    tray = new Tray(systemBarPic); // 指定图片的路径

    const contextMenu = Menu.buildFromTemplate([{
        label: '设置'
    },
    {
        label: '关于'
    },
    {
        label: '退出',
        click: () => {
            app.quit();
        }
    }
    ], tray.on('right-click', () => { // 右键点击
        mainWindow.hide(); // 隐藏小窗口
        tray.popUpContextMenu(contextMenu); // 打开菜单
    }), tray.on('click', () => { // 左键点击
        if (process.platform === 'darwin') { // 如果是macOS
            toggleWindow(); // 打开或关闭小窗口
        } else { // 如果是windows
            mainWindow.hide(); // 隐藏小窗口
            if (mainWindow === null) { // 如果主窗口不存在就创建一个
                createWindow();
                mainWindow.show();
            } else { // 如果主窗口在，就显示并激活
                mainWindow.show();
                mainWindow.focus();
            }
        }
    }));
    tray.setToolTip('data app');
    tray.setContextMenu(contextMenu);
}

function createMenu() {
    if (process.env.NODE_ENV !== 'development') {
        const template = [{
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            }
            ]
        }];
        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}

// mainWindow 事件钩子

// closed 当窗口被关闭的时候
// focus 当窗口被激活的时候
// show 当窗口展示的时候
// hide 当窗口被隐藏的时候
// maxmize 当窗口最大化时
// minimize 当窗口最小化时

// BrowserWindow.getFocusedWindow() [静态方法]获取激活的窗口
// win.close() [实例方法，下同]关闭窗口
// win.focus() 激活窗口
// win.show() 显示窗口
// win.hide() 隐藏窗口
// win.maximize() 最大化窗口
// win.minimize() 最小化窗口
// win.restore() 从最小化窗口恢复

let tray = null;
app.on('ready', () => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// app的常用生命周期钩子如下

// will-finish-launching 在应用完成基本启动进程之后触发

// ready 当electron完成初始化后触发
// 创建应用窗口、创建应用菜单、创建应用快捷键等初始化操作

// window-all-closed 所有窗口都关闭的时候触发，在windows和linux里，所有窗口都退出的时候通常是应用退出的时候
// 在非macOS的系统下，通常一个应用的所有窗口都退出的时候，也是这个应用退出之时。所以可以配合window-all-closed这个钩子来实现

// before-quit 退出应用之前的时候触发

// will-quit 即将退出应用的时候触发

// quit 应用退出的时候触发
// will-quit或者quit的时候执行一些清空操作，比如解绑应用快捷键

// 常用的事件钩子
// active（仅macOS）当应用处于激活状态时

// browser-window-created 当一个BrowserWindow被创建的时候

// browser-window-focus 当一个BrowserWindow处于激活状态的时候

// 常用的方法
// app.quit() 用于退出应用

// app.getPath(name) 用于获取一些系统目录，对于存放应用的配置文件等很有用

// app.focus() 用于激活应用，不同系统激活逻辑不一样