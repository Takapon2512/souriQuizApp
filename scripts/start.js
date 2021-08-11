const $scroll_text = document.getElementById("scroll-text");
const $scroll_move = document.getElementById("scroll-move");
const $ruleBox = document.getElementsByClassName("rulebox");

//スクロールボタンがクリックされたとき
$scroll_text.addEventListener('click', () => {
    scroll();
});

$scroll_move.addEventListener('click', () => {
    scroll();
});

//スクロール
function scroll() {
    const $ruleSec = document.getElementById("rule");
    const ruleSecPos = $ruleSec.getBoundingClientRect();

    window.scrollTo({
        top: ruleSecPos.top,
        behavior: 'smooth'
    });
}

//高さ統一
let rulebox_h = [];
for(let i = 0; i < $ruleBox.length; i++) {
    rulebox_h[i] = $ruleBox[i].offsetHeight;
}

const rulebox_maxH = Math.max(...rulebox_h);
if(rulebox_h[0] != rulebox_h[1] || rulebox_h[0] != rulebox_h[2]) {
    rulebox_h[1] = rulebox_maxH;
    rulebox_h[2] = rulebox_maxH;
}

for(let i = 1; i < rulebox_h.length; i++) {
    $ruleBox[i].style.height = rulebox_h[i] + "px";
}