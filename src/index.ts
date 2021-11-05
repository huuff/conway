import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import { Config } from "./config";
import { Game } from "./game";

const game: Game = new Game(Config.fromForm());

const controls = document.getElementById("controls")!;
controls.addEventListener("change", () => {
  game.updateConfig(Config.fromForm());
});

const resetAnalysisButton = document.getElementById("resetAnalysis")!;
resetAnalysisButton.addEventListener("click", () => {
  (document.getElementById("analyzeX")! as HTMLInputElement).value = "";
  (document.getElementById('analyzeY')! as HTMLInputElement).value = "";
  controls.dispatchEvent(new Event("change"));
});

// Enable bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})
