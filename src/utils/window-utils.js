
import { v4 as uuidv4 } from 'uuid';
import { getMediumSize, getMiddlePosition } from './position-utils'

export const createWindow = (title, maximized) => {
  const size = getMediumSize();
  return {
    id: uuidv4(),
    position : getMiddlePosition(size.x, size.y),
    height: size.y,
    width: size.x,
    title: title, 
    status: maximized? "maximized" : "free",
    focused: true
  }
}