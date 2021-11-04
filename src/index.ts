import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import { Config } from "./config";
import { Game } from "./game";

const game: Game = new Game(Config.fromForm());

document.getElementById("controls")!.addEventListener("change", () => {
  game.updateConfig(Config.fromForm());
});

// Enable bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})
