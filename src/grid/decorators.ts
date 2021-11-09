import { Point } from "./point";
import { Grid } from "./grid";

export function checkBounds(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalFunction = descriptor.value!;

  descriptor.value = function() {
    if (!("isPoint" in arguments[0]) || !("cols" in this) || !("rows" in this)) {
      throw new Error(`The "checkBounds" decorator can only be applied on a method of a grid whose first argument is a point!`)
    }
    let point = arguments[0] as Point;
    let grid = this as Grid;

    if (point.x < 0 || point.y < 0 || point.x >= grid.cols || point.y >= grid.rows) {
      throw new Error(`Point ${point.toString()} is not in the ${point.x}x${point.y} grid!`)
    }

    return originalFunction.apply(this, arguments);
  }
}
