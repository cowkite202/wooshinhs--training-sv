const startButton = document.getElementById("startButton");
const finishTrainingButton = document.getElementById("finishTrainingButton");

const startStep = document.getElementById("startStep");
const trainingStep = document.getElementById("trainingStep");
const completeStep = document.getElementById("completeStep");

const nameInput = document.getElementById("name");
const completedName = document.getElementById("completedName");
const completedDate = document.getElementById("completedDate");

let userName = "";


/* 교육 시작하기 */
startButton.addEventListener("click", function () {

  userName = nameInput.value.trim();

  if (userName === "") {
    alert("성명을 입력해 주세요.");
    nameInput.focus();
    return;
  }

  startStep.classList.add("hidden");
  trainingStep.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* 교육 완료 */
finishTrainingButton.addEventListener("click", function () {

  trainingStep.classList.add("hidden");
  completeStep.classList.remove("hidden");

  completedName.textContent = userName;

  const now = new Date();

  const dateText =
    now.getFullYear() + "." +
    String(now.getMonth() + 1).padStart(2, "0") + "." +
    String(now.getDate()).padStart(2, "0");

  completedDate.textContent =
    "완료 일자: " + dateText;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
