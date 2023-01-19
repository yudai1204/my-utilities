chrome.storage.local.get({
    data: {},
    setting: {},
    googlePasswords:[
        {
            num: 0,
            pass: "password"
        }
    ]
}, function (data) {
    for (const item of document.querySelectorAll(".autoitem")) {
        item.value = data.data[item.getAttribute("id")] ? data.data[item.getAttribute("id")] : "";
    }
    for (const item of document.querySelectorAll(".settingitem")) {
        item.checked = data.setting[item.getAttribute("id")] ? data.setting[item.getAttribute("id")] : false;
    }
    document.getElementById("passjson").value = JSON.stringify(data.googlePasswords, null , "\t");
})


document.getElementById("save").addEventListener("click", saveData);

function saveData() {
    const data = {};
    const setting = {};
    for (const item of document.querySelectorAll(".autoitem")) {
        data[item.getAttribute("id")] = item.value;
    }
    for (const item of document.querySelectorAll(".settingitem")) {
        setting[item.getAttribute("id")] = item.checked;
    }
    try{
        chrome.storage.local.set({
            googlePasswords: JSON.parse(document.getElementById("passjson").value)
        })
    }catch(e){
        alert(e);
    }
    chrome.storage.local.set({
        data: data,
        setting: setting
    }, function () {
        alert("保存しました");
    });
}


//CSV LOAD


let fileInput = document.getElementById('csv');
let fileReader = new FileReader();

// ファイル変更時イベント
fileInput.onchange =  () => {
    let file = fileInput.files[0];
    fileReader.readAsText(file, "UTF-8");
};

// ファイル読み込み時
let items = [];
fileReader.onload = () => {
    // JSONとしてparseできるかチェック
    function is_json(dataj) {
        try {
            JSON.parse(dataj);
        } catch (errr) {
            return false;
        }
        return true;
    }
    if(is_json(fileReader.result)){
        // JSON
        const json = JSON.parse(fileReader.result);
        console.log(json);
        chrome.storage.local.set(json, function (){
            alert('読み込みました')
            location.reload();
        });
    }else{
        //CSV
        // ファイル読み込み
        let fileResult = fileReader.result.split('\r\n');

        // 先頭行をヘッダとして格納
        let header = fileResult[0].split(',')
        // 先頭行の削除
        fileResult.shift();

        // CSVから情報を取得
        items = fileResult.map(item => {
            let datas = item.split(',');
            let result = {};
            for (const index in datas) {
                let key = header[index];
                result[key] = datas[index];
            }
            return result;
        });

        console.log(items);
        chrome.storage.local.set({
            data: items[0]
        }, function (){
            alert('読み込みました')
            location.reload();
        })
    }
    // ファイル読み取り失敗時
    fileReader.onerror = () => {
        items = [];
        alert("ファイル読み取りに失敗しました。")
    }
}

document.getElementById("output").addEventListener("click",create_csv);
document.getElementById("outputj").addEventListener("click",create_json);

//現在スタックされているデータをCSVに変換してダウンロードする
function create_csv(){

    //文字列型で二次元配列のデータ
    const dataName = [];
    const dataValue = [];
    for (const item of document.querySelectorAll(".autoitem")) {
        dataName.push(item.getAttribute("id"));
        dataValue.push(item.value);
    }
    let data = [
        dataName,
        dataValue
    ]

    console.log(data);

    //作った二次元配列をCSV文字列に直す。
    let csv_string  = ""; 
    for (let d of data) {
        csv_string += d.join(",");
        csv_string += '\r\n';
    }   

    //ファイル名の指定
    const now = new Date();
    let file_name   = `formAutoInput_${now.getMonth()+1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}.csv`;

    //CSVのバイナリデータを作る
    let blob        = new Blob([csv_string], {type: "text/csv"});
    let uri         = URL.createObjectURL(blob);

    //リンクタグを作る
    let link        = document.createElement("a");
    link.download   = file_name;
    link.href       = uri;

    //作ったリンクタグをクリックさせる
    document.body.appendChild(link);
    link.click();

    //クリックしたら即リンクタグを消す
    document.body.removeChild(link);
    delete link;
}



function create_json(){
    const saved = {
        data:{},
        setting:{},
        googlePasswords:[
            {
                num: 0,
                pass: "password"
            }
        ],
        doPad: false,
        doTwitter: true,
        doKadaiowatter: true,
        doInputGoogle: true,
        doGoogleClass: true
    };
    for (const item of document.querySelectorAll(".autoitem")) {
        saved.data[item.getAttribute("id")] = item.value;
    }
    for (const item of document.querySelectorAll(".settingitem")) {
        saved.setting[item.getAttribute("id")] = item.checked;
    }
    console.log(saved);
    //ファイル名の指定
    const now = new Date();
    let file_name   = `formAutoInput_${now.getMonth()+1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}.json`;

    //CSVのバイナリデータを作る
    let blob        = new Blob([JSON.stringify(saved)], {type: "text/json"});
    let uri         = URL.createObjectURL(blob);

    //リンクタグを作る
    let link        = document.createElement("a");
    link.download   = file_name;
    link.href       = uri;

    //作ったリンクタグをクリックさせる
    document.body.appendChild(link);
    link.click();

    //クリックしたら即リンクタグを消す
    document.body.removeChild(link);
    delete link;
}