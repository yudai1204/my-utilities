import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://api.timesclub.jp/*"],
};

setTimeout(() => {
  if (
    location.href.startsWith("https://api.timesclub.jp/view/pc/tpLogin.jsp")
  ) {
    chrome.storage.local.get(
      {
        data: {},
      },
      (items) => {
        if (items.data.timesID1 === undefined) return;
        (document.getElementById("cardNo1") as HTMLInputElement).value =
          items.data.timesID1;
        (document.getElementById("cardNo2") as HTMLInputElement).value =
          items.data.timesID2;
      },
    );
  }
}, 1000);
