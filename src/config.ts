import { Grid }  from "./grid";
import { displayTypes, Display } from "./display";
import {Game} from "./game";

export class Config {
  rowNumber: number;
  colNumber: number;
  birthFactor: number;
  cellSize: number;
  speed: number;
  display: Display;

  constructor(container: HTMLDivElement) {
    this.colNumber = this.getInputNumber("colNumber");
    this.rowNumber = this.getInputNumber("rowNumber");
    this.birthFactor = this.getInputNumber("birthFactor");
    this.cellSize = this.getInputNumber("cellSize");
    this.speed = this.getInputNumber("speed");
    this.display = new displayTypes[
      (document.getElementById("displayType")! as HTMLSelectElement).value
    ](container, this.cellSize);
  }

  public newGrid(): Grid {
    return Grid.createWithBirthFactor(this.rowNumber, this.colNumber, this.birthFactor)
  }

  public newGame(): Game {
    return new Game(this.newGrid(), this.display, this.speed);
  }
  
  private getInputNumber(inputId: string): number {
    return +(document.getElementById(inputId)! as HTMLInputElement).value 
  }
}
