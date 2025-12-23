/*-----------------------------------------------------
ホバー時のみサイトタイトルを変更する(幅700px以上)
-----------------------------------------------------*/
const siteTitleText  = document.getElementById("site-title-text");
const mediaQuery = window.matchMedia("(min-width: 700px)");

function onEnter() {
  siteTitleText.textContent = "Osaki Genta";
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
    siteTitleText.removeEventListenerListener("mouseleave", onLeave);
    siteTitleText.textContent = "O.G.";
  }
}

triggerLogoText(mediaQuery);
mediaQuery.addEventListener("change", triggerLogoText);

/*-----------------------------------------------------
selectメニューをページ内リンクにする
-----------------------------------------------------*/
const select = document.getElementById("modelChoice");

select.addEventListener("change", function() {
  if(select.value) {
    location.hash = select.value;
  }
});