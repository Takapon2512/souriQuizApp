const $question_num = document.getElementById("question__num");
const $question = document.getElementById("ques");
const $generation_num = document.getElementById("generation__num");
const $name = document.getElementById("name");
const $button = document.getElementsByClassName("btn");
const $buttons = document.getElementById("buttons");
const $nextButton = document.getElementById("next");

let quizIndex = 0;
let score = 0;
let question_num = 1;
let generation_num = 1;

//問題文と選択肢を設定
function SetupQuiz() {
    $question.textContent = questions[quizIndex].question;
    $question_num.textContent = question_num;
    $generation_num.textContent = questions[quizIndex].generation;
    $name.textContent = questions[quizIndex].name;

    for(let i = 0; i < $button.length; i++) {
        $button[i].textContent = questions[quizIndex].answer[i];
    }
    
}

SetupQuiz();
$buttons.classList.remove("back");

function clickHandler(event) {
    $nextButton.classList.remove("back");

    if(questions[quizIndex].correct === event.target.textContent) {
        score++;
        $question.textContent = "正解です！";
    } else {
        $question.textContent = `...不正解です。正解は「${questions[quizIndex].correct}」です。`;
    }

    for(let i = 0; i < $button.length; i++) {
        $button[i].disabled = true;
    }
    
    quizIndex++;
    question_num++;

}

//クリックイベント
for(let i = 0; i < questions[quizIndex].answer.length; i++) {
    $button[i].addEventListener('click', (event) => {
        clickHandler(event);
    });
}

//次へボタンのクリックイベント
$nextButton.addEventListener('click', () => {
    if (quizIndex < questions.length) {
        $nextButton.classList.add("back");
        for(let i = 0; i < $button.length; i++) {
            $button[i].disabled = false;
        }
        SetupQuiz();
    } else {
        let correctRatio = (score / questions.length) * 100;

        clearInterval(timeId);

        $buttons.classList.add("back");

        $question.textContent = `終了！あなたの正解数は${questions.length}問中${score}問で、正解率は${correctRatio}％です。`;
        $nextButton.classList.remove("back");
        
        $nextButton.addEventListener('click', () => {
            $question.textContent = "お疲れ様でした！";
            $nextButton.textContent = "最初の画面へ";

            $nextButton.addEventListener('click', () => {
                location.replace("index.html");
            });
        });
    }
});

// 制限時間機能
let startTime = 600;

const $min = document.getElementById("min");
const $sec = document.getElementById("sec");

let timeId = setInterval(countDown, 1000);
timeId;

function countDown() {
    if (startTime === 0) {
        timeUp();
    } else {
        startTime--;
        showTime();
    }
}

function showTime() {
    let min = 0;
    let sec = 0;
    
    min = Math.floor(startTime / 60);
    sec = startTime % 60;
    
    $min.textContent = min;
    $sec.textContent = sec;

    if(min <= 9) {
        $min.textContent = "0" + String(min);
    }
    if(sec <= 9) {
        $sec.textContent = "0" + String(sec);
    }
}

function timeUp() {
    let correctRatio = (score / questions.length) * 100;

    showTime();
    clearTimeout(timeId);

    $buttons.classList.add("back");
    $question.textContent = "時間となりましたのでクイズは終了です。";

    $nextButton.classList.remove("back");

    $nextButton.addEventListener('click', () => {
        $nextButton.classList.remove("back");
        $question.textContent = `あなたの正解数は${questions.length}問中${score}問で、正解率は${correctRatio}％です。`;

        $nextButton.addEventListener('click', () => {
            $question.textContent = "お疲れ様でした！";
            $nextButton.textContent = "最初の画面へ";

            $nextButton.addEventListener('click', () => {
                location.replace("index.html");
            });
        });
    });
}