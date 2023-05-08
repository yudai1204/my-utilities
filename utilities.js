window.addEventListener("load",function(){
    this.setTimeout(function(){
    if(location.href.includes("https://api.timesclub.jp/view/pc/tpLogin.jsp")){
        chrome.storage.local.get({
            data:{}
        },function(items){
            document.getElementById("cardNo1").value = items.data.timesID1;
            document.getElementById("cardNo2").value = items.data.timesID2;
            document.getElementById("tpPassword").value = items.data.timesPassword;
        })
    }
    },1000);
})