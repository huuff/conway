export class Point {
  
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}


  public neighbors(): Point[] {
    return [
      new Point(this.x + 1, this.y),
      new Point(this.x + 1, this.y + 1),
      new Point(this.x, this.y + 1),
      new Point(this.x - 1, this.y),
      new Point(this.x, this.y - 1),
      new Point(this.x - 1, this.y - 1),
      new Point(this.x + 1, this.y -1),
      new Point(this.x - 1, this.y + 1),
    ];
  }
}
