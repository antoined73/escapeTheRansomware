import { action, computed, thunk } from "easy-peasy";

const initialState = {
  windows: [
    {
      id: 0,
      position : { x: 20, y: 80 },
      height: 500,
      width: 450,
      title: 'Drag me around',
      status: "maximized",
      focused: false
    },
    {
      id: 1,
      position : { x: 180, y: 80 },
      height: 250,
      width: 200,
      title: 'Drag me too', 
      status: "free",
      focused: false
    },
    {
      id: 2,
      position : { x: 180, y: 400 },
      height: 500,
      width: 450,
      title: 'Drag me too 1', 
      status: "free",
      focused: false
    },
    {
      id: 3,
      position : { x: 50, y: 20 },
      height: 150,
      width: 600,
      title: 'Drag me too 2', 
      status: "free",
      focused: false
    },
    {
      id: 4,
      position : { x: 180, y: 600 },
      height: 500,
      width: 450,
      title: 'Drag me too 3', 
      status: "free",
      focused: false
    },
    {
      id: 5,
      position : { x: 500, y: 20 },
      height: 500,
      width: 450,
      title: 'Drag me too 4', 
      status: "free",
      focused: false
    },
    {
      id: 6,
      position : { x: 800, y: 50 },
      height: 500,
      width: 450,
      title: 'Drag me too 5', 
      status: "free",
      focused: true
    }
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

    windowToMove.position = position;
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
};

export default windowsModel;