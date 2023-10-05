const runsBoard = document.getElementById("runsBoard");
const balls = document.getElementById("balls");

function showRuns() {
  const overs = JSON.parse(localStorage.getItem("overs"));
  if (overs == null) {
    runsBoard.innerHTML = "0/0";
  } else {
    const data = overs
      .map((e, index) => {
        return `<div><span>Over ${index + 1}</span> : ${e
          .map((e) => {
            return `<span>${e}</span>`;
          })
          .join(" ")}</div>`;
      })
      .join(" ");

    balls.innerHTML = data;
  }
}
showRuns();

let oversArr;
let overArr;

// Add Runs - Done
function addRun(run) {
  storeRuns(run);
}

// Store Runs in Over Arrays
function storeRuns(run) {
  const over = localStorage.getItem("over");
  if (over == null) {
    overArr = [];
  } else {
    overArr = JSON.parse(over);
  }
  overArr.push(run);
  localStorage.setItem("over", JSON.stringify(overArr));
  storeOvers(overArr);
  showRuns();
}

// Store Overs
function storeOvers(overArr) {
  const overs = localStorage.getItem("overs");
  if (overArr.length > 5) {
    if (overs == null) {
      oversArr = [];
    } else {
      oversArr = JSON.parse(overs);
    }
    oversArr.push(overArr);
    localStorage.setItem("overs", JSON.stringify(oversArr));
    localStorage.removeItem("over");
  }
}

// Reset Last entery - Done
function reset() {
  if (confirm("Do you want to delete last entry?")) {
    const over = JSON.parse(localStorage.getItem("over"));
    over.pop();
    localStorage.removeItem("over");
    localStorage.setItem("over", JSON.stringify(over));
    console.log(over);
  }
}
