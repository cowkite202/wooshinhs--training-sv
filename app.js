/* ==========================================
   우신고등학교 교직원 성폭력 예방교육
   app.js
========================================== */


/* ==========================================
   요소 가져오기
========================================== */

const startStep = document.getElementById("startStep");
const trainingStep = document.getElementById("trainingStep");
const completeStep = document.getElementById("completeStep");

const nameInput = document.getElementById("name");

const startButton = document.getElementById("startButton");
const finishTrainingButton =
  document.getElementById("finishTrainingButton");

const completedName =
  document.getElementById("completedName");

const completedDate =
  document.getElementById("completedDate");


/* ==========================================
   사용자 이름
========================================== */

let userName = "";


/* ==========================================
   교육 시작 버튼
========================================== */

startButton.addEventListener("click", function () {

  userName = nameInput.value.trim();


  /* 이름을 입력하지 않은 경우 */

  if (userName === "") {

    alert("성명을 입력해 주세요.");

    nameInput.focus();

    return;

  }


  /* 시작 화면 숨기기 */

  startStep.classList.add("hidden");


  /* 교육 화면 보이기 */

  trainingStep.classList.remove("hidden");


  /* 맨 위로 이동 */

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});


/* ==========================================
   교육 완료 버튼
========================================== */

finishTrainingButton.addEventListener("click", function () {


  /* 교육 화면 숨기기 */

  trainingStep.classList.add("hidden");


  /* 완료 화면 보이기 */

  completeStep.classList.remove("hidden");


  /* 이름 표시 */

  completedName.textContent = userName;


  /* 현재 날짜 표시 */

  const now = new Date();


  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const hour = String(
    now.getHours()
  ).padStart(2, "0");

  const minute = String(
    now.getMinutes()
  ).padStart(2, "0");


  completedDate.textContent =
    `완료 일시: ${year}.${month}.${day} ${hour}:${minute}`;


  /* 맨 위로 이동 */

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});
