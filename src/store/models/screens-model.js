import { action, computed, thunk } from "easy-peasy";
import { Screens } from "../../utils/screens/screen-utils";

const initialState = {
  byId: {},
  allIds: []
}

const addScreen = (screenId) => {
  const screen = {
    id: screenId,
    opened: false
  }
  initialState.byId[screenId] = screen;
  initialState.allIds.push(screenId);
}
Object.values(Screens).forEach(screenId => addScreen(screenId));

const windowsModel = {
  ...initialState,
  all : computed((state) => Object.values(state.byId)),
  displayedScreen : computed((state) => state.all.find(s => s.opened)),
  openScreen: action((state, payload) => {
    const { id } = payload;
    state.all.forEach(s => { console.log(s); s.opened = false; });
    const screenToOpen = state.byId[id];
    if(!screenToOpen) return;
    screenToOpen.opened = true;
  })
};

export default windowsModel;