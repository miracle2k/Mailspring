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


class Menu {
  popup() {
    console.log('popup something')
  }
}