chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "googleSuggest") {
    fetch(
      "https://www.google.com/complete/search?hl=ja&q=" +
        encodeURIComponent(request.query) +
        "&output=toolbar",
    )
      .then((response) => response.text())
      .then((data) => {
        sendResponse(data);
      });
    return true;
  } else if (request.message === "fetchLatestEmails") {
    fetchLatestEmails(sendResponse);
  } else if (request.message === "fetchGemini") {
    fetchGemini(request.query, sendResponse);
  }
});

const fetchGemini = async (query, sendResponse) => {
  const api_key = await chrome.storage.local.get({ api_key: "" });
  if (!api_key.api_key) {
    sendResponse({ error: "APIキーが設定されていません。" });
    return;
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api_key.api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: query }],
            },
          ],
          system_instruction: {
            parts: [
              {
                text:
                  "ユーザはメール本文をtext/plainかtext/html、もしくは両方を含む形であなたに送信します。\n" +
                  "あなたは、そのメール本文から、 確認コード/ログインコード/code やそれに類するものを抜き出して、それ単体を出力してください。\n" +
                  "もし 確認コード/ログインコード/code のいずれも含まれない場合は、 該当なし と出力してください。",
              },
            ],
          },
        }),
      },
    );
    const data = await response.json();
    sendResponse(data);
  } catch (error) {
    console.error("Gemini APIエラー:", error);
    sendResponse({ error: error.message });
  }
};

const fetchLatestEmails = (sendResponse) => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    // 最新の受信メール8件を取得するリクエスト
    fetch(
      "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=8",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.messages && data.messages.length) {
          // 以下のようにPromise.allで待つ
          Promise.all(
            data.messages.map((msg) => getEmailContent(token, msg.id)),
          ).then((bodies) => {
            console.log("メール一覧取得完了:", bodies);
            sendResponse(bodies);
          });
        } else {
          console.log("メールが見つかりませんでした。");
        }
      })
      .catch((error) => console.error("メール一覧取得エラー:", error));
  });
};

const getEmailContent = async (token, messageId) => {
  // 指定したメールIDの詳細情報（本文含む）を取得
  try {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    const messageData = await response.json();
    const body = extractBodyFromPayload(messageData.payload);
    const headers = messageData.payload.headers;
    // console.log("メールID:", messageId, "本文:", body, "header:", headers);
    return {
      bodies: body.bodies,
      headers,
      mimeType: body.mimeType,
      id: messageId,
    };
  } catch (error) {
    console.error("メール取得エラー:", error);
  }
};

// メッセージのペイロードから本文を抽出する関数
const extractBodyFromPayload = (payload) => {
  const bodies = [];
  const mimeType = payload.mimeType;
  if (payload.parts && payload.parts.length) {
    // 複数パートの場合、text/plain または text/html の部分を探す

    const textPart = payload.parts.find(
      (part) => part.mimeType === "text/plain" && part.body?.data,
    );
    const htmlPart = payload.parts.find(
      (part) => part.mimeType === "text/html" && part.body?.data,
    );

    if (textPart) {
      bodies.push({
        body: decodeBase64Url(textPart.body.data),
        mimeType: "text/plain",
      });
    }
    if (htmlPart) {
      bodies.push({
        body: decodeBase64Url(htmlPart.body.data),
        mimeType: "text/html",
      });
    }
  } else if (payload.body && payload.body.data) {
    // 単一パートの場合
    bodies.push({
      body: decodeBase64Url(payload.body.data),
      mimeType,
    });
  }

  if (bodies.length === 0 && payload.parts) {
    const newBodies = extractBodyFromPayload(payload.parts[0]).bodies;
    console.log("newBodies", newBodies);
    bodies.push(...newBodies);
  }

  return { bodies, mimeType };
};

// Base64URLエンコードされた文字列をデコードする関数
const decodeBase64Url = (data) => {
  // Base64URL -> Base64 変換
  data = data.replace(/-/g, "+").replace(/_/g, "/");
  // atobでデコードし、文字コードを補正
  return decodeURIComponent(escape(atob(data)));
};
