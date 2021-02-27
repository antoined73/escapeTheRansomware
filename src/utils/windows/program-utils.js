import { WindowDisplayStatus } from './display_status'

export const Programs = {
  POLYPOINTS: 0,
  LOGIN: 1,
  MAILZ: 2
}

// Overrides windows properties when created
export const WindowProgramIdToWindowTemplate = { 
  0 : { // POLYPOINTS PROGRAM
    title: "Polypoints.exe",
    height: 500,
    width: 600,
    status: WindowDisplayStatus.FREE,
    resizable: false
  },
  1 : {
    title: "Welcome to Uni OS",
    height: 300,
    width: 700,
    status: WindowDisplayStatus.FREE,
    resizable: false,
    minimizable: false,
    maximizable: false,
    closable: false
  },
  2 : {
    title: "Mailz.exe",
    height: 500,
    width: 1200,
    status: WindowDisplayStatus.FREE
  }
}