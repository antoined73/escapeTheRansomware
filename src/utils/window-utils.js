
import { v4 as uuidv4 } from 'uuid';
import { getMediumSize, getMiddlePosition } from './position-utils'

export const WindowDisplayStatus = {
  MAXIMIZED: 0,
  FREE: 1
}

export const createWindow = (title, maximized) => {
  const size = getMediumSize();
  return {
    id: uuidv4(),
    position : getMiddlePosition(size.x, size.y),
    height: size.y,
    width: size.x,
    title: title, 
    status: maximized? WindowDisplayStatus.MAXIMIZED : WindowDisplayStatus.FREE,
    isMinimized: false,
    focused: true
  }
}