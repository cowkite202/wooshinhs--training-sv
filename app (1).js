/* =====================================================
   Google Apps Script
===================================================== */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyhzMPqDxjDzufeQK8bGx1w_pHgXmojpt_kfgJ9Ye36dNA68SQ6s8GO5B7LsePFiY_m/exec";


/* =====================================================
   기본 변수
===================================================== */

let userName = "";
let currentPage = 0;
let currentBoundaryPage = -1;

let currentQuestion = 0;
let score = 0;
let retryUsed = false;
let answers = [];

let canvas = null;
let ctx = null;
let hasSignature = false;
let drawing = false;


/* =====================================================
   6개 교육 내용
===================================================== */

const trainingPages = [

  {
    title: "성폭력의 이해",
    icon: "🛡️",
    color: "purple",

    content: `
      <div class="visual-card visual-purple">

        <div class="visual-icon">🛡️</div>

        <div class="visual-title">
          존중은 예방의 시작입니다
        </div>

        <div class="visual-text">
          성폭력 예방은 특별한 상황에서만 필요한 것이 아니라
          <strong><u>일상적인 말과 행동에서 시작됩니다.</u></strong>
        </div>

      </div>

      <h3>성폭력이란?</h3>

      <p>
        성폭력은 상대방의 의사에 반하여 이루어지는
        <strong><u>성적인 말이나 행동</u></strong>으로
        상대방에게 불쾌감이나 수치심 등을 느끼게 하는 행위를 포함합니다.
      </p>

      <div class="info-box">

        <strong>📌 중요한 점</strong>

        <p>
          행위자의 의도만으로 판단하지 않습니다.
          <strong><u>상대방이 어떻게 받아들였는지도 중요합니다.</u></strong>
        </p>

      </div>

      <p>
        "농담이었다", "친해서 그랬다",
        "그럴 의도는 없었다"는 이유만으로
        상대방의 불편함이 사라지는 것은 아닙니다.
      </p>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <u>
            내 의도보다 상대방의 입장과 경계를 먼저 생각합니다.
          </u>
        </p>

      </div>
    `
  },


  {
    title: "직장 내 성희롱 예방",
    icon: "🤝",
    color: "blue",

    content: `
      <div class="visual-card visual-blue">

        <div class="visual-icon">🤝</div>

        <div class="visual-title">
          학교도 안전한 일터여야 합니다
        </div>

        <div class="visual-text">
          학생뿐만 아니라
          <strong><u>모든 교직원이 존중받는 환경</u></strong>을 만들어야 합니다.
        </div>

      </div>

      <h3>직장 내 성희롱 예방</h3>

      <p>
        학교는 교육기관인 동시에
        여러 사람이 함께 일하는
        <strong>직장</strong>이기도 합니다.
      </p>

      <p>
        외모, 신체, 연애, 결혼 등에 대한
        불필요한 질문이나 농담은 피해야 합니다.
      </p>

      <div class="info-box">

        <strong>⚠️ 이런 말은 주의하세요</strong>

        <p>
          "살 빠졌네."<br>
          "요즘 예뻐졌네."<br>
          "남자친구 있어?"<br>
          "결혼은 언제 할 거야?"
        </p>

      </div>

      <p>
        친한 관계라고 해서
        모든 말이 허용되는 것은 아닙니다.
        <strong><u>상대방의 경계를 존중하는 것이 중요합니다.</u></strong>
      </p>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <u>친밀함보다 존중을 우선합니다.</u>
        </p>

      </div>
    `
  },


  {
    title: "동의와 개인적 경계",
    icon: "✋",
    color: "green",

    content: `
      <div class="visual-card visual-green">

        <div class="visual-icon">✋</div>

        <div class="visual-title">
          멈춰야 한다는 신호를 존중하세요
        </div>

        <div class="visual-text">
          상대방의 의사와 경계를 존중하는 것은
          <strong><u>모든 관계의 기본입니다.</u></strong>
        </div>

      </div>

      <h3>동의란 무엇인가?</h3>

      <p>
        동의는 상대방이 자신의 의사를
        <strong><u>자유롭게 표현하고 선택하는 것</u></strong>입니다.
      </p>

      <p>
        상대방이 침묵했다고 해서
        동의한 것은 아닙니다.
      </p>

      <p>
        상대방이 불편해하거나 거절한다면
        <strong><u>즉시 행동을 멈추어야 합니다.</u></strong>
      </p>

      <div class="info-box">

        <strong>💡 기억하세요</strong>

        <p>
          친한 사이인지 여부와 관계없이
          상대방의 경계는 존중되어야 합니다.
        </p>

      </div>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <u>침묵은 동의가 아닙니다.</u><br>
          <u>거절이나 불편함의 표현을 존중합니다.</u>
        </p>

      </div>
    `
  },


  {
    title: "피해자 보호와 2차 피해 예방",
    icon: "❤️",
    color: "orange",

    content: `
      <div class="visual-card visual-orange">

        <div class="visual-icon">❤️</div>

        <div class="visual-title">
          피해자의 입장에서 생각합니다
        </div>

        <div class="visual-text">
          피해 사실을 알게 되었을 때에는
          <strong><u>비난보다 보호와 지원이 우선입니다.</u></strong>
        </div>

      </div>

      <h3>2차 피해란?</h3>

      <p>
        피해 사실을 알게 된 사람이 피해자를 비난하거나,
        소문을 퍼뜨리거나,
        피해 사실을 반복해서 이야기하게 하는 등의 행동은
        <strong><u>2차 피해가 될 수 있습니다.</u></strong>
      </p>

      <div class="info-box">

        <strong>❌ 피해야 할 말</strong>

        <p>
          "왜 그런 행동을 했어?"<br>
          "그때 왜 바로 말하지 않았어?"<br>
          "네가 오해한 것 아닐까?"
        </p>

      </div>

      <div class="info-box">

        <strong>⭕ 도움이 되는 태도</strong>

        <p>
          "말해줘서 고마워."<br>
          "네 잘못이 아니야."<br>
          "필요한 도움을 받을 수 있도록 함께 알아보자."
        </p>

      </div>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <u>피해자를 의심하거나 비난하지 않습니다.</u>
        </p>

      </div>
    `
  },


  {
    title: "디지털 성범죄 예방",
    icon: "📱",
    color: "pink",

    content: `
      <div class="visual-card visual-pink">

        <div class="visual-icon">📱</div>

        <div class="visual-title">
          온라인에서도 책임은 같습니다
        </div>

        <div class="visual-text">
          온라인 공간이라고 해서
          <strong><u>말과 행동에 대한 책임이 가벼워지는 것은 아닙니다.</u></strong>
        </div>

      </div>

      <h3>디지털 성범죄 예방</h3>

      <p>
        사진이나 영상 등을 상대방의 동의 없이
        촬영하거나 저장하거나 공유해서는 안 됩니다.
      </p>

      <p>
        단체대화방에서 성적인 사진이나 농담 등이 올라왔을 때
        <strong><u>웃음이나 이모티콘으로 동조하지 않습니다.</u></strong>
      </p>

      <div class="info-box">

        <strong>📱 온라인에서 특히 주의할 것</strong>

        <p>
          • 사진·영상의 무단 촬영<br>
          • 동의 없는 공유<br>
          • 성적인 농담이나 이미지 전달<br>
          • 피해자의 개인정보 유포
        </p>

      </div>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <u>
            온라인에서도 오프라인과 같은 존중의 기준을 적용합니다.
          </u>
        </p>

      </div>
    `
  },


  {
    title: "안전한 학교문화 만들기",
    icon: "🌱",
    color: "teal",

    content: `
      <div class="visual-card visual-teal">

        <div class="visual-icon">🌱</div>

        <div class="visual-title">
          안전한 학교문화는 함께 만듭니다
        </div>

        <div class="visual-text">
          작은 말과 행동의 변화가
          <strong><u>서로 존중하는 학교문화를 만듭니다.</u></strong>
        </div>

      </div>

      <h3>안전한 학교문화를 위해</h3>

      <p>
        성폭력 예방은 특정한 사람만의 책임이 아닙니다.
        <strong><u>학교 구성원 모두의 책임</u></strong>입니다.
      </p>

      <p>
        불편한 상황을 발견했을 때에는
        그냥 지나치기보다 적절한 방법으로 도움을 요청하고
        필요한 경우 관련 절차에 따라 대응해야 합니다.
      </p>

      <div class="info-box">

        <strong>🌱 우리가 실천할 것</strong>

        <p>
          ① 상대방의 경계를 존중하기<br>
          ② 불필요한 성적 언행 하지 않기<br>
          ③ 피해자를 비난하지 않기<br>
          ④ 온라인에서도 책임 있게 행동하기<br>
          ⑤ 서로 안전하게 말할 수 있는 분위기 만들기
        </p>

      </div>

      <div class="key-message">

        <strong>핵심 기억하기</strong>

        <p>
          <strong><u>존중 · 배려 · 책임</u></strong>
        </p>

      </div>
    `
  }

];


/* =====================================================
   교직원으로서 지켜야 할 경계
===================================================== */

const boundaryPages = [

  {
    title: "교직원으로서 지켜야 할 경계 · 1",

    content: `

      <div class="boundary-hero">

        <div class="boundary-hero-icon">🚦</div>

        <div>

          <h2>전문적인 경계를 지켜주세요</h2>

          <p>
            학교에서는 친근함보다
            <strong><u>전문성과 존중</u></strong>이 중요합니다.
          </p>

        </div>

      </div>


      <div class="boundary-item">

        <h3>① 학생의 외모와 사생활</h3>

        <p>
          학생의 외모, 체형, 연애, 가족관계 등
          <strong><u>사적인 영역에 대한 불필요한 언급은 피합니다.</u></strong>
        </p>

        <div class="info-box">

          <strong>예를 들어</strong>

          <p>
            "요즘 몸이 좋아졌네."<br>
            "여자친구 있어?"<br>
            "너 인기 많겠다."
          </p>

          <p>
            친근함의 표현이라도 학생에게
            불편함을 줄 수 있습니다.
          </p>

        </div>

        <p class="boundary-key">
          <strong>💡 핵심:</strong>
          <strong><u>학생의 사생활보다 교육적 관계를 우선합니다.</u></strong>
        </p>

      </div>


      <div class="boundary-item">

        <h3>② 학생과의 신체 접촉</h3>

        <p>
          격려나 친근함을 표현하기 위한 행동이라도
          <strong><u>불필요한 신체 접촉은 줄이는 것이 좋습니다.</u></strong>
        </p>

        <p>
          특히 반복적인 어깨·등 만지기,
          장난을 이유로 한 신체 접촉 등은 주의합니다.
        </p>

        <div class="info-box">

          <strong>⚠️ 기억하세요</strong>

          <p>
            학생이 특별히 싫다고 말하지 않았더라도
            <strong>
              교직원의 입장에서는 전문적인 경계를 지키는 것이 중요합니다.
            </strong>
          </p>

        </div>

        <p class="boundary-key">
          <strong>💡 핵심:</strong>
          <strong><u>친근함도 상대방의 경계를 넘지 않아야 합니다.</u></strong>
        </p>

      </div>


      <div class="boundary-item">

        <h3>③ 학생과의 장난과 성적인 농담</h3>

        <p>
          "남학생끼리니까 괜찮다"거나
          "장난일 뿐이다"라는 이유로
          <strong><u>성적인 농담이나 부적절한 표현에 참여해서는 안 됩니다.</u></strong>
        </p>

        <div class="info-box">

          <strong>⚠️ 특히 주의하세요</strong>

          <p>
            학생이 먼저 성적인 농담을 시작했다고 하더라도
            교직원이 함께 참여하는 것은 적절하지 않습니다.
          </p>

        </div>

        <p class="boundary-key">
          <strong>💡 핵심:</strong>
          <strong><u>장난이라는 이유로 전문적인 경계가 사라지는 것은 아닙니다.</u></strong>
        </p>

      </div>


      <div class="info-box boundary-final">

        <strong>🌱 1페이지 핵심 기억하기</strong>

        <p>
          학생과의 관계에서는
          <strong><u>친밀함보다 전문성</u></strong>을 우선합니다.
        </p>

      </div>

    `
  },


  {
    title: "교직원으로서 지켜야 할 경계 · 2",

    content: `

      <div class="boundary-hero">

        <div class="boundary-hero-icon">🤝</div>

        <div>

          <h2>모든 관계에서 존중을 선택합니다</h2>

          <p>
            학생과 동료 교직원을 대할 때에도
            <strong><u>존중과 전문적인 관계의 기준</u></strong>을 지켜야 합니다.
          </p>

        </div>

      </div>


      <div class="boundary-item">

        <h3>④ 학생과의 개인적인 연락</h3>

        <p>
          학생과의 연락은
          <strong><u>교육적 목적과 범위 안에서 이루어지도록 합니다.</u></strong>
        </p>

        <p>
          늦은 시간의 사적인 대화,
          불필요한 개인적인 연락,
          지나치게 친밀한 관계로 이어지는 연락은 주의합니다.
        </p>

        <div class="info-box">

          <strong>💡 기억하세요</strong>

          <p>
            학생과의 관계에서는
            개인적인 친밀함보다
            <strong>교직원으로서의 전문적인 관계</strong>를 우선합니다.
          </p>

        </div>

      </div>


      <div class="boundary-item">

        <h3>⑤ 동료 교직원과의 말과 행동</h3>

        <p>
          친한 동료라 하더라도
          외모, 연애, 결혼, 사생활 등에 대한
          <strong><u>불필요한 언급이나 성적인 농담은 피해야 합니다.</u></strong>
        </p>

        <div class="info-box">

          <strong>⚠️ 중요한 원칙</strong>

          <p>
            친한 사이인지 여부와 관계없이
            <strong>
              상대방이 불편함을 표현했다면
              즉시 해당 말이나 행동을 멈춥니다.
            </strong>
          </p>

        </div>

      </div>


      <div class="boundary-item">

        <h3>⑥ 회식과 단체대화방에서도 같은 기준</h3>

        <p>
          회식 자리나 교직원 단체대화방에서도
          학교 안에서와 같은
          <strong><u>존중의 기준을 지켜야 합니다.</u></strong>
        </p>

        <p>
          성적인 농담이나 이미지가 올라왔을 때
          웃음이나 이모티콘으로 동조하거나
          다른 사람에게 다시 전달하지 않습니다.
        </p>

        <div class="info-box">

          <strong>📱 온라인에서도 주의하세요</strong>

          <p>
            온라인 공간이라고 해서
            책임이 가벼워지는 것은 아닙니다.
            <strong><u>불필요한 확산이나 동조를 하지 않습니다.</u></strong>
          </p>

        </div>

      </div>


      <div class="info-box boundary-final">

        <strong>🌱 2페이지 핵심 기억하기</strong>

        <p>
          <strong>
            친근함보다 존중,
            의도보다 상대방의 입장,
            사적인 관계보다 전문적인 관계
          </strong>
          를 선택합니다.
        </p>

        <p>
          <strong><u>
            "내 의도가 좋았는가?"보다
            "상대방은 어떻게 느꼈는가?"를 생각합니다.
          </u></strong>
        </p>

      </div>

    `
  }

];


/* =====================================================
   13문제
===================================================== */

const questions = [

  {
    question: "성폭력 예방을 위해 가장 바람직한 태도는 무엇입니까?",
    choices: [
      "상대방의 의사를 확인하고 경계를 존중한다.",
      "친한 사이면 동의가 필요 없다.",
      "불편함을 표현하지 않으면 괜찮다.",
      "상대방이 참아야 한다."
    ],
    answer: 0,
    explanation:
      "상대방의 의사와 경계를 존중하는 것이 성폭력 예방의 기본입니다."
  },

  {
    question: "상대방이 불편함을 표현했을 때 가장 적절한 행동은?",
    choices: [
      "농담이었으니 계속한다.",
      "상대방이 예민하다고 말한다.",
      "즉시 행동을 멈추고 상대방의 의사를 존중한다.",
      "다른 사람에게 상황을 이야기한다."
    ],
    answer: 2,
    explanation:
      "상대방이 불편함을 표현했다면 즉시 행동을 멈추고 경계를 존중해야 합니다."
  },

  {
    question: "다음 중 2차 피해에 해당할 수 있는 행동은?",
    choices: [
      "피해자의 이야기를 경청한다.",
      "피해자를 비난하거나 소문을 퍼뜨린다.",
      "필요한 지원을 안내한다.",
      "피해자의 의사를 존중한다."
    ],
    answer: 1,
    explanation:
      "피해자를 비난하거나 소문을 퍼뜨리는 행동은 2차 피해가 될 수 있습니다."
  },

  {
    question: "피해 사실을 알게 된 동료의 태도로 가장 적절한 것은?",
    choices: [
      "왜 그런 행동을 했는지 따진다.",
      "사실인지 주변 사람에게 확인한다.",
      "피해자를 비난하지 않고 필요한 도움을 받을 수 있도록 지원한다.",
      "다른 사람에게 자세한 내용을 이야기한다."
    ],
    answer: 2,
    explanation:
      "피해자를 비난하지 않고 보호하며 필요한 지원을 받을 수 있도록 돕는 것이 중요합니다."
  },

  {
    question: "성폭력 예방의 책임은 누구에게 있습니까?",
    choices: [
      "피해자에게만 있다.",
      "관리자에게만 있다.",
      "교사에게만 있다.",
      "학교 구성원 모두에게 있다."
    ],
    answer: 3,
    explanation:
      "안전한 학교문화를 만드는 것은 학교 구성원 모두의 책임입니다."
  },

  {
    question: "동의에 대한 설명으로 옳은 것은?",
    choices: [
      "침묵하면 동의한 것이다.",
      "친한 사이에서는 동의가 필요 없다.",
      "상대방의 자유로운 의사에 따른 동의가 중요하다.",
      "한 번 동의하면 언제나 동의한 것이다."
    ],
    answer: 2,
    explanation:
      "동의는 상대방의 자유로운 의사에 따라 이루어져야 합니다."
  },

  {
    question: "안전한 학교문화에 필요한 것은?",
    choices: [
      "문제 제기를 어렵게 한다.",
      "상호 존중을 실천한다.",
      "불편함을 개인적으로 참도록 한다.",
      "직급에 따라 기준을 다르게 적용한다."
    ],
    answer: 1,
    explanation:
      "상호 존중과 안전한 의사표현이 가능한 조직문화를 만드는 것이 중요합니다."
  },

  {
    question: "디지털 성범죄 예방과 관련하여 옳은 것은?",
    choices: [
      "친한 사람의 사진은 허락 없이 공유해도 된다.",
      "단체대화방에서는 책임이 없다.",
      "동의 없이 촬영하거나 공유하지 않는다.",
      "온라인에서는 장난으로 성적인 사진을 보내도 된다."
    ],
    answer: 2,
    explanation:
      "사진이나 영상은 반드시 상대방의 동의를 존중해야 하며 무단 촬영과 공유를 하지 않아야 합니다."
  },

  {
    question:
      "체육활동 후 교사가 학생에게 '요즘 몸이 좋아졌네. 여자친구 생기겠어.'라고 말했습니다. 가장 적절한 판단은?",
    choices: [
      "학생에게 친근하게 말한 것이므로 괜찮다.",
      "학생이 웃었으므로 문제가 없다.",
      "학생의 외모와 사생활에 대한 불필요한 언급이 될 수 있으므로 주의해야 한다.",
      "친한 학생에게는 언제든지 할 수 있는 말이다."
    ],
    answer: 2,
    explanation:
      "학생의 외모나 연애 등 사적인 영역에 대한 불필요한 언급은 전문적인 경계를 침해할 수 있습니다."
  },

  {
    question:
      "교사가 학생을 격려한다는 이유로 어깨나 등을 반복해서 만지고 있습니다. 가장 적절한 행동은?",
    choices: [
      "격려 목적이면 반복적으로 해도 괜찮다.",
      "학생이 싫다고 하지 않았으므로 계속한다.",
      "불필요한 신체 접촉을 줄이고 학생의 경계를 존중한다.",
      "친한 학생에게는 더 자주 한다."
    ],
    answer: 2,
    explanation:
      "격려 목적이라 하더라도 불필요하거나 반복적인 신체 접촉은 줄이고 전문적인 경계를 지켜야 합니다."
  },

  {
    question:
      "교사가 '남학생들끼리니까 괜찮다'며 학생들의 성적인 농담에 함께 웃고 참여했습니다. 가장 적절한 판단은?",
    choices: [
      "남학생끼리라면 괜찮다.",
      "장난이므로 문제가 없다.",
      "교직원은 성적인 농담에 참여하지 않고 전문적인 경계를 지켜야 한다.",
      "학생이 먼저 시작했으므로 책임이 없다."
    ],
    answer: 2,
    explanation:
      "학생이 먼저 성적인 농담을 시작했더라도 교직원이 함께 참여하는 것은 적절하지 않습니다."
  },

  {
    question:
      "교직원 단체대화방에 특정 교직원의 외모나 연애를 소재로 한 성적인 농담이 올라왔습니다. 가장 적절한 행동은?",
    choices: [
      "재미있으므로 이모티콘으로 동조한다.",
      "다른 단체대화방에 전달한다.",
      "온라인에서도 존중의 기준을 지키고 불필요한 확산이나 동조를 하지 않는다.",
      "친한 동료에 대한 농담이면 괜찮다."
    ],
    answer: 2,
    explanation:
      "온라인에서도 오프라인과 같은 존중의 기준을 적용해야 하며 불필요한 확산이나 동조를 하지 않아야 합니다."
  },

  {
    question:
      "친한 동료에게 농담을 했는데 상대방이 '그런 이야기는 불편하다.'라고 말했습니다. 가장 적절한 행동은?",
    choices: [
      "친한 사이니까 계속 농담한다.",
      "상대방이 예민하다고 말한다.",
      "즉시 해당 말이나 행동을 멈추고 상대방의 의사를 존중한다.",
      "다른 동료에게 재미있는 이야기라고 전달한다."
    ],
    answer: 2,
    explanation:
      "친밀한 관계라도 상대방이 불편함을 표현했다면 즉시 멈추고 경계를 존중해야 합니다."
  }

];


/* =====================================================
   맨 위로
===================================================== */

function scrollTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   모든 단계 숨기기
===================================================== */

function hideAllSteps() {

  const ids = [
    "start",
    "videoStep",
    "trainingStep",
    "quizStep",
    "resultStep",
    "messageStep",
    "surveyStep",
    "completeStep"
  ];

  ids.forEach(function (id) {

    const element =
      document.getElementById(id);

    if (element) {
      element.classList.add("hidden");
    }

  });

}


/* =====================================================
   교육 시작
===================================================== */

async function startTraining() {

  const input =
    document.getElementById("name");

  userName =
    input.value.trim();

  if (!userName) {

    alert("성명을 입력해 주세요.");

    input.focus();

    return;

  }

  const button =
    document.getElementById("startButton");

  if (button) {

    button.disabled = true;

    button.innerText =
      "이수 여부 확인 중...";

  }

  try {

    const response =
      await fetch(
        GOOGLE_SCRIPT_URL +
        "?action=check&name=" +
        encodeURIComponent(userName)
      );

    const data =
      await response.json();

    console.log(
      "이수 여부 확인 결과:",
      data
    );

    if (data.completed) {

      alert(
        userName +
        " 선생님은 이미 교육을 이수하셨습니다."
      );

      if (button) {

        button.disabled = false;

        button.innerText =
          "교육 시작하기";

      }

      return;

    }

    hideAllSteps();

    document
      .getElementById("videoStep")
      .classList
      .remove("hidden");

    scrollTop();

  } catch (error) {

    console.error(
      "이수 여부 확인 오류:",
      error
    );

    alert(
      "이수 여부 확인 중 오류가 발생했습니다.\n" +
      "잠시 후 다시 시도해 주세요."
    );

    if (button) {

      button.disabled = false;

      button.innerText =
        "교육 시작하기";

    }

  }

}


/* =====================================================
   교육 내용 시작
===================================================== */

function showTrainingPages() {

  hideAllSteps();

  currentPage = 0;
  currentBoundaryPage = -1;

  document
    .getElementById("trainingStep")
    .classList
    .remove("hidden");

  renderTrainingPage();

}


/* =====================================================
   교육 진행률
===================================================== */

function updateTrainingProgress() {

  const bar =
    document.getElementById(
      "trainingProgressBar"
    );

  if (!bar) return;

  const total =
    trainingPages.length +
    boundaryPages.length;

  const current =
    currentPage + 1;

  const percent =
    Math.round(
      current / total * 100
    );

  bar.style.width =
    percent + "%";

}


/* =====================================================
   일반 교육 페이지
===================================================== */

function renderTrainingPage() {

  const container =
    document.getElementById(
      "trainingContent"
    );

  const progress =
    document.getElementById(
      "trainingProgress"
    );

  const nextButton =
    document.getElementById(
      "trainingNextButton"
    );

  if (!container || !nextButton) {
    return;
  }

  const page =
    trainingPages[currentPage];

  container.innerHTML = `

    <div class="training-page-header">

      <div class="training-page-number">
        ${currentPage + 1}
      </div>

      <div>

        <h2>
          ${page.title}
        </h2>

        <p class="hint">
          교육 내용 ${currentPage + 1} /
          ${trainingPages.length}
        </p>

      </div>

    </div>

    ${page.content}

    <label class="confirm-check">

      <input
        type="checkbox"
        id="pageCheck"
        onchange="toggleTrainingButton()"
      >

      <span>
        위 내용을 확인하고 숙지했습니다.
      </span>

    </label>

  `;

  if (progress) {

    progress.innerText =
      "교육 내용 " +
      (currentPage + 1) +
      " / " +
      trainingPages.length;

  }

  updateTrainingProgress();

  nextButton.disabled = true;

  nextButton.innerText =
    currentPage === trainingPages.length - 1
      ? "교직원으로서 지켜야 할 경계 →"
      : "다음 페이지 →";

  scrollTop();

}


/* =====================================================
   교육 확인
===================================================== */

function toggleTrainingButton() {

  const check =
    document.getElementById(
      "pageCheck"
    );

  const button =
    document.getElementById(
      "trainingNextButton"
    );

  if (check && button) {

    button.disabled =
      !check.checked;

  }

}


/* =====================================================
   다음 교육
===================================================== */

function nextTrainingPage() {

  if (currentBoundaryPage >= 0) {

    nextBoundaryPage();

    return;

  }

  const check =
    document.getElementById(
      "pageCheck"
    );

  if (!check || !check.checked) {

    alert(
      "교육 내용을 확인했다는 항목에 체크해 주세요."
    );

    return;

  }

  if (
    currentPage <
    trainingPages.length - 1
  ) {

    currentPage++;

    renderTrainingPage();

  } else {

    showBoundarySection();

  }

}


/* =====================================================
   경계교육 시작
===================================================== */

function showBoundarySection() {

  currentBoundaryPage = 0;

  renderBoundaryPage();

}


/* =====================================================
   경계 진행률
===================================================== */

function updateBoundaryProgress() {

  const bar =
    document.getElementById(
      "trainingProgressBar"
    );

  if (!bar) return;

  const total =
    trainingPages.length +
    boundaryPages.length;

  const current =
    trainingPages.length +
    currentBoundaryPage +
    1;

  const percent =
    Math.round(
      current / total * 100
    );

  bar.style.width =
    percent + "%";

}


/* =====================================================
   경계 페이지
===================================================== */

function renderBoundaryPage() {

  const container =
    document.getElementById(
      "trainingContent"
    );

  const nextButton =
    document.getElementById(
      "trainingNextButton"
    );

  const progress =
    document.getElementById(
      "trainingProgress"
    );

  if (!container || !nextButton) {
    return;
  }

  const page =
    boundaryPages[currentBoundaryPage];

  container.innerHTML = `

    <div class="training-page-header">

      <div class="training-page-number">
        ${currentBoundaryPage + 1}
      </div>

      <div>

        <h2>
          ${page.title}
        </h2>

        <p class="hint">
          교직원으로서 지켜야 할 경계
          ${currentBoundaryPage + 1}
          /
          ${boundaryPages.length}
        </p>

      </div>

    </div>

    ${page.content}

    <label class="confirm-check">

      <input
        type="checkbox"
        id="boundaryCheck"
        onchange="toggleBoundaryButton()"
      >

      <span>
        위 내용을 확인하고 숙지했습니다.
      </span>

    </label>

  `;

  if (progress) {

    progress.innerText =
      "교직원으로서 지켜야 할 경계 " +
      (currentBoundaryPage + 1) +
      " / " +
      boundaryPages.length;

  }

  updateBoundaryProgress();

  nextButton.disabled = true;

  nextButton.innerText =
    currentBoundaryPage === boundaryPages.length - 1
      ? "13문제 퀴즈 시작하기 →"
      : "다음 페이지 →";

  scrollTop();

}


/* =====================================================
   경계 체크
===================================================== */

function toggleBoundaryButton() {

  const check =
    document.getElementById(
      "boundaryCheck"
    );

  const button =
    document.getElementById(
      "trainingNextButton"
    );

  if (check && button) {

    button.disabled =
      !check.checked;

  }

}


/* =====================================================
   다음 경계
===================================================== */

function nextBoundaryPage() {

  const check =
    document.getElementById(
      "boundaryCheck"
    );

  if (!check || !check.checked) {

    alert(
      "위 내용을 확인했다는 항목에 체크해 주세요."
    );

    return;

  }

  if (
    currentBoundaryPage <
    boundaryPages.length - 1
  ) {

    currentBoundaryPage++;

    renderBoundaryPage();

  } else {

    startQuiz();

  }

}


/* =====================================================
   퀴즈 시작
===================================================== */

function startQuiz() {

  currentBoundaryPage = -1;

  currentQuestion = 0;

  score = 0;

  retryUsed = false;

  answers = [];

  hideAllSteps();

  document
    .getElementById("quizStep")
    .classList
    .remove("hidden");

  renderQuestion();

  scrollTop();

}


/* =====================================================
   퀴즈 진행률
===================================================== */

function updateQuizProgress() {

  const bar =
    document.getElementById(
      "quizProgressBar"
    );

  if (!bar) return;

  const percent =
    Math.round(
      (currentQuestion + 1) /
      questions.length *
      100
    );

  bar.style.width =
    percent + "%";

}


/* =====================================================
   문제 표시
===================================================== */

function renderQuestion() {

  const container =
    document.getElementById(
      "quizContent"
    );

  const progress =
    document.getElementById(
      "quizProgress"
    );

  const question =
    questions[currentQuestion];

  retryUsed = false;

  if (progress) {

    progress.innerText =
      "문제 " +
      (currentQuestion + 1) +
      " / " +
      questions.length;

  }

  updateQuizProgress();

  container.innerHTML = `

    <div class="question-card">

      <h3>
        Q${currentQuestion + 1}.
      </h3>

      <p class="question-text">
        ${question.question}
      </p>

      <div class="choices">

        ${question.choices
          .map(function (choice, index) {

            return `

              <button
                type="button"
                class="choice-button"
                data-index="${index}"
                onclick="checkAnswer(${index})"
              >

                <span class="choice-number">
                  ${index + 1}
                </span>

                <span>
                  ${choice}
                </span>

              </button>

            `;

          })
          .join("")}

      </div>

      <div id="answerFeedback"></div>

    </div>

  `;

}


/* =====================================================
   정답 확인
===================================================== */

function checkAnswer(selectedIndex) {

  const question =
    questions[currentQuestion];

  const feedback =
    document.getElementById(
      "answerFeedback"
    );

  if (!feedback) {
    return;
  }

  const buttons =
    document.querySelectorAll(
      ".choice-button"
    );

  buttons.forEach(function (button) {
    button.disabled = true;
  });


  if (
    selectedIndex ===
    question.answer
  ) {

    score++;

    answers[currentQuestion] =
      selectedIndex;

    feedback.innerHTML = `

      <div class="correct-box">

        <strong>
          ⭕ 정답입니다!
        </strong>

        <p>
          ${question.explanation}
        </p>

        <button
          type="button"
          class="next-question-button"
          onclick="nextQuestion()"
        >
          다음 문제 →
        </button>

      </div>

    `;

  } else {

    if (!retryUsed) {

      retryUsed = true;

      buttons.forEach(function (button) {
        button.disabled = false;
      });

      feedback.innerHTML = `

        <div class="wrong-box">

          <strong>
            ❌ 다시 생각해 보세요.
          </strong>

          <p>
            한 번 더 선택할 수 있습니다.
          </p>

        </div>

      `;

    } else {

      answers[currentQuestion] =
        selectedIndex;

      feedback.innerHTML = `

        <div class="wrong-box">

          <strong>
            ❌ 아쉽습니다.
          </strong>

          <p>
            ${question.explanation}
          </p>

          <button
            type="button"
            class="next-question-button"
            onclick="nextQuestion()"
          >
            다음 문제 →
          </button>

        </div>

      `;

    }

  }

}


/* =====================================================
   다음 문제
===================================================== */

function nextQuestion() {

  if (
    currentQuestion <
    questions.length - 1
  ) {

    currentQuestion++;

    renderQuestion();

    scrollTop();

  } else {

    showResult();

  }

}


/* =====================================================
   결과
===================================================== */

function showResult() {

  hideAllSteps();

  const resultStep =
    document.getElementById(
      "resultStep"
    );

  const points =
    Math.round(
      score /
      questions.length *
      100
    );

  const passed =
    points >= 80;

  resultStep.innerHTML = `

    <div class="step-badge">
      STEP 4 · 교육 결과
    </div>

    <div class="result-icon">
      ${passed ? "🎉" : "📚"}
    </div>

    <h2>
      교육 확인 퀴즈 결과
    </h2>

    <div class="score-circle">

      <strong>
        ${points}
      </strong>

      <span>점</span>

    </div>

    <p class="result-detail">

      총 ${questions.length}문제 중
      <strong>${score}문제</strong>
      정답

    </p>

    ${
      passed
        ? `

          <div class="correct-box">

            <strong>
              🎉 교육 내용을 잘 확인하셨습니다.
            </strong>

            <p>
              다음 단계에서 실천 다짐을 작성해 주세요.
            </p>

          </div>

        `
        : `

          <div class="info-box">

            <strong>
              📚 교육 내용을 다시 한번 확인해 주세요.
            </strong>

            <p>
              퀴즈 결과와 관계없이
              교육 내용을 충분히 숙지하는 것이 중요합니다.
            </p>

          </div>

        `
    }

    <button
      type="button"
      id="resultNextButton"
    >
      다음 단계 →
    </button>

  `;

  resultStep
    .classList
    .remove("hidden");

  document
    .getElementById("resultNextButton")
    .addEventListener(
      "click",
      showKeyMessage
    );

  scrollTop();

}


/* =====================================================
   실천 다짐
===================================================== */

function showKeyMessage() {

  hideAllSteps();

  const messageStep =
    document.getElementById(
      "messageStep"
    );

  messageStep.innerHTML = `

    <div class="step-badge">
      STEP 5 · 실천 다짐
    </div>

    <div class="visual-card visual-green">

      <div class="visual-icon">
        🌱
      </div>

      <div class="visual-title">
        우리는 이렇게 행동하겠습니다
      </div>

      <div class="visual-text">
        서로 존중하고 안전한 학교문화를 만들기 위해
        오늘 배운 내용을 실천하겠습니다.
      </div>

    </div>

    <h2>
      나의 실천 다짐
    </h2>

    <p class="step-description">
      아래 5가지 실천 다짐을 모두 확인하고 체크해 주세요.
    </p>

    <div class="commitment-list">

      <label>
        <input
          type="checkbox"
          class="commitment-check"
        >
        <span>
          상대방의 의사와 개인적인 경계를 존중하겠습니다.
        </span>
      </label>

      <label>
        <input
          type="checkbox"
          class="commitment-check"
        >
        <span>
          학생과 동료 교직원에게 전문적인 관계의 기준을 지키겠습니다.
        </span>
      </label>

      <label>
        <input
          type="checkbox"
          class="commitment-check"
        >
        <span>
          성적인 농담이나 불필요한 신체 접촉을 하지 않겠습니다.
        </span>
      </label>

      <label>
        <input
          type="checkbox"
          class="commitment-check"
        >
        <span>
          피해자를 비난하거나 2차 피해를 만들지 않겠습니다.
        </span>
      </label>

      <label>
        <input
          type="checkbox"
          class="commitment-check"
        >
        <span>
          온라인에서도 책임 있는 행동을 하겠습니다.
        </span>
      </label>

    </div>


    <div class="signature-section">

      <h3>서명</h3>

      <p class="hint">
        실천 다짐 5개를 모두 체크한 후
        아래 영역에 마우스 또는 손가락으로 서명해 주세요.
      </p>

      <div class="signature-wrap">

        <canvas
          id="signatureCanvas"
          width="700"
          height="250"
        ></canvas>

      </div>

      <div class="signature-buttons">

        <button
          type="button"
          id="clearSignatureButton"
        >
          서명 지우기
        </button>

        <button
          type="button"
          id="confirmSignatureButton"
          disabled
        >
          서명 완료 →
        </button>

      </div>

    </div>

  `;

  messageStep
    .classList
    .remove("hidden");

  setupSignature();

  setupCommitments();

  scrollTop();

}


/* =====================================================
   실천 다짐 체크
===================================================== */

function setupCommitments() {

  const checks =
    document.querySelectorAll(
      ".commitment-check"
    );

  const signatureButton =
    document.getElementById(
      "confirmSignatureButton"
    );

  checks.forEach(function (check) {

    check.addEventListener(
      "change",
      function () {

        const label =
          check.closest("label");

        if (label) {

          label.classList.toggle(
            "checked",
            check.checked
          );

        }

        updateSignatureButton();

      }
    );

  });

  if (signatureButton) {
    signatureButton.disabled = true;
  }

}


/* =====================================================
   서명 설정
===================================================== */

function setupSignature() {

  canvas =
    document.getElementById(
      "signatureCanvas"
    );

  if (!canvas) {
    return;
  }

  ctx =
    canvas.getContext("2d");

  hasSignature = false;
  drawing = false;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#222";


  function getPosition(event) {

    const rect =
      canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (
      event.touches &&
      event.touches.length > 0
    ) {

      clientX =
        event.touches[0].clientX;

      clientY =
        event.touches[0].clientY;

    } else {

      clientX =
        event.clientX;

      clientY =
        event.clientY;

    }

    return {

      x:
        (clientX - rect.left) *
        (canvas.width / rect.width),

      y:
        (clientY - rect.top) *
        (canvas.height / rect.height)

    };

  }


  function startDrawing(event) {

    event.preventDefault();

    drawing = true;

    const position =
      getPosition(event);

    ctx.beginPath();

    ctx.moveTo(
      position.x,
      position.y
    );

  }


  function draw(event) {

    if (!drawing) {
      return;
    }

    event.preventDefault();

    const position =
      getPosition(event);

    ctx.lineTo(
      position.x,
      position.y
    );

    ctx.stroke();

    hasSignature = true;

    updateSignatureButton();

  }


  function stopDrawing(event) {

    if (!drawing) {
      return;
    }

    if (event) {
      event.preventDefault();
    }

    drawing = false;

    ctx.closePath();

    updateSignatureButton();

  }


  canvas.addEventListener(
    "mousedown",
    startDrawing
  );

  canvas.addEventListener(
    "mousemove",
    draw
  );

  canvas.addEventListener(
    "mouseup",
    stopDrawing
  );

  canvas.addEventListener(
    "mouseleave",
    stopDrawing
  );

  canvas.addEventListener(
    "touchstart",
    startDrawing,
    { passive: false }
  );

  canvas.addEventListener(
    "touchmove",
    draw,
    { passive: false }
  );

  canvas.addEventListener(
    "touchend",
    stopDrawing,
    { passive: false }
  );


  const clearButton =
    document.getElementById(
      "clearSignatureButton"
    );

  if (clearButton) {

    clearButton.addEventListener(
      "click",
      function () {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        hasSignature = false;

        updateSignatureButton();

      }
    );

  }


  const confirmButton =
    document.getElementById(
      "confirmSignatureButton"
    );

  if (confirmButton) {

    confirmButton.addEventListener(
      "click",
      confirmSignature
    );

  }

}


/* =====================================================
   서명 버튼 상태
===================================================== */

function updateSignatureButton() {

  const button =
    document.getElementById(
      "confirmSignatureButton"
    );

  const checks =
    document.querySelectorAll(
      ".commitment-check"
    );

  let allChecked =
    checks.length === 5;

  checks.forEach(function (check) {

    if (!check.checked) {
      allChecked = false;
    }

  });

  if (button) {

    button.disabled =
      !(hasSignature && allChecked);

  }

}


/* =====================================================
   서명 완료
===================================================== */

function confirmSignature() {

  const checks =
    document.querySelectorAll(
      ".commitment-check"
    );

  let allChecked = true;

  checks.forEach(function (check) {

    if (!check.checked) {
      allChecked = false;
    }

  });


  if (!allChecked) {

    alert(
      "5가지 실천 다짐을 모두 체크해 주세요."
    );

    return;

  }


  if (!hasSignature) {

    alert(
      "서명을 먼저 작성해 주세요."
    );

    return;

  }


  showSurvey();

}


/* =====================================================
   만족도
===================================================== */

function showSurvey() {

  hideAllSteps();

  document
    .getElementById("surveyStep")
    .classList
    .remove("hidden");

  scrollTop();

}


/* =====================================================
   교육 완료 저장
===================================================== */

async function completeTraining(event) {

  if (event) {
    event.preventDefault();
  }


  const understanding =
    document.getElementById(
      "understanding"
    ).value;

  const usefulness =
    document.getElementById(
      "usefulness"
    ).value;

  const comment =
    document.getElementById(
      "comment"
    ).value.trim();


  if (!understanding) {

    alert(
      "교육 내용의 이해도를 선택해 주세요."
    );

    return;

  }


  if (!usefulness) {

    alert(
      "교육의 유익함을 선택해 주세요."
    );

    return;

  }


  if (
    !canvas ||
    !hasSignature
  ) {

    alert(
      "서명을 먼저 작성해 주세요."
    );

    return;

  }


  const button =
    document.getElementById(
      "completeButton"
    );

  if (button) {

    button.disabled = true;

    button.innerText =
      "교육 이수 기록 저장 중...";

  }


  const points =
    Math.round(
      score /
      questions.length *
      100
    );


  const signature =
    canvas.toDataURL(
      "image/png"
    );


  const data = {

    name:
      userName,

    score:
      points,

    signature:
      signature,

    understanding:
      understanding,

    usefulness:
      usefulness,

    comment:
      comment

  };


  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {

        method: "POST",

        mode: "no-cors",

        headers: {

          "Content-Type":
            "text/plain;charset=utf-8"

        },

        body:
          JSON.stringify(data)

      }
    );


    showComplete();


  } catch (error) {

    console.error(
      "교육 완료 저장 오류:",
      error
    );

    alert(
      "교육 이수 기록 저장 중 오류가 발생했습니다.\n" +
      "잠시 후 다시 시도해 주세요."
    );

    if (button) {

      button.disabled = false;

      button.innerText =
        "교육 완료하기";

    }

  }

}


/* =====================================================
   완료 화면
===================================================== */

function showComplete() {

  hideAllSteps();

  const completeStep =
    document.getElementById(
      "completeStep"
    );

  const points =
    Math.round(
      score /
      questions.length *
      100
    );


  completeStep.innerHTML = `

    <div class="completion-icon">
      🎉
    </div>

    <div class="step-badge">
      교육 이수 완료
    </div>

    <h2>
      ${userName} 선생님,<br>
      교육이 완료되었습니다.
    </h2>

    <div class="completion-card">

      <p>
        2026학년도 우신고등학교
      </p>

      <p>
        교직원 성폭력 예방교육
      </p>

      <strong>
        퀴즈 점수 ${points}점
      </strong>

      <p>
        교육 이수 기록이 정상적으로 저장되었습니다.
      </p>

    </div>

    <div class="key-message">

      <strong>
        🌱 오늘의 약속
      </strong>

      <p>
        <u>
          친근함보다 존중,<br>
          의도보다 상대방의 입장,<br>
          사적인 관계보다 전문적인 관계를 선택하겠습니다.
        </u>
      </p>

    </div>

    <p class="completion-thanks">
      안전하고 존중받는 학교문화를 함께 만들어 주셔서 감사합니다.
    </p>

  `;

  completeStep
    .classList
    .remove("hidden");

  scrollTop();

}
