const runsBoard = document.getElementById("runsBoard");
const balls = document.getElementById("balls");
const range = document.getElementById("range");
const rangeNumber = document.getElementById("rangeNumber");
const extraRun = document.getElementById("extraRun");
const extraBtn = document.getElementById("extraBtn");

let scoreSheet;

function getData() {
  return localStorage.getItem("scoreCard");
}

function addRun(run) {
  updateOver(run);
}

function updateOver(run) {
  const score = getData();

  if (score == null) {
    scoreSheet = {
      target: 0,
      overs: [],
      over: [],
      score: 0,
      wickets: 0,
      extras: 0,
    };
  } else {
    scoreSheet = JSON.parse(score);
  }
  updateScore(run, scoreSheet);
}

function updateScore(run, score) {
  if (score.over.length - score.extras > 5) {
    score.over = [];
    score.extras = 0;
  } else {
    score.overs.pop();
  }
  score.overs.push(score.over);
  score.over.push(run);
  countScore(run, score);
}

function countScore(run, score) {
  if (typeof run == "number") {
    score.score += run;
  } else {
    if (run == "W") {
      score.wickets += 1;
    } else {
      score.extras += 1;
    }
  }
  localStorage.setItem("scoreCard", JSON.stringify(score));
}


