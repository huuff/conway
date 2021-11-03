import 'bootstrap/dist/css/bootstrap.min.css';
import { Config } from "./config";
import { Game } from "./game";
import { Point } from "./point";

const gameContainer = document.getElementById("main") as HTMLDivElement;

const game: Game = new Game(new Config(gameContainer));

document.getElementById("controls")!.addEventListener("change", () => {
  game.updateConfig(new Config(gameContainer));
});

document.getElementById("analyze")!.addEventListener("click", (e) => {
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

