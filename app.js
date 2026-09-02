const startButton = document.getElementById("startButton");
const finishTrainingButton = document.getElementById("finishTrainingButton");

const startStep = document.getElementById("startStep");
const trainingStep = document.getElementById("trainingStep");
const completeStep = document.getElementById("completeStep");

const nameInput = document.getElementById("name");
const completedName = document.getElementById("completedName");
const completedDate = document.getElementById("completedDate");

let userName = "";


/* ========================================
   교육 시작하기
======================================== */

startButton.addEventListener("click", function () {

  userName = nameInput.value.trim();

  if (userName === "") {
    alert("성명을 입력해 주세요.");
    nameInput.focus();
    return;
  }

  // 시작 화면 숨기기
  startStep.classList.add("hidden");

  // 교육 화면 보이기
  trainingStep.classList.remove("hidden");

  // 완료 화면은 숨기기
  completeStep.classList.add("hidden");

  // 화면 맨 위로 이동
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ========================================
   교육 완료하기
======================================== */

finishTrainingButton.addEventListener("click", function () {

  // 교육 화면 숨기기
  trainingStep.classList.add("hidden");

  // 완료 화면 보이기
  completeStep.classList.remove("hidden");

  // 이름 표시
  completedName.textContent = userName;

  // 현재 날짜 표시
  const now = new Date();

  const dateText =
    now.getFullYear() + "년 " +
    (now.getMonth() + 1) + "월 " +
    now.getDate() + "일";

  completedDate.textContent =
    "교육 완료일 : " + dateText;

  // 화면 맨 위로 이동
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
