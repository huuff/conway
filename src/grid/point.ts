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

  public equals(other: Point): boolean {
    return this.x == other.x && this.y == other.y;
  }

  public in(points: Point[]): boolean {
    return points.some(p => p.equals(this));
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  // Weird shit for AOP
  public isPoint(): boolean {
    return true;
  }
}
