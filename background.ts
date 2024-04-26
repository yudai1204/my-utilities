chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "googleSuggest") {
    fetch(
      "https://www.google.com/complete/search?hl=ja&q=" +
        encodeURIComponent(request.query) +
        "&output=toolbar"
    )
      .then((response) => response.text())
      .then((data) => {
        sendResponse(data)
      })
    return true
  }
})
