const ipcRenderer = {
  send() {},
  on() {},
};

const remote = {
  getCurrentWindow() {},
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
};