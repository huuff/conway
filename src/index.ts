import { Config } from "./config";
import { Point } from "./point";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

let game: Game = new Config(gameContainer).game;
game.start();

document.getElementById("controls")!.addEventListener("change", () => {
  game.stop();
  game = new Config(gameContainer).game;
  game.start();
});

document.getElementById("analyze")!.addEventListener("click", (e) => {
  console.log("asdf");
  e.preventDefault();

  const analyzeX = +(document.getElementById("analyzeX")! as HTMLInputElement).value;
  const analyzeY = +(document.getElementById("analyzeY")! as HTMLInputElement).value;
  const p = new Point(analyzeX, analyzeY);
  console.log(`Analyzing ${JSON.stringify(p)}`);
  console.log(`Neighbors: `)
  for (let neighbor of p.neighbors()) {
    console.log(`${JSON.stringify(neighbor)}: ${game.grid.cell(neighbor)}`) 
  }
});

