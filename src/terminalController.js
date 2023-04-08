import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";

import Vehicle from "./vehicle.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    // it will replace the console.log injecting the draftlog
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Vehicle(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item)
    console.clear()
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  question(message = "") {
    return new Promise(resolve => this.terminal.question(message, resolve))
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "types", name: chalk.magenta("Vehicles Types") },
        { field: "kmTraveled", name: chalk.cyan("Km Travaled") },
        { field: "from", name: chalk.cyan("Fom") },
        { field: "to", name: chalk.cyan("To") },
      ],
    };
  }
}
