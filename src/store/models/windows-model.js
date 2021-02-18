import { action, computed, thunk } from "easy-peasy";
import { createWindow } from '../../utils/window-utils'
import { clampPosition } from '../../utils/position-utils'

const initialState = {
  windows: [
    createWindow('Drag me', false),
    createWindow('Fullscreen test', true),
  ]
}

const windowsModel = {
  ...initialState,
  displayedWindows : computed((state) => state.windows.filter(w => w.status!=="minimized")),
  moveWindow : thunk((actions, payload, {getState}) => {
    const { id, position } = payload;
    const state = getState();

    const windowToMove = state.windows.find(w => w.id === id);
    if(!windowToMove) return;

    windowToMove.position = clampPosition(position);
    actions.focusWindow({id});
  }),
  resizeWindow: thunk((actions, payload, {getState}) => {
    const { id, width, height } = payload;
    const state = getState();

    const windowToMove = state.windows.find(w => w.id === id);
    if(!windowToMove) return;

    windowToMove.width = width;
    windowToMove.height = height;
    actions.focusWindow({id});
  }),
  focusWindow : action((state, payload) => {
    const {id} = payload;

    const newWindows = [ ...state.windows.map(w => { w.focused = false; return w; }) ];
    const windowToMove = newWindows.find(w => w.id == id);
    if(!windowToMove) return;

    windowToMove.focused = true;
    const index = newWindows.indexOf(windowToMove);
    if(index != newWindows.length-1) newWindows.push(newWindows.splice(index, 1)[0]); // reorder to top
    state.windows = newWindows;
  }),
  maximizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToMaximize = state.windows.find(w => w.id == id);
    windowToMaximize.status = "maximized";
  }),
  unmaximizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToUnmaximize = state.windows.find(w => w.id == id);
    windowToUnmaximize.status = "free";
  }),
  minimizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToMinimize = state.windows.find(w => w.id == id);
    windowToMinimize.status = "minimized";
  }),
  unminimizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToUnminimize = state.windows.find(w => w.id == id);
    windowToUnminimize.status = "free";
  }),
  toggleMinimize: thunk((actions, payload, {getState}) => {
    const {id} = payload;
    const windowToToggle = getState().windows.find(w => w.id == id);
    if(windowToToggle.status=="free") actions.minimizeWindow({id});
    else actions.unminimizeWindow({id});
  }),
  deleteWindow : action((state, payload) => {
    const {id} = payload;
    const newWindows = [ ...state.windows.filter(w => w.id != id) ];
    state.windows = newWindows;
  }),
  createWindow: action((state, payload) => {
    const {title, maximized} = payload;
    const newWindow = createWindow(title, maximized);
    state.windows.push(newWindow);
  }),
  showWindow: thunk((actions, payload, {getState}) => {
    const {title, maximized} = payload;
    const existingWindow = getState().windows.find(w => w.title==title);
    if(!existingWindow) {
      actions.createWindow({title, maximized});
      const newWindow = getState().windows.find(w => w.title==title);
      actions.focusWindow({id: newWindow.id});
    }
    else actions.focusWindow({id: existingWindow.id});
  }),
};

export default windowsModel;