import {Point} from "./grid/point";

export class Config {
  constructor(
    public readonly rowNumber: number,
    public readonly colNumber: number,
    public readonly birthFactor: number,
    public readonly cellSize: number,
    public readonly speed: number,
    public readonly displayType: string,
    public readonly analyzedCell?: Point,
  ){ }

  // Not actually a form but eh
  static fromForm(): Config {
    const cellSize = this.getInputNumber("cellSize");
    return new Config(
      this.getInputNumber("colNumber")!,
      this.getInputNumber("rowNumber")!,
      this.getInputNumber("birthFactor")!,
      cellSize!,
      this.getInputNumber("speed")!,
      (document.getElementById("displayType")! as HTMLSelectElement).value,
      this.getAnalyzedCell(),
    );
  }

  public gridDifferentTo(other: Config): boolean {
    return this.rowNumber != other.rowNumber || this.colNumber != other.colNumber || this.birthFactor != other.birthFactor;
  }

  private static getInputNumber(inputId: string): (number | undefined) {
    
    const value = (document.getElementById(inputId)! as HTMLInputElement).value;
    return value !== "" ? +value : undefined;
  }

  private static getAnalyzedCell(): (Point | undefined) {
    const analyzeX = this.getInputNumber("analyzeX");
    const analyzeY = this.getInputNumber("analyzeY")
    if (analyzeX !== undefined && analyzeY !== undefined) {
      return new Point(analyzeX, analyzeY);
    }
  }
}
