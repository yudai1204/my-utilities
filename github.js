if (location.hostname.endsWith("github.io")) {
  const username = location.hostname.split(".")[0];
  const repo = location.pathname.split("/")[1] || location.hostname;
  const url = `https://github.com/${username}/${repo}`;
  const button = document.createElement("div");
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "9999999";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.width = "60px";
  button.style.height = "30px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#3182ce";
  button.style.cursor = "pointer";
  button.style.borderRadius = "5px";
  button.style.color = "#fff";
  button.innerText = "repo";
  button.addEventListener("click", () => {
    window.open(url);
  });
  document.body.appendChild(button);
}
