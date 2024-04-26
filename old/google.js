function googleClassAuto() {
  if (
    location.href.includes("https://classroom.google.com/u/0/") ||
    location.href === "https://classroom.google.com"
  ) {
    chrome.storage.local.get(
      { data: { googleClassUser: 0 } },
      function (items) {
        const user = Number(items.data.googleClassUser); //ここの値を、実際に転移したい先のURLの数字に設定してください　 https://classroom.google.com/u/ここの数字/h
        if (user != 0) {
          window.location = `https://classroom.google.com/u/${user}/h`;
          setInterval(function () {
            const btn = document.querySelector(".uArJ5e UQuaGc.Y5sE8d");
            if (btn) {
              window.location = `https://classroom.google.com/u/${user}/h`;
            }
          }, 100);
        }
      }
    );
  }
}

youtubeShorts();
function youtubeShorts() {
  if (location.href.startsWith("https://www.youtube.com/shorts/")) {
    const id = location.href
      .split("https://www.youtube.com/shorts/")[1]
      .split("?")[0];

    console.log({ id });

    this.document.body.insertAdjacentHTML(
      "afterbegin",
      `<style>
    #udai_chrome_extension_shorts_to_normal{
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 140px;
      height: 45px;
      line-height: 45px;
      background-color: #3182ce;
      color: #fff;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      z-index: 9999999;
      font-size: 16px;
      user-select: none;
    }
    #udai_chrome_extension_shorts_to_normal:hover {
      background-color: #2b6cb0;
    }
    </style>
    <a href="https://www.youtube.com/watch?v=${id}">
    <div id="udai_chrome_extension_shorts_to_normal">
      通常動画へ
    </div>
    </a>
    `
    );
  }
}
