const runsBoard = document.getElementById("runsBoard");
const oversBoard = document.getElementById("oversBoard");
const balls = document.getElementById("balls");
const range = document.getElementById("range");
const rangeNumber = document.getElementById("rangeNumber");
const extraRunBlock = document.getElementById("extraRunBlock");
// const extraRun = document.getElementsByClassName("extraRun");
const extraBtn = document.getElementById("extraBtn");

let scoreSheet;

function getData() {
  return localStorage.getItem("scoreCard");
}

function showRuns() {
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  if (score.overs == null) {
    runsBoard.innerHTML = "0/0";
  } else {
    const data = score.overs
      .map((e, index) => {
        return `<div><span>Over ${index + 1}</span> : ${e
          .map((e) => {
            return `<span>${e}</span>`;
          })
          .join(" ")}</div>`;
      })
      .join(" ");
    runsBoard.innerHTML = score.score + "/" + score.wickets;
    oversBoard.innerHTML =
      (score.over.length == 6 ? score.overs.length : score.overs.length - 1) +
      "." +
      (score.over.length == 6 ? 0 : score.over.length) + " Overs";
    balls.innerHTML = data;
  }
}
showRuns();

function addRun(run) {
  if (typeof run == "string") {
    extraRunBlock.style.display = "block";
  }
  updateOver(run);
}

function addExtraRun(extraRun) {
  extraRunBlock.style.display = "none";
  const score = JSON.parse(getData());
  score.extraRun = extraRun;
  if (extraRun == 0) {
    run = score.over.pop();
  } else {
    run = extraRun + "+" + score.over.pop();
  }
  score.over.push(run);
  console.log(run);
  localStorage.setItem("scoreCard", JSON.stringify(score));
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
      extraRun: 0,
    };
  } else {
    scoreSheet = JSON.parse(score);
  }
  updateScore(run, scoreSheet);
  showRuns();
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
