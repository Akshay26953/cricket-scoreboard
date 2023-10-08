const runsBoard = document.getElementById("runsBoard");
const oversBoard = document.getElementById("oversBoard");
const balls = document.getElementById("balls");
const extraRunBlock = document.getElementById("extraRunBlock");
const extraBtn = document.getElementById("extraBtn");
const runBtn = document.querySelectorAll(".run");
// console.log(run)

function getData() {
  return localStorage.getItem("scoreCard");
}

function showRuns() {
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  if (score.overs == null) {
    runsBoard.innerHTML = "0 / 0";
  } else {
    const data = score.overs
      .map((e, index) => {
        return `<div class="overs"><div class="overTag">Over ${
          index + 1
        }</div> <div class="over">${e
          .map((e) => {
            return `<span class="ball">${e}</span>`;
          })
          .join(" ")}</div></div>`;
      })
      .join(" ");
    runsBoard.innerHTML = score.score + " / " + score.wickets;
    oversBoard.innerHTML =
      (score.over.length == 6 ? score.overs.length : score.overs.length - 1) +
      "." +
      (score.over.length == 6 ? 0 : score.over.length) +
      " Overs";
    balls.innerHTML = data;
  }
}
showRuns();

function addRun(run) {
  if (typeof run == "string") {
    extraRunBlock.style.display = "block";
    for (let x of runBtn) {
      x.disabled = true;
    }
  }
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
    score.score += 1;
      score.extras += 1;
    }
  }

  localStorage.setItem("scoreCard", JSON.stringify(score));
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
  score.overs.pop();
  score.overs.push(score.over);
  score.score += extraRun;
  localStorage.setItem("scoreCard", JSON.stringify(score));
  for (let x of runBtn) {
    x.disabled = false;
  }
  showRuns();
}


function reset() {
  if (confirm("Do you want to reset all?")) {
    localStorage.removeItem("scoreCard");
    // localStorage.clear();
  }
  location.reload();
}
