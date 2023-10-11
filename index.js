const runsBoard = document.getElementById("runsBoard");
const oversBoard = document.getElementById("oversBoard");
const balls = document.getElementById("balls");
const extraRunBlock = document.getElementById("extraRunBlock");
const extraBtn = document.getElementById("extraBtn");
const runBtn = document.querySelectorAll(".run");

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
            // let ball;
            if (e[0] == "W" || e[2] == "W") {
              return `<span class="ball wkt">${e}</span>`;
            } else if (e == 6 || e[0] == "6") {
              return `<span class="ball six">${e}</span>`;
            } else if (e == 4 || e[0] == "4") {
              return `<span class="ball four">${e}</span>`;
            } else {
              return `<span class="ball">${e}</span>`;
            }
            // return ball;
          })
          .join(" ")}</div></div>`;
      })
      .join(" ");
    runsBoard.innerHTML = score.score + " / " + score.wickets;
    oversBoard.innerHTML =
      (score.over.length - score.extras >= 6
        ? score.overs.length
        : score.overs.length - 1) +
      "." +
      (score.over.length - score.extras >= 6
        ? 0
        : score.over.length - score.extras) +
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

function resetLast() {
  const reset = confirm("Do you want to delete last entry?");
  if (reset) {
    const score = JSON.parse(getData());
    const data = score.over.pop();
    if (typeof data == "number") {
      score.score -= data;
    } else {
      if (data[2] == "n" || data[2] == "w") {
        score.score -= Number(data[0]) + 1;
        score.extras -= 1;
      } else if (data[2] == "W") {
        score.score -= Number(data[0]);
        score.wickets -= 1;
      }
    }
    score.overs.pop();
    score.overs.push(score.over);
    localStorage.setItem("scoreCard", JSON.stringify(score));
  }
  showRuns();
}

function reset() {
  if (confirm("Do you want to reset all?")) {
    localStorage.removeItem("scoreCard");
  }
  location.reload();
}
