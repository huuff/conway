export class Config {
  constructor(
    public readonly rowNumber: number,
    public readonly colNumber: number,
    public readonly birthFactor: number,
    public readonly cellSize: number,
    public readonly speed: number,
    public readonly displayType: string,
  ){ }

  // Not actually a form but eh
  static fromForm(): Config {
    const cellSize = this.getInputNumber("cellSize");
    return new Config(
      this.getInputNumber("colNumber"),
      this.getInputNumber("rowNumber"),
      this.getInputNumber("birthFactor"),
      cellSize,
      this.getInputNumber("speed"),
      (document.getElementById("displayType")! as HTMLSelectElement).value
    );
  }

  public gridDifferentTo(other: Config): boolean {
    return this.rowNumber != other.rowNumber || this.colNumber != other.colNumber || this.birthFactor != other.birthFactor;
  }

  private static getInputNumber(inputId: string): number {
    return +(document.getElementById(inputId)! as HTMLInputElement).value 
  }
}
