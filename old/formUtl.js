function formAutoWindow() {
    // 入力pad
    let nowInputModalSelect = null;
    const forms = document.getElementsByTagName("form");
    for (const form of forms) {
        for (const box of form.querySelectorAll("input, textarea")) {
            if (box && box.getAttribute("type") && (box.getAttribute("type") === "checkbox" || box.getAttribute("type") === "radio")) continue;
            box.addEventListener("click", function (e) {
                chrome.storage.local.get({
                    doPad: true
                }, function (items) {
                    if (items.doPad) {
                        const x = e.clientX;
                        const y = e.clientY;
                        console.log(x, y);
                        document.getElementById("autoFormInputModalOverlay-background").style.display = document.getElementById("autoFormInputModalOverlay").style.display = "block";
                        document.getElementById("autoFormInputModalOverlay").style.top = ((y > window.innerHeight - 350) ? (innerHeight - 390) : (y - 80)) + "px";
                        document.getElementById("autoFormInputModalOverlay").style.left = (x + 50) + "px";
                        nowInputModalSelect = box;
                    } else {
                        document.getElementById("autoFormInputModalOverlay").style.display = "none";
                    }
                })
            })
        }
    }

    if (!document.getElementById("autoFormInputModalOverlay")) {
        document.body.insertAdjacentHTML("beforeEnd", `
    <style>
    #autoFormInputModalOverlay{
        z-index: 9999;
        display: none;
        position: fixed;
        width:600px;
        height:400px;
        min-width: 300px;
        max-width: 500px;
        min-height: 350px;
        background-color:#0005;
        color: #fff;
        margin:0;
        padding: 5px;
        font-family: "Yu Gothic", "游ゴシック", "YuGothic", "游ゴシック体", "Hiragino Sans", "ヒラギノ角ゴシック", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", "Meiryo", "メイリオ", "MS PGothic", "ＭＳ Ｐゴシック", sans-serif;
    }
    #autoFormInputModalOverlay-background{
        display: none;
        position: fixed;
        z-index: 9998;
        top:0;
        left:0;
        background-color: #0000;
        width:100%;
        height:100%;
    }
    .autoFormInputModalOverlay-group{
        width:24%;
        height:100%;
        margin: 0;
        margin-right: 1%;
        padding:0;
        display: block;
        float: left;
    }
    .autoFormInputModalOverlay-button,#autoFormInputModalOverlay-hideBtn{
        display: block;
        margin:0;
        margin-bottom: 2px;
        width: 100%;
        font-size:14px;
        text-align: center;
        height: 28px;
        background-color: #fffe;
        border: 1px solid #444;
        border-radius: 3px;
        color: #000;
        cursor: pointer;
        letter-spacing: 0;
        padding:0;
        line-height:1;
    }
    
    .autoFormInputModalOverlay-button:hover, #autoFormInputModalOverlay-hideBtn:hover{
        background-color: #ddde;
    }
    #autoFormInputModalOverlay-hideBtn{
        display:none;
        position: absolute;
        bottom:0;
        right:0;
    }
    #autoFormInputModalOverlay-area{
        width:100%;
        height:100%;
        position: relative;
        background-color: #fff0;
        margin:0;
        padding: 0;
    }
    </style>
    <div id="autoFormInputModalOverlay-background"></div>
    <div id="autoFormInputModalOverlay">
    <div id="autoFormInputModalOverlay-area">
        <div class="autoFormInputModalOverlay-group">
            <button class="autoFormInputModalOverlay-button" value="sei">姓</button>
            <button class="autoFormInputModalOverlay-button" value="mei">名</button>
            <button class="autoFormInputModalOverlay-button" value="seimei">姓名</button>
            <button class="autoFormInputModalOverlay-button" value="seiF">かな(姓)</button>
            <button class="autoFormInputModalOverlay-button" value="meiF">かな(名)</button>
            <button class="autoFormInputModalOverlay-button" value="seimeiF">かな(姓名)</button>
            <button class="autoFormInputModalOverlay-button" value="seiFF">カナ(姓)</button>
            <button class="autoFormInputModalOverlay-button" value="meiFF">カナ(名)</button>
            <button class="autoFormInputModalOverlay-button" value="seimeiFFF">カナ(姓名)</button>
            <button class="autoFormInputModalOverlay-button" value="age">年齢</button>
        </div>
        <div class="autoFormInputModalOverlay-group">
            <button class="autoFormInputModalOverlay-button" value="shame">大学名</button>
            <button class="autoFormInputModalOverlay-button" value="shameF">大学名(カナ)</button>
            <button class="autoFormInputModalOverlay-button" value="gakubu">学部</button>
            <button class="autoFormInputModalOverlay-button" value="gakka">学科</button>
            <button class="autoFormInputModalOverlay-button" value="circle">サークル</button>
            <button class="autoFormInputModalOverlay-button" value="url">ﾎﾟｰﾄﾌｫﾘｵ</button>
            <button class="autoFormInputModalOverlay-button" value="github">GitHub ID</button>
        </div>
        <div class="autoFormInputModalOverlay-group">
            <button class="autoFormInputModalOverlay-button" value="tel">電話番号</button>
            <button class="autoFormInputModalOverlay-button" value="tel1">電話番号1</button>
            <button class="autoFormInputModalOverlay-button" value="tel2">電話番号2</button>
            <button class="autoFormInputModalOverlay-button" value="tel3">電話番号3</button>
            <button class="autoFormInputModalOverlay-button" value="mobile">携帯番号</button>
            <button class="autoFormInputModalOverlay-button" value="mobile1">携帯番号1</button>
            <button class="autoFormInputModalOverlay-button" value="mobile2">携帯番号2</button>
            <button class="autoFormInputModalOverlay-button" value="mobile3">携帯番号3</button>
            <button class="autoFormInputModalOverlay-button" value="mail">メアド</button>
            <button class="autoFormInputModalOverlay-button" value="mail1">メアド1</button>
            <button class="autoFormInputModalOverlay-button" value="mail2">メアド2</button>
        </div>
        <div class="autoFormInputModalOverlay-group">
            <button class="autoFormInputModalOverlay-button" value="zip">郵便番号</button>
            <button class="autoFormInputModalOverlay-button" value="zip1">郵便番号1</button>
            <button class="autoFormInputModalOverlay-button" value="zip2">郵便番号2</button>
            <button class="autoFormInputModalOverlay-button" value="jusho">住所フル</button>
            <button class="autoFormInputModalOverlay-button" value="city">市区町村</button>
            <button class="autoFormInputModalOverlay-button" value="vil">町名以下</button>
            <button class="autoFormInputModalOverlay-button" value="apart">建物名</button>

            <button class="autoFormInputModalOverlay-button" value="creditnum">クレカ番号</button>
            <button class="autoFormInputModalOverlay-button" value="creditabout">クレカ名義</button>
            <button class="autoFormInputModalOverlay-button" value="security">ｾｷｭﾘﾃｨｺｰﾄﾞ</button>
            <button class="autoFormInputModalOverlay-button autoFormInputModalOverlay-confirm" value="expdate">有効期限確認</button>
            <button class="autoFormInputModalOverlay-button" value="clear">クリア</button>
        </div>
        <button id="autoFormInputModalOverlay-hideBtn">入力Padを閉じる</button>
    </div>
    </div>
    `);
        chrome.storage.local.get({
            data: {
            },
            setting: {
                autoClosePad: false
            }
        }, function (items) {
            for (const btn of document.getElementsByClassName("autoFormInputModalOverlay-button")) {
                btn.addEventListener("click", function () {
                    if (nowInputModalSelect) {
                        if (btn.value == "clear") {
                            nowInputModalSelect.value = "";
                        } else if(btn.classList.contains("autoFormInputModalOverlay-confirm")){
                            alert(items.data[btn.value]);
                        } else {
                            nowInputModalSelect.value += items.data[btn.value];
                        }
                        nowInputModalSelect.focus();
                    }
                    if (items.setting.autoClosePad) {
                        document.getElementById("autoFormInputModalOverlay-background").style.display = document.getElementById("autoFormInputModalOverlay").style.display = "none";
                    }
                });
            }
            document.getElementById("autoFormInputModalOverlay-hideBtn").addEventListener("click", function () {
                document.getElementById("autoFormInputModalOverlay-background").style.display = document.getElementById("autoFormInputModalOverlay").style.display = "none";
            });
            document.getElementById("autoFormInputModalOverlay-background").addEventListener("click", function () {
                document.getElementById("autoFormInputModalOverlay-background").style.display = document.getElementById("autoFormInputModalOverlay").style.display = "none";
            })

        });
    }

}