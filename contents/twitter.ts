import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"],
};

if (location.href.includes("https://twitter.com/")) {
  console.log("[Amgm_Script{Twitter}] start: Twitter_TLAutoReload v.0.2.0");
  let $header = null;
  const $mark = document.createElement("div"),
    $point = document.createElement("div");

  $mark.classList.add("Amgm_mark");
  $mark.setAttribute(
    "style",
    `
        width: 40px;
        height: 40px;
        position: relative;
        display: inline-block;`,
  );
  $point.setAttribute(
    "style",
    `
        width: 12px;
        height: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        background-color: #4AF;
        box-shadow: 0 4px 12px #4AF8;`,
  );
  $mark.appendChild($point);

  const changeReloadDisplay = () => {
    updateMark();
    const $effect = document.createElement("div");
    $effect.setAttribute(
      "style",
      `
            width: 12px;
            height: 12px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            background-color: #FA4;
            opacity: 1;
            transition: 0s;`,
    );
    $mark.insertBefore($effect, $point);
    $point.style.backgroundColor = "#FA4";
    $point.style.transition = "0s";
    setTimeout(() => {
      $effect.style.width = "40px";
      $effect.style.height = "40px";
      $effect.style.opacity = "0";
      $effect.style.backgroundColor = "#4AF";
      $effect.style.transition = ".75s ease-out";
      $point.style.backgroundColor = "#4AF";
      $point.style.transition = ".5s";
      setTimeout(() => {
        $effect.remove();
      }, 1200);
    });
  };

  const updateMark = () => {
    const _$header = document.querySelector("#react-root main h2");
    if ($header !== _$header && _$header != null) {
      $header = _$header;
    }
    if ($header && !$header.querySelector(".Amgm_mark")) {
      const $span = $header.querySelector(":scope > span");
      if ($span == null) return;
      $header.prepend($mark);
      $header.style = `
                display: flex;
                align-items: center;`;
    }
  };

  const reloadTL = (callbackFunc = () => {}) => {
    const homeButton: HTMLElement = document.querySelector(
      '[data-testid="AppTabBar_Home_Link"]',
    );
    if (homeButton != null) {
      console.log("tried reloading");
      try {
        homeButton.click();
      } catch (e) {
        console.log(e);
      }
      callbackFunc();
    } else {
    }
  };

  setInterval(
    () =>
      window.scrollY <= 200 &&
      /twitter\.com\/home/.test(location.href) &&
      reloadTL(changeReloadDisplay),
    6000,
  );

  setInterval(updateMark, 200);

  const keyInfo = {
    pressed: new Set(),
  };
  let isBoosting = false;
  document.addEventListener("keydown", (e) => {
    keyInfo.pressed.add(e.keyCode);
    if (keyInfo.pressed.has(16) && keyInfo.pressed.has(17)) {
      if (!isBoosting) {
        isBoosting = true;
        const reload = () => {
          if (isBoosting) {
            reloadTL(changeReloadDisplay);
            setTimeout(reload, 500);
          }
        };
        reload();
      }
    } else {
      isBoosting = false;
    }
  });
  document.addEventListener("keyup", (e) => {
    keyInfo.pressed.delete(e.keyCode);
    isBoosting = false;
  });

  console.log(
    "[Amgm_Script{Twitter}] start: Twitter_tweetMillisecondTime v.0.1.1",
  );

  const setMilliseconds = () => {
    for (const $article of document.querySelectorAll("article")) {
      if (
        $article.querySelector(".Amgm_setMilliseconds_time") ||
        errorArticles.has($article)
      )
        continue;
      if (
        $article.innerHTML.includes(
          // eslint-disable-next-line max-len
          "M20.75 2H3.25C2.007 2 1 3.007 1 4.25v15.5C1 20.993 2.007 22 3.25 22h17.5c1.243 0 2.25-1.007 2.25-2.25V4.25C23 3.007 21.993 2 20.75 2zM17.5 13.504c0 .483-.392.875-.875.875s-.875-.393-.875-.876V9.967l-7.547 7.546c-.17.17-.395.256-.62.256s-.447-.086-.618-.257c-.342-.342-.342-.896 0-1.237l7.547-7.547h-3.54c-.482 0-.874-.393-.874-.876s.392-.875.875-.875h5.65c.483 0 .875.39.875.874v5.65z",
        )
      ) {
        // const $wrap = $article.closest("section > div > div > div");//プロモーション削除(失敗)
        // $wrap.children[0].remove();
        // $wrap.remove();
        continue;
      }
      const tweetId =
        $article
          .querySelector("time")
          ?.closest("a")
          ?.getAttribute("href")
          ?.match(/status\/([0-9]+)/)?.[1] ??
        [...($article.querySelectorAll("a[href]") || [])]
          .find(($a) => $a.getAttribute("href")?.match(/status\/([0-9]+)/))
          ?.getAttribute("href")
          ?.match(/status\/([0-9]+)/)[1];
      if (!tweetId) {
        errorArticles.add($article); ///console.error($article);
        continue;
      }
      const $time = $article.appendChild(document.createElement("time"));
      $time.textContent = tweetId2time(tweetId);
      $time.classList.add("Amgm_setMilliseconds_time");
      const $elementToStyle = $article.querySelector(
        // eslint-disable-next-line max-len
        ":scope > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div:nth-child(1) span",
      );
      if ($elementToStyle) {
        $time.style.color = window.getComputedStyle($elementToStyle).color;
      }
      $article.appendChild($time);
    }
  };

  setInterval(setMilliseconds, 1000);
  document.head.appendChild(document.createElement("style")).textContent = `
    .Amgm_setMilliseconds_time {
        position: absolute;
        top: 0;
        right: 5px;
        font-size: 11px;
        transition: .1s;
        opacity: .5;
    }
    article:hover .Amgm_setMilliseconds_time {
        opacity: 1;
    }`;

  const errorArticles = new Set();

  const tweetId2time = (tweetId: string) => {
    const time = new Date(Number(BigInt(tweetId) / 2n ** 22n + 1288834974657n));
    return (
      time.toLocaleString() + "." + ("000" + time.getMilliseconds()).substr(-3)
    );
  };

  console.log("[Amgm_Script{Twitter}] slide_sideNavigation v.0.1.2");
  const $style = document.head.appendChild(document.createElement("style"));
  $style.textContent = `
    @media screen and (max-width: 500px) {
        header[role="banner"] {
            position: absolute;
            transition: .5s;
        }

        header[role="banner"] > div > div {
            background-color: #CCC2;
            transform: translateX(calc(-100% + 16px));
            transition: .5s;
        }

        header[role="banner"]:hover > div > div {
            transform: translateX(0%);
            background-color: ${
              window.getComputedStyle(document.body).backgroundColor
            };
            box-shadow: 4px 4px 8px #0004;
        }

        header[role="banner"]:active > div > div {
            backgroud-color: ${
              window.getComputedStyle(document.body).backgroundColor
            };
            transform: translateX(0);
        }

        /*サイドバーのアイコンを若干右に寄せる*/
        header[role="banner"]:not(:hover) > div > div > div > div > div > nav > a > * {
            padding-right: 11px;
        }

        header[role="banner"] > div > div > div > div > div > nav > a > div > div > * {
            transition: .5s;
        }

        header[role="banner"]:not(:hover) > div > div > div > div > div > nav > a > div > div > svg {
            margin-left: 30px;
            opacity: .25;
        }

        /*通知を大きくする*/
        header[role="banner"]:not(:hover) > div > div > div > div > div > nav > a:not([href="/home"]) > div > div > div {
            min-width: 0;
            top: -4px;
            height: 32px;
            border-radius: 0 8px 8px 0;
            padding: 0;
            right: 0;
            width:8px;
        }

        header[role="banner"] > div > div > div > div > div > nav > a > div > div > div > span {
            transition: .5s;
        }

        /*サイドバーのツイートするボタンを隠す*/
        header[role="banner"] > div > div > div > div:nth-child(1) > div:nth-child(3) {
            transform: translateX(-16px);
            transition: .5s;
        }
        header[role="banner"]:hover > div > div > div > div:nth-child(1) > div:nth-child(3) {
            transform: translateX(0px);
        }

        /*ツイートの横幅を広くする*/
        article > div > div > div > div:nth-child(2) > div:nth-child(1),
        article > div > div > div > div:nth-child(1) > div > div {
            flex-basis: 28px;
        }
        article > div > div > div > div:nth-child(2) > div:nth-child(1) [style*="height"],
        article > div > div > div > div:nth-child(2) > div:nth-child(1) [style*="width"] {
            width: 32px !important;
            height: 32px !important;
        }
    }
    @media screen and (max-height: 600px) {
        /*トップのツイートボックスを隠す*/
        [data-page="home"] main > div > div > div > div > div > div:nth-child(2) {
            position: absolute;
            width: 100%;
            top: 48px;
            transform: translateY(calc(-100% + 8px));
            border-bottom: solid 1px #0002;
            transition: .2s;
        }

        [data-page="home"] main > div > div > div > div > div > div:nth-child(2):hover,
        [data-page="home"] main > div > div > div > div > div > div:nth-child(2):focus-within {
            transform: none;
        }
    }`;
}
