export const ipcRenderer = {
  send() {},
  on() {},
};

export const remote = {
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