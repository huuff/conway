import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import { Config } from "./config";
import { Game } from "./game";
import { Point } from "./point";

const game: Game = new Game(Config.fromForm());

document.getElementById("controls")!.addEventListener("change", () => {
  game.updateConfig(Config.fromForm());
});

document.getElementById("analyze")!.addEventListener("click", (e) => {
  e.preventDefault();

  const analyzeX = +(document.getElementById("analyzeX")! as HTMLInputElement).value;
  const analyzeY = +(document.getElementById("analyzeY")! as HTMLInputElement).value;
  const p = new Point(analyzeX, analyzeY);
  console.log(`Analyzing ${JSON.stringify(p)}`);
  console.log(`Neighbors: `)
  for (let neighbor of p.neighbors()) {
    console.log(`\t ${JSON.stringify(neighbor)}: ${game.grid.cell(neighbor)}`) 
  }
});

// Enable bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})
