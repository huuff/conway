import { displayTypes, Display } from "./display";
import { Game } from "./game";
import { Grid } from "./grid";

export class Config {
  private readonly rowNumber: number;
  private readonly colNumber: number;
  private readonly birthFactor: number;
  private readonly cellSize: number;
  private readonly display: Display;

  constructor(container: HTMLDivElement) {
    this.colNumber = this.getInputNumber("colNumber");
    this.rowNumber = this.getInputNumber("rowNumber");
    this.birthFactor = this.getInputNumber("birthFactor");
    this.cellSize = this.getInputNumber("cellSize");
    this.display = new displayTypes[
      (document.getElementById("displayType")! as HTMLSelectElement).value
    ](container, this.cellSize);
  }

  public get game(): Game {
    return new Game(
      new Grid(this.colNumber, this.rowNumber, this.birthFactor),
      this.display
    );
  }
  
  private getInputNumber(inputId: string): number {
    return +(document.getElementById(inputId)! as HTMLInputElement).value 
  }
}
