import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"],
};

document.body.insertAdjacentHTML(
  "afterbegin",
  `<style>
    #udai_chrome_extension_shorts_to_normal{
      display: none;
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
    <div id="udai_chrome_extension_shorts_to_normal">
      通常動画へ
    </div>
    `,
);
const toNormalButton = document.getElementById(
  "udai_chrome_extension_shorts_to_normal",
) as HTMLDivElement;
toNormalButton.addEventListener("click", () => {
  const id = location.href
    .split("https://www.youtube.com/shorts/")[1]
    .split("?")[0];
  location.href = `https://www.youtube.com/watch?v=${id}`;
});

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    #player.udai_chrome_extension_player {
      top: 56px !important;
      position: fixed !important;
      left: 0 !important;
      z-index: 1000 !important;
    }
    #player.udai_chrome_extension_player {
      transform-origin: top left !important;
      transform: scale(0.5) !important;
    }

    </style>`,
);
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  if (window.scrollY > 600) {
    document
      .getElementById("player")
      ?.classList.add("udai_chrome_extension_player");
  } else {
    document
      .getElementById("player")
      ?.classList.remove("udai_chrome_extension_player");
  }
});

setInterval(() => {
  if (location.href.startsWith("https://www.youtube.com/shorts/")) {
    toNormalButton.style.display = "block";
  } else {
    toNormalButton.style.display = "none";
  }
}, 1000);
