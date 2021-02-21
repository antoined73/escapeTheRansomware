
const marginOnEdges = {
  left: 0,
  right: 100,
  top: 0,
  bottom: 100
};
// Control min and max position of window in defined zone using real browser window inner size
export const clampPosition = (position) => {
  position.x = Math.max(marginOnEdges.left, Math.min(position.x, window.innerWidth-marginOnEdges.right));
  position.y = Math.max(marginOnEdges.top, Math.min(position.y, window.innerHeight-marginOnEdges.bottom));
  return position;
}

export const getMiddlePosition = (width, height) => {
  const middlePosition = {x: (window.innerWidth/2) - width/2, y: (window.innerHeight/2) - height/2};
  return clampPosition(middlePosition);
}

export const getMediumSize = () => {
  return {x: window.innerWidth/2, y: window.innerHeight/2};
}