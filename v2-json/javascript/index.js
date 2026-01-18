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
const select = document.getElementById("modelChoice");

if(select){                         /* selectが存在するページでのみ動作（後続コードの停止を防ぐ） */
  select.addEventListener("change", function() {
    if(select.value) {
      location.hash = select.value;
    }
  });
}

/*-----------------------------------------------------
JSONファイルから引用データの取得
-----------------------------------------------------*/
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");

if(quote && author && source) {
  fetch("../javascript/quoteData.json")
  .then(response => response.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const item = data[randomIndex];

    quote.textContent = `” ${item.quote} ”`;
    author.textContent = `- ${item.author}`;
    source.textContent = item.source;
  });
}