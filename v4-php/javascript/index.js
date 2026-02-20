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
      
      const target = document.querySelector(selectModel.value);
      if(target) {
        target.scrollIntoView({behavior: "smooth"});
      }
    }
  });
}

const selectSection = document.getElementById("sectionChoice");

if(selectSection){                         /* 存在するページでのみ動作（後続コードの停止を防ぐ） */
  selectSection.addEventListener("change", function() {
    if(selectSection.value) {

      const target = document.querySelector(selectSelection.value);
      if(target) {
        target.scrollIntoView({behavior: "smooth"});
      }
    }
  });
}

/*-----------------------------------------------------
DBから引用データの取得
-----------------------------------------------------*/

function loadQuote() {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const source = document.getElementById("source");

  if(quote && author && source) {
    fetch("../php/get-quote.php")
    .then(response => {
        if(!response.ok) throw new Error('ネットワークエラー');
        return response.json();
    })
    .then(item => {
      quote.innerText = `” ${item.quote} ”`;
      author.innerText = `- ${item.author}`;
      source.innerText = item.source;
    })
    .catch(error => console.error("データの取得に失敗しました:", error));
  };
}

loadQuote();

/*-----------------------------------------------------
ボタンクリックで引用データの更新
-----------------------------------------------------*/

const reloadQuote = document.getElementById("reloadQuote");

if(reloadQuote) {
    reloadQuote.addEventListener("click", loadQuote);
}


/*-----------------------------------------------------
管理者ログインモーダル
-----------------------------------------------------*/
const modal = document.getElementById("loginModal");
const overlay = document.querySelector('.modal-overlay');
const openModal = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-button");

// 「管理者ログイン」ボタンをクリックしたら表示
openModal.onclick = function() {
    modal.style.display = "flex";
}

// ×をクリックしたら非表示
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 暗い部分をクリックしても閉じるようにする
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ログイン後モーダルを閉じフォームを空にする
function closeModalAfterLogin() {
    
    setTimeout(() => {
        
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
        
        if (overlay) {
            overlay.style.display = 'none';
        }


    }, 500);        /* 時間をずらして確実に送信できるようにする */
}