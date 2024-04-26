document.getElementById("option").addEventListener("click",function(){
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
})

chrome.storage.local.get({
    doPad: false,
    doTwitter: true,
    doKadaiowatter: true,
    doInputGoogle: true,
    doGoogleClass: true
},function(items){
    document.getElementById("doPad").checked = items.doPad;
    document.getElementById("doTwitter").checked = items.doTwitter;
    document.getElementById("doKadaiowatter").checked = items.doKadaiowatter;
    document.getElementById("doInputGoogle").checked = items.doInputGoogle;
    document.getElementById("doGoogleClass").checked = items.doGoogleClass;
})

document.getElementById("doPad").addEventListener("change",function(){
    chrome.storage.local.set({
        doPad: document.getElementById("doPad").checked
    })
});
document.getElementById("doTwitter").addEventListener("change",function(){
    chrome.storage.local.set({
        doTwitter: document.getElementById("doTwitter").checked
    })
});
document.getElementById("doKadaiowatter").addEventListener("change",function(){
    chrome.storage.local.set({
        doKadaiowatter: document.getElementById("doKadaiowatter").checked
    })
});
document.getElementById("doInputGoogle").addEventListener("change",function(){
    chrome.storage.local.set({
        doInputGoogle: document.getElementById("doInputGoogle").checked
    })
});
document.getElementById("doGoogleClass").addEventListener("change",function(){
    chrome.storage.local.set({
        doGoogleClass: document.getElementById("doGoogleClass").checked
    })
})

document.getElementById("openStartup").setAttribute("href",chrome.runtime.getURL("files/startup.html"));