const fakeWindow = {
  setSheetOffset() {
    // https://electronjs.org/docs/api/dialog#sheets
  }
}

export const ipcRenderer = {
  send() {},
  on() {},
};

export const remote = {
  getCurrentWindow() {
    return fakeWindow;
  },
  app: {
    quit() {},
    emit() {},
  },
  screen: {
    getDisplayMatching() {},
    getPrimaryDisplay() {},
  },
  process: {
    exit(status) {},
  },
  dialog: {
    showOpenDialog() {},
    showSaveDialog() {},
    showMessageBox() {},
  },
  Menu: {
    buildFromTemplate() {
      return new Menu();
    }
  }
};


export class Menu {
  popup() {
    console.log('popup something')
  }
}

export const shell = null;
export const protocol = null;
export const nativeImage = null;
export const ipcMain = null;
export const dialog = null;
export const app = null;
export const BrowserWindow = null;
export const clipboard = null;