
import TerminalController from './terminalController.js';
import Vehicle from "./vehicle.js";
import { save } from './repository.js'

import database from "./../database.json" assert { type: "json" };

const DEFAULT_LANG = 'en'
const STOP_TERMINAL = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('\nInsert new data: ')

    const vehicle = Vehicle.generateInstanceFromString(answer);
    terminalController.updateTable(vehicle.formatted(DEFAULT_LANG))
    save(vehicle)

    if (answer === STOP_TERMINAL){
      console.log("Process finished")
      terminalController.closeTerminal();
      return
    }

    return mainLoop()
  } catch (error) {
    console.error("Error", error)
    mainLoop()
  }
}
await mainLoop()