import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow | null;

/**
 * @description 创建窗口
 * @author jerry.c
 * @date 2020-07-21
 */
function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // 加载本地链接
    mainWindow.loadURL('http://localhost:8000/#/');
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产打包环境
    mainWindow.loadURL(
      url.format({
        // 打包html
        pathname: path.join(__dirname, './dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
  // 关闭监听
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入
