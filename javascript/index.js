/*-----------------------------------------------------
ホバー時のみサイトタイトルを変更する(幅700px以上)
-----------------------------------------------------*/
const siteTitleText  = document.getElementById("site-title-text");
const mediaQuery = window.matchMedia("(min-width: 700px)");

function onEnter() {
  siteTitleText.textContent = "Welcome";
}

function onLeave() {
  siteTitleText.textContent = "O.G.";
}

function triggerLogoText(e) {       /*(eはmatchMediaの情報)*/
  if (e.matches) {
    siteTitleText.addEventListener("mouseenter", onEnter);
    siteTitleText.addEventListener("mouseleave", onLeave);
  } else {
    siteTitleText.removeEventListener("mouseenter", onEnter);
    siteTitleText.removeEventListener("mouseleave", onLeave);
    siteTitleText.textContent = "O.G.";
  }
}

triggerLogoText(mediaQuery);
mediaQuery.addEventListener("change", triggerLogoText);

/*-----------------------------------------------------
selectメニューをページ内リンクにする
-----------------------------------------------------*/
const selectModel = document.getElementById("modelChoice");

if(selectModel){                         /* 存在するページでのみ動作（後続コードの停止を防ぐ） */
  selectModel.addEventListener("change", function() {
    if(selectModel.value) {
      location.hash = selectModel.value;
    }
  });
}

const selectSection = document.getElementById("sectionChoice");

if(selectSection){                         /* 存在するページでのみ動作（後続コードの停止を防ぐ） */
  selectSection.addEventListener("change", function() {
    if(selectSection.value) {
      location.hash = selectSection.value;
    }
  });
}

/*-----------------------------------------------------
JSONファイルから引用データの取得
-----------------------------------------------------*/

let lastIndex = -1;                 /* 同じ引用が連続で出るのを防止 */

function loadQuote() {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const source = document.getElementById("source");

  let randomIndex;

  if(quote && author && source) {
    fetch("javascript/quoteData.json")
    .then(response => response.json())
    .then(data => {
      do {
        randomIndex = Math.floor(Math.random() * data.length);
      } while (randomIndex === lastIndex);

      lastIndex = randomIndex;

      const item = data[randomIndex];

      quote.textContent = `” ${item.quote} ”`;
      author.textContent = `- ${item.author}`;
      source.textContent = item.source;
    });
  };
}

loadQuote();

/*-----------------------------------------------------
ボタンクリックで引用データの更新
-----------------------------------------------------*/

const reloadQuote = document.getElementById("reloadQuote");

reloadQuote.addEventListener("click", loadQuote);