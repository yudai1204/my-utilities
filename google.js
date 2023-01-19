
function googleClassAuto(){
    if(location.href.includes("https://classroom.google.com/u/0/") || location.href === "https://classroom.google.com"){
        chrome.storage.local.get({data:{googleClassUser: 0}},function(items){
            const user = Number(items.data.googleClassUser); //ここの値を、実際に転移したい先のURLの数字に設定してください　 https://classroom.google.com/u/ここの数字/h
            if(user != 0){
                window.location = `https://classroom.google.com/u/${user}/h`;
                setInterval(function(){
                    const btn = document.querySelector(".uArJ5e UQuaGc.Y5sE8d");
                    if(btn){
                        window.location = `https://classroom.google.com/u/${user}/h`;
                    }
                },100);
            }
        })
    }
}



function googlePassAuto(){
if(location.href.includes("https://accounts.google.com/")){
    if(location.href.includes("&authuser=")){
        chrome.storage.local.get({
            data:{
                defaultPassword: ""
            },
            googlePasswords:[]
        },function(items){
        const authorNum = location.href.slice(location.href.indexOf("&authuser=")+10,location.href.indexOf("&authuser=")+11);
        let clicked = false;
        let password=items.data.defaultPassword;
        for(const pass of items.googlePasswords){
            if(Number(authorNum) == Number(pass.num)){
                password = pass.pass;
            }
        }
        console.log(authorNum);
        //ログインボタン押す
        if(location.href.includes("ServiceLogin")){
            //https://accounts.google.com/v3/signin/confirmidentifier?dsh=S1862764520%3A1674143054203375&authuser=1&continue=https%3A%2F%2Fclassroom.google.com%2Fu%2F1%2Fh&followup=https%3A%2F%2Fclassroom.google.com%2Fu%2F1%2Fh&passive=1209600&service=classroom&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHd1CKHLZ5_baeTFTi-f5WKoctg5gwPQlGN2smM1DZuCM_pBKg8Ky500Nm8B5Wa_byxHoWPh
            console.log("ServiceLogin");
            function clickNextBtn(){
                console.log("loading");
                const nextBtn = document.querySelector("button");
                if(nextBtn){
                    nextBtn.click();
                    console.log("clicked");
                }
            }
            setTimeout(clickNextBtn,200);
            setInterval(inputPassword,300);
        }else if(location.href.includes("v2/challenge")){
            setInterval(inputPassword,300);
        }
        //パスワード入力する
        function inputPassword(){
            if(clicked){
                return;
            }else{
            const passwordBox = document.getElementById("password").querySelector("input");
                if(passwordBox){
                    console.log("passwordBox found!")
                    passwordBox.value = password;
                    const nextPassBtn = document.querySelector("button.nCP5yc");
                    if(nextPassBtn){
                        nextPassBtn.click();
                        clicked = true;
                    }
                }
                else{
                    console.log("passwordBox NotFound");
                }
            }
        }
    })
    }
}
}