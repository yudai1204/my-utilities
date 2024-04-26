import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/mail/*"],
};

const template = `<target>様
お世話になっております、<name>です。

先日は貴重なお時間をいただき、ありがとうございました。


どうぞよろしくお願いいたします。
`;

const maxRows = 8;

const LCS = (a: string, b: string) => {
  const sizeA = a.length + 1;
  const sizeB = b.length + 1;
  const table = new Array(sizeA);
  for (let i = 0; i < sizeA; i++) {
    table[i] = new Array(sizeB);
  }
  for (let i = 0; i < sizeA; i++) {
    for (let j = 0; j < sizeB; j++) {
      table[i][j] = 0;
    }
  }

  for (let i = 1; i < sizeA; i++) {
    for (let j = 1; j < sizeB; j++) {
      const match = a[i - 1] == b[j - 1] ? 1 : 0;
      table[i][j] = Math.max(
        table[i - 1][j - 1] + match,
        table[i - 1][j],
        table[i][j - 1],
      );
    }
  }

  return table[a.length][b.length];
};

document.body.insertAdjacentHTML(
  "afterbegin",
  `<style>
    #udai_chrome_extension_input_temp{
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
      user-select: none;
    }
    #udai_chrome_extension_input_temp:hover {
      background-color: #2b6cb0;
    }
    </style>
    <div id="udai_chrome_extension_input_temp">
      自動入力
    </div>
    `,
);
document
  .getElementById("udai_chrome_extension_input_temp")
  .addEventListener("click", () => {
    const formNode: HTMLFormElement = document.querySelector(
      "table > tbody:has([contenteditable][role='textbox']) form",
    );
    if (!formNode) return;
    const parser = new DOMParser();
    const message_his_data =
      (formNode.querySelector("[name='uet']") as HTMLInputElement)?.value ?? "";
    // console.log(message_his_data);
    const doc = parser.parseFromString(message_his_data, "text/html");
    doc
      .querySelector("body .gmail_quote > blockquote.gmail_quote blockquote")
      ?.remove();
    const last_message_text =
      (
        doc.querySelector(
          "body .gmail_quote > blockquote.gmail_quote",
        ) as HTMLElement
      )?.innerText?.replace(/\n\n+/g, "\n") ??
      message_his_data.replaceAll("\n> ", "\n");
    const wordResult = [];
    const rows = last_message_text.split("\n").slice(0, maxRows);
    rows.forEach((row, index) => {
      row = row.trim();
      if (row[0] === ">" || row[0] === "※" || row.includes("送信専用")) return;
      const words = row.split(/[,.、。，．!！?？]/);
      words.forEach((_word, i) => {
        let word = words[i].trim();
        if (word.length === 0) return;
        if (
          word.endsWith("です") ||
          word.endsWith("申します") ||
          word.endsWith("でございます")
        ) {
          if (word.includes("お疲れ様です")) return;
          word = word.replace(/です$|申します$|でございます$/, "");
          if (
            i > 0 &&
            (words[Number(i) - 1].match(/会社|部|担当/g) ||
              words[Number(i) - 1].match(/^[\u30A0-\u30FF]+$/g))
          ) {
            wordResult.push(words[Number(i) - 1] + " " + word);
          } else if (index > 0 && rows[index - 1].match(/会社|部/g)) {
            wordResult.push(rows[index - 1] + " " + word);
          } else {
            wordResult.push(word);
          }
        }
      });
    });
    // console.log(wordResult);
    if (wordResult.length === 0) {
      inputMain(template);
    } else if (wordResult.length === 1) {
      inputMain(template, wordResult[0]);
    } else {
      const scoreList = wordResult.map((word) => {
        let score = 0;
        if (word.endsWith("様")) score -= 300;
        if (word.endsWith("さん")) score -= 300;
        if (word.includes("会社")) score += 100;
        if (word.includes("採用")) score += 100;
        if (word.includes("部")) score += 50;
        if (word.includes("担当")) score += 50;
        if (word.includes("新卒")) score += 50;
        if (word.includes("檜山")) score -= 50;
        const attr = (doc.querySelector(".gmail_attr") as HTMLElement)
          .innerText;
        if (LCS(attr, word) > attr.length / 2) score += 100;
        return { word, score };
      });
      scoreList.sort((a, b) => b.score - a.score);
      console.log({ scoreList });
      inputMain(template, scoreList[0].word);
    }
  });

const inputMain = (str, target = " ") => {
  chrome.storage?.local?.get(
    {
      data: {
        seimei: "",
      },
    },
    (items) => {
      (
        document.querySelector(
          "table > tbody [contenteditable][role='textbox']",
        ) as HTMLElement
      ).innerText = (
        str +
        "\n" +
        (
          document.querySelector(
            "table > tbody [contenteditable][role='textbox']",
          ) as HTMLElement
        ).innerText
      )
        .trim()
        .replaceAll("<target>", target)
        .replaceAll("<name>", items.data.seimei || " ");
    },
  );
};
