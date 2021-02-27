import { action, computed, thunk } from "easy-peasy";
import { createProgramWindow } from '../../utils/windows/window-utils'
import { WindowDisplayStatus } from '../../utils/windows/display_status'
import { clampPosition } from '../../utils/windows/position-utils'
import { Programs } from "../../utils/windows/program-utils";

const initialState = {
  byId: {},
  allIds: []
}

const loginWindow = createProgramWindow(Programs.LOGIN);
initialState.byId[loginWindow.id] = loginWindow;
initialState.allIds.push(loginWindow.id);

const windowsModel = {
  ...initialState,
  all : computed((state) => Object.values(state.byId)),
  displayedWindows : computed((state) => state.all.filter(w => !w.isMinimized)),
  moveWindow : thunk((actions, payload, {getState}) => {
    const { id, position } = payload;
    const state = getState();

    const windowToMove = state.byId[id];
    if(!windowToMove) return;

    windowToMove.position = clampPosition(position);
    actions.focusWindow({id});
  }),
  resizeWindow: thunk((actions, payload, {getState}) => {
    const { id, width, height } = payload;
    const state = getState();

    const windowToResize = state.byId[id];
    if(!windowToResize) return;

    windowToResize.width = width;
    windowToResize.height = height;
    actions.focusWindow({id});
  }),
  focusWindow : action((state, payload) => {
    const {id} = payload;

    const windowToFocus = state.byId[id];
    if(!windowToFocus) return;

    windowToFocus.focused = true;
    state.allIds.push(state.allIds.splice(state.allIds.indexOf(id), 1)[0]);
  }),
  maximizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToMaximize = state.byId[id];
    windowToMaximize.status = WindowDisplayStatus.MAXIMIZED;
  }),
  unmaximizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToUnmaximize = state.byId[id];
    windowToUnmaximize.status = WindowDisplayStatus.FREE;
  }),
  minimizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToMinimize = state.byId[id];
    windowToMinimize.isMinimized = true;
  }),
  unminimizeWindow : action((state, payload) => {
    const {id} = payload;
    const windowToUnminimize = state.byId[id];
    windowToUnminimize.isMinimized = false;
  }),
  toggleMinimize: thunk((actions, payload, {getState}) => {
    const {id} = payload;
    const windowToToggle = getState().byId[id];
    if(windowToToggle.isMinimized) actions.unminimizeWindow({id});
    else actions.minimizeWindow({id});
  }),
  deleteWindow : action((state, payload) => {
    // Même ici state.allIds et state.byId sont des tableaux "Proxy" (?) quand on les log. Ils ont l'air d'être vides. Je comprends R. Alèd.
    console.log(payload);
    const {id} = payload;
    console.log(id);
    state.allIds.splice(state.allIds.indexOf(id), 1);
    delete state.byId[id];
  }),
  createWindow: action((state, payload) => {
    const {programId, maximized} = payload;
    const newWindow = createProgramWindow(programId, maximized);
    state.byId[newWindow.id] = newWindow;
    state.allIds.push(newWindow.id);
  }),
  showWindow: thunk((actions, payload, {getState}) => {
    const {programId, maximized} = payload;
    let windowToShow = getState().all.find(w => w.programId === programId);
    if(!windowToShow) {
      actions.createWindow({programId, maximized});
      windowToShow = getState().all.find(w =>  w.programId === programId);
    }
    actions.focusWindow({id: windowToShow.id});
    actions.unminimizeWindow({id: windowToShow.id});
  }),
};

export default windowsModel;