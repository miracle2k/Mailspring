export default class AppEnvConstructor {

  static getLoadSettings() {
    return {};
  }

  static getCurrentWindow() {

  }

  config = {
    get(key) {
      return {
        
      }[key];
    },
    observe() {

    }
  };

  constructor() {
    window.AppEnv = this;

    const MenuManager = require('../menu-manager').default;
    this.menu = new MenuManager({ resourcePath: "" });
  }

  setupErrorLogger() {

  }

  reportError(error, extra = {}, { noWindows } = {}) {
    console.log('reportError', error, extra);
  }

  isMainWindow() {
    return true;
  }

  isEmptyWindow() {
  }

  isComposerWindow() {
  }

  isThreadWindow() {
  }

  getWindowType() {
  }

  inDevMode() {
  }

  inSafeMode() {
  }

  inSpecMode() {
  }

  getVersion() {
    return 1;
  }

  isReleasedVersion() {
  }

  getConfigDirPath() {
  }

  getWindowLoadTime() {
  }

  getLoadSettings() {
    return {};
  }

  close() {
  }

  quit() {
  }

  getSize() {
    return { width: 0, height: 0 };
  }

  setSize(width, height) {
  }

  setMinimumWidth(minWidth) {
  }

  getPosition() {
    return { x: 0, y: 0 };
  }

  setPosition(x, y) {
  }

  getCurrentWindow() {
  }

  center() {
  }

  focus() {
  }

  show() {
  }

  isVisible() {
    return true;
  }

  hide() {
  }

  reload() {
  }

  getWindowProps() {
  }

  onWindowPropsReceived(callback) {
  }

  isMaximixed() {
    return true;
  }

  maximize() {

  }

  minimize() {

  }

  isFullScreen() {
    return true;
  }

  setFullScreen(fullScreen = false) {

  }

  toggleFullScreen() {
    return this.setFullScreen(!this.isFullScreen());
  }

  getWindowDimensions() {
    return { x: 0, y: 0, width: 875, height: 250, maximized: false, fullScreen: false };
  }

  setWindowDimensions({ x, y, width, height }) {

  }

  isValidDimensions({ x, y, width, height } = {}) {
    return width > 0 && height > 0 && x + width > 0 && y + height > 0;
  }

  getDefaultWindowDimensions() {
    return { x: 0, y: 0, width: 875, height: 250 };
  }

  restoreWindowDimensions() {
  }

  storeWindowDimensions() {
  }

  storeColumnWidth({ id, width }) {
  }

  getColumnWidth(id) {
  }

  async startWindow() {
    console.log('startWindow');
    this.initializeBasicSheet();
    this.initializeReactRoot();
  }

  async startRootWindow() {
    console.log('startRootWindow');
  }

  async startSecondaryWindow() {
    console.log('startSecondaryWindow');
    await this.startWindow();
  }

  initializeBasicSheet() {    
    console.log('initializeBasicSheet');
    const WorkspaceStore = require('../flux/stores/workspace-store');
    if (!WorkspaceStore.Sheet.Main) {
      WorkspaceStore.defineSheet(
        'Main',
        { root: true },
        {
          popout: ['Center'],
        }
      );
    }
  }

  populateHotWindow(event, loadSettings) {
    console.log('populateHotWindow');
  }

  newWindow(options = {}) { 
    console.log('newWindow');
  }

  saveWindowStateAndUnload() {
  }

  displayWindow({ maximize } = {}) {
  }

  openDevTools() {
  }

  isDevToolsOpened() {
  }

  toggleDevTools() {
  }

  executeJavaScriptInDevTools(code) {
  }

  initializeReactRoot() {
    console.log('initializeReactRoot');    
    var mailspringExports = require('mailspring-exports');

    var item = document.createElement('mailspring-workspace');
    item.setAttribute('id', 'sheet-container');
    item.setAttribute('class', 'sheet-container');
    item.setAttribute('tabIndex', '-1');

    const React = require('react');
    const ReactDOM = require('react-dom');
    const SheetContainer = require('../sheet-container').default;
    ReactDOM.render(React.createElement(SheetContainer), item);

    document.body.appendChild(item);
  }

  loadConfig() {
  }

  exit(status) {
  }

  showOpenDialog(options, callback) {
  }

  showSaveDialog(options, callback) {
  }

  showErrorDialog(messageData, { showInMainWindow, detail } = {}) {
  }

  fileListCache() {
  }

  getWindowStateKey() {
  }

  saveWindowState() {
  }

  restoreWindowState() {
  }

  crashMainProcess() {
  }

  crashRenderProcess() {
  }

  onUpdateAvailable(callback) {
  }

  updateAvailable(details) {
  }

  onBeforeUnload(callback) {
  }

  onReadyToUnload(callback) {
  }

  removeUnloadCallback(callback) {
  }

  enhanceEventObject() {
  }
}
