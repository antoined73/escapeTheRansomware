
import { v4 as uuidv4 } from 'uuid';
import { getMediumSize, getMiddlePosition } from '../position-utils'
import { WindowProgramIdToWindowTemplate } from '../program-utils'
import { WindowDisplayStatus } from './display_status'


export const createWindow = (programId, title, otherProps={}) => {
  const { height, width, status, isMinimized, focused, position, resizable } = otherProps;
  const size = getMediumSize();
  const h = height!=undefined? height : size.y;
  const w = width!=undefined? width : size.x;

  return {
    id: uuidv4(),
    programId: programId,
    height: h,
    width: w,
    title: title, 
    status: status!=undefined ? status : WindowDisplayStatus.FREE,
    isMinimized: isMinimized!=undefined ? isMinimized : false,
    focused: focused!=undefined ? focused : true,
    resizable: resizable!=undefined ? resizable : true,
    position : position!=undefined ? position:  getMiddlePosition(w, h)
  }
}

export const createProgramWindow = (programId, maximized) => {
  const template = WindowProgramIdToWindowTemplate[programId];
  if(!template) return;
  template.maximized = maximized || template.maximized;
  return createWindow(programId, template.title, template)
}