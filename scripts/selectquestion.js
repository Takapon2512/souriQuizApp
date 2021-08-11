//問題の中から10問選ぶ
const quesNum = 10; //作成する配列の個数
let questions = []; //問題を格納する配列を初期化


//ランダムな10個の整数1桁の配列を生成し重複を削除
let numAry = Array.from(new Set(Array(quesNum).fill().map(x => ~~(Math.random() * quiz.length))));

//除去後の配列の個数
let remNum = quesNum - numAry.length;

if(remNum != 0) {
    //配列の個数が10になるまで実行
    for(let remNum; numAry.length < quesNum;) {
        numAry = Array.from(new Set([...numAry, ...Array(remNum).fill().map(x => ~~(Math.random() * quiz.length))]));
    }
}

//問題をquestionsに格納
for(let i = 0; i < numAry.length; i++) {
    questions[i] = quiz[numAry[i]];
}