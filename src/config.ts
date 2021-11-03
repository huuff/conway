import { Grid }  from "./grid";
import { displayTypes, Display } from "./display";

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

  private getInputNumber(inputId: string): number {
    return +(document.getElementById(inputId)! as HTMLInputElement).value 
  }
}
