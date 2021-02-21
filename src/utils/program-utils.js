import { WindowDisplayStatus } from './windows/display_status'

export const Programs = {
  POLYPOINTS: 0,
}

// Overrides windows properties when created
export const WindowProgramIdToWindowTemplate = { 
  0 : { // POLYPOINTS PROGRAM
    title: "Polypoints.exe",
    height: 500,
    width: 600,
    status: WindowDisplayStatus.FREE,
    resizable: false
  }
}