/* ==========================================
   우신고등학교 교직원 성폭력 예방교육
   app.js
========================================== */


/* ==========================================
   화면 요소
========================================== */

const startStep = document.getElementById("startStep");
const trainingStep = document.getElementById("trainingStep");
const educationStep = document.getElementById("educationStep");
const boundaryStep = document.getElementById("boundaryStep");
const quizStep = document.getElementById("quizStep");
const resultStep = document.getElementById("resultStep");
const commitmentStep = document.getElementById("commitmentStep");
const completeStep = document.getElementById("completeStep");


/* ==========================================
   버튼
========================================== */

const startButton = document.getElementById("startButton");

const finishTrainingButton =
  document.getElementById("finishTrainingButton");

const boundaryButton =
  document.getElementById("boundaryButton");

const quizStartButton =
  document.getElementById("quizStartButton");

const commitmentButton =
  document.getElementById("commitmentButton");

const completeEducationButton =
  document.getElementById("completeEducationButton");


/* ==========================================
   입력 요소
========================================== */

const nameInput =
  document.getElementById("name");

const completedName =
  document.getElementById("completedName");

const completedDate =
  document.getElementById("completedDate");


/* ==========================================
   퀴즈 요소
========================================== */

const quizProgress =
  document.getElementById("quizProgress");

const progressBar =
  document.getElementById("progressBar");

const questionNumber =
  document.getElementById("questionNumber");

const questionText =
  document.getElementById("questionText");

const choices =
  document.getElementById("choices");

const answerFeedback =
  document.getElementById("answerFeedback");

const scoreText =
  document.getElementById("scoreText");

const resultMessage =
  document.getElementById("resultMessage");


/* ==========================================
   사용자 정보
========================================== */

let userName = "";


/* ==========================================
   화면 이동 함수
========================================== */

function showStep(step) {

  const steps = [

    startStep,
    trainingStep,
    educationStep,
    boundaryStep,
    quizStep,
    resultStep,
    commitmentStep,
    completeStep

  ];


  steps.forEach(function (item) {

    item.classList.add("hidden");

  });


  step.classList.remove("hidden");


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==========================================
   STEP 1 → STEP 2
========================================== */

startButton.addEventListener("click", function () {

  userName = nameInput.value.trim();


  if (userName === "") {

    alert("성명을 입력해 주세요.");

    nameInput.focus();

    return;

  }


  showStep(trainingStep);

});


/* ==========================================
   STEP 2 → STEP 3
========================================== */

finishTrainingButton.addEventListener("click", function () {

  showStep(educationStep);

});


/* ==========================================
   STEP 3 → STEP 4
========================================== */

boundaryButton.addEventListener("click", function () {

  showStep(boundaryStep);

});


/* ==========================================
   STEP 4 → STEP 5
========================================== */

quizStartButton.addEventListener("click", function () {

  currentQuestion = 0;

  score = 0;

  showStep(quizStep);

  showQuestion();

});


/* ==========================================
   퀴즈 문제
========================================== */

const questions = [

  {
    question:
      "성폭력 예방을 위해 가장 바람직한 태도는 무엇입니까?",

    choices: [

      "상대방의 의사를 확인하고 경계를 존중한다.",
      "친한 사이면 동의가 필요 없다.",
      "불편함을 표현하지 않으면 괜찮다.",
      "상대방이 참아야 한다."

    ],

    answer: 0
  },


  {
    question:
      "직장 내 성희롱이 발생했을 때 적절하지 않은 행동은 무엇입니까?",

    choices: [

      "신뢰할 수 있는 담당자에게 상담한다.",
      "피해자의 이야기를 경청한다.",
      "피해자에 대한 소문을 퍼뜨린다.",
      "관련 절차를 확인한다."

    ],

    answer: 2
  },


  {
    question:
      "성폭력 피해 발생 시 2차 피해에 해당할 수 있는 것은 무엇입니까?",

    choices: [

      "피해 사실을 믿고 지지한다.",
      "피해자에게 책임을 묻거나 비난한다.",
      "상담기관 정보를 안내한다.",
      "개인정보를 보호한다."

    ],

    answer: 1
  },


  {
    question:
      "디지털 성범죄 예방과 관련하여 옳은 것은 무엇입니까?",

    choices: [

      "동의 없는 촬영·유포·공유는 해서는 안 된다.",
      "친구끼리는 자유롭게 공유해도 된다.",
      "장난으로 촬영해도 문제가 없다.",
      "삭제 요청은 무시해도 된다."

    ],

    answer: 0
  },


  {
    question:
      "상대방이 불편함이나 거절 의사를 표현했을 때 가장 적절한 행동은 무엇입니까?",

    choices: [

      "상대방을 설득한다.",
      "즉시 행동을 중단하고 의사를 존중한다.",
      "농담이라고 말하며 계속한다.",
      "다른 사람에게 이야기를 퍼뜨린다."

    ],

    answer: 1
  },


  {
    question:
      "친한 관계에서는 상대방의 동의가 필요하지 않다는 생각은 옳습니까?",

    choices: [

      "옳다.",
      "상황에 따라 필요 없다.",
      "친한 관계라도 상대방의 의사와 동의가 중요하다.",
      "상대방이 말하지 않으면 동의한 것이다."

    ],

    answer: 2
  },


  {
    question:
      "성폭력 피해자의 이야기를 들을 때 바람직한 태도는 무엇입니까?",

    choices: [

      "피해자의 행동을 비난한다.",
      "왜 그런 상황이 발생했는지 책임을 묻는다.",
      "피해자의 이야기를 경청하고 지지한다.",
      "다른 사람에게 내용을 공유한다."

    ],

    answer: 2
  },


  {
    question:
      "개인의 사진이나 영상을 공유하기 전에 필요한 것은 무엇입니까?",

    choices: [

      "상대방의 명확한 동의",
      "친구의 허락",
      "재미있는지 여부",
      "많은 사람이 볼 수 있는지 여부"

    ],

    answer: 0
  },


  {
    question:
      "성폭력 예방을 위해 학교 구성원이 함께 해야 할 일은 무엇입니까?",

    choices: [

      "문제가 생겨도 개인적인 일로 생각한다.",
      "서로의 경계를 존중하고 안전한 문화를 만든다.",
      "피해자의 행동을 먼저 의심한다.",
      "불편한 상황을 방관한다."

    ],

    answer: 1
  },


  {
    question:
      "안전하고 존중받는 학교 문화를 만들기 위한 가장 중요한 태도는 무엇입니까?",

    choices: [

      "서로의 의사와 경계를 존중한다.",
      "친한 사람의 행동은 모두 허용한다.",
      "불편함은 개인이 참아야 한다.",
      "성적인 농담은 항상 괜찮다."

    ],

    answer: 0
  }

];


/* ==========================================
   퀴즈 상태
========================================== */

let currentQuestion = 0;

let score = 0;


/* ==========================================
   문제 표시
========================================== */

function showQuestion() {

  const current =
    questions[currentQuestion];


  questionNumber.textContent =
    `QUESTION ${currentQuestion + 1}`;


  questionText.textContent =
    current.question;


  quizProgress.textContent =
    `${currentQuestion + 1} / ${questions.length}`;


  const progress =
    ((currentQuestion + 1) / questions.length) * 100;


  progressBar.style.width =
    `${progress}%`;


  choices.innerHTML = "";


  answerFeedback.innerHTML = "";


  current.choices.forEach(function (choice, index) {

    const button =
      document.createElement("button");


    button.type = "button";


    button.className =
      "choice-button";


    button.innerHTML =
      `<span class="choice-number">
        ${index + 1}
      </span>
      <span>
        ${choice}
      </span>`;


    button.addEventListener("click", function () {

      checkAnswer(index);

    });


    choices.appendChild(button);

  });

}


/* ==========================================
   정답 확인
========================================== */

function checkAnswer(selectedAnswer) {

  const current =
    questions[currentQuestion];


  const allButtons =
    document.querySelectorAll(
      ".choice-button"
    );


  allButtons.forEach(function (button) {

    button.disabled = true;

  });


  const isCorrect =
    selectedAnswer === current.answer;


  if (isCorrect) {

    score++;


    answerFeedback.innerHTML = `

      <div class="correct-box">

        <strong>
          🎉 정답입니다!
        </strong>

        <p>
          교육 내용을 잘 이해하셨습니다.
        </p>

      </div>

      <button
        type="button"
        class="next-question-button"
        id="nextQuestionButton"
      >
        다음 문제 →
      </button>

    `;

  } else {

    answerFeedback.innerHTML = `

      <div class="wrong-box">

        <strong>
          다시 확인해 보세요.
        </strong>

        <p>
          정답은
          <strong>
            ${current.answer + 1}번
          </strong>
          입니다.
        </p>

      </div>

      <button
        type="button"
        class="next-question-button"
        id="nextQuestionButton"
      >
        다음 문제 →
      </button>

    `;

  }


  document
    .getElementById("nextQuestionButton")
    .addEventListener(
      "click",
      nextQuestion
    );

}


/* ==========================================
   다음 문제
========================================== */

function nextQuestion() {

  currentQuestion++;


  if (
    currentQuestion <
    questions.length
  ) {

    showQuestion();

  } else {

    showResult();

  }

}


/* ==========================================
   퀴즈 결과
========================================== */

function showResult() {

  showStep(resultStep);


  const finalScore =
    score * 10;


  scoreText.textContent =
    finalScore;


  if (finalScore === 100) {

    resultMessage.textContent =
      "🎉 모든 문제를 맞혔습니다! 교육 내용을 매우 잘 이해하셨습니다.";

  } else if (finalScore >= 70) {

    resultMessage.textContent =
      "교육 내용을 잘 이해하셨습니다.";

  } else {

    resultMessage.textContent =
      "교육 내용을 다시 한번 확인해 주세요.";

  }

}


/* ==========================================
   STEP 6 → STEP 7
========================================== */

commitmentButton.addEventListener("click", function () {

  showStep(commitmentStep);

});


/* ==========================================
   STEP 7 → STEP 8
========================================== */

completeEducationButton.addEventListener(
  "click",
  function () {

    const checks =
      document.querySelectorAll(
        ".commitmentCheck"
      );


    let allChecked = true;


    checks.forEach(function (check) {

      if (!check.checked) {

        allChecked = false;

      }

    });


    if (!allChecked) {

      alert(
        "실천 다짐 항목을 모두 확인해 주세요."
      );

      return;

    }


    showComplete();

  }
);


/* ==========================================
   최종 완료 화면
========================================== */

function showComplete() {

  showStep(completeStep);


  completedName.textContent =
    userName;


  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      now.getDate()
    ).padStart(
      2,
      "0"
    );


  const hour =
    String(
      now.getHours()
    ).padStart(
      2,
      "0"
    );


  const minute =
    String(
      now.getMinutes()
    ).padStart(
      2,
      "0"
    );


  completedDate.textContent =
    `완료 일시: ${year}.${month}.${day} ${hour}:${minute}`;

}
