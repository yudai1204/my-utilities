window.addEventListener("load", (event) => {
  chrome.storage.local.get(
    {
      doPad: false,
      doTwitter: true,
      doKadaiowatter: true,
      doInputGoogle: true,
      doGoogleClass: true,
    },
    function (items) {
      if (items.doPad) {
        formAutoWindow();
      }
      if (items.doTwitter) {
        twitterAutoAmgScript();
      }
      if (items.doInputGoogle) {
        googlePassAuto();
      }
      if (items.doGoogleClass) {
        googleClassAuto();
      }
      youtubeShorts();
    }
  );
});
