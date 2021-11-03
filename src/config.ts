import { Grid }  from "./grid";
import { displayTypes, Display } from "./display";

export class Config {
  constructor(
    public readonly rowNumber: number,
    public readonly colNumber: number,
    public readonly birthFactor: number,
    public readonly cellSize: number,
    public readonly speed: number,
    public readonly display: Display
  ){

  }

  // Not actually a form but eh
  static fromForm(container: HTMLDivElement): Config {
    const cellSize = this.getInputNumber("cellSize");
    return new Config(
      this.getInputNumber("colNumber"),
      this.getInputNumber("rowNumber"),
      this.getInputNumber("birthFactor"),
      cellSize,
      this.getInputNumber("speed"),
      new displayTypes[(document.getElementById("displayType")! as HTMLSelectElement).value](container, cellSize)
    );
  }

  private static getInputNumber(inputId: string): number {
    return +(document.getElementById(inputId)! as HTMLInputElement).value 
  }
}
