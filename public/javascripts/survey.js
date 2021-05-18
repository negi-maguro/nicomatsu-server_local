/*------------------------------------------------------
* アンケートページ(survey.pug)の動作のためのJavascript
*-----------------------------------------------------*/

// URLの末尾からルーム名を取得
const myUrl = decodeURI(location.href);
const splitMyUrl = myUrl.split('/');
  // 末尾に/があってもなくてもいいようにsurveyの次をルーム名として設定
const roomName = splitMyUrl[splitMyUrl.indexOf('survey')+1] || 'オープンルーム'

// socket.ioの宣言
const socket = io.connect();

// nico.js内に実装のルーム接続が発火するようにsocket通信する
socket.emit("client_to_server_join", roomName);
console.log(roomName + 'に接続');


// 再接続時にルームに入り直す
socket.on('reconnect', () =>{
  // nico.js内に実装のルーム接続が発火するようにsocket通信する
  socket.emit("client_to_server_join", roomName);
  console.log(roomName + 'に再接続');
});


// 選択肢毎の得票数を格納する変数
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;

// 回答結果のリスト
let chartList = [a,b,c,d,e]

// アンケート結果保存用のオブジェクト
  // "質問” = chartList
let resultsList = {};

// 質問と選択肢保存用のオブジェクト
 // "質問” = ["選択肢Aの入力値","選択肢Bの入力値",…,"選択肢Eの入力値"]
let questionsList = {};


// 画面遷移、更新で戻ってきたときにsessionStorageが保存されてたら回答結果を読み込み
if(sessionStorage.getItem('resultsList')){
  const sessionResults = JSON.parse(sessionStorage.getItem('resultsList'));
  Object.keys(sessionResults).forEach(function (key) {
    resultsList[key] = sessionResults[key];
  });
}

// 画面遷移、更新で戻ってきたときにsessionStorageが保存されてたら選択肢を読み込み
if(sessionStorage.getItem('questionsList')){
  const sessionQuestions = JSON.parse(sessionStorage.getItem('questionsList'));
  Object.keys(sessionQuestions).forEach(function (key) {
    questionsList[key] = sessionQuestions[key];
  });

  //取得した数だけ質問リストをdatalistのoptionに追加
  Object.keys(questionsList).forEach(function (key) {
    const questionsOption = document.getElementById('question_options');
    const option = document.createElement('option');
    option.value = key;
    questionsOption.appendChild(option);
  });
};


// 回答を受信したら動作
socket.on('answer', function(msg){
  // 受信したanswerの値でカウントアップ
  switch ( JSON.stringify(msg) ) {
    case '{"answer":"A"}' : a++;
     break;
    case '{"answer":"B"}' : b++;
     break;
    case '{"answer":"C"}' : c++;
     break;
    case '{"answer":"D"}' : d++;
     break;
    case '{"answer":"E"}' : e++;
     break;
    default:
     break;
  }
  chartList = [a,b,c,d,e];

  // リアルタイムで描画するために都度描画処理を行う
  doughnutChartDraw("my_doughnut_chart", chartList) ;
  barChartDraw("my_bar_chart", chartList) ;
});


/*------------------------------------------------------
* 質問と選択肢、アンケート結果を保存する処理
* 引数：なし
* 戻り値：なし
*-----------------------------------------------------*/
function saveChart(){
  const question = document.getElementById('question');
  // - 回答結果リストを保存
  resultsList[question.value] = chartList;
  sessionStorage.setItem('resultsList', JSON.stringify(resultsList));
  // 質問が入力されてる場合のみ処理実施
  if (question.value != ''){
    // 質問が新規登録の場合のみ、質問テキストボックスのデータリストにオプションを追加
    if(questionsList[question.value]){
      // リストに追加済みなので何もしない
    }else {
      // 質問テキストボックスのデータリストに入力された質問を追加
      const questionsOption = document.getElementById('question_options');
      const option = document.createElement('option');
      option.value = question.value;
      questionsOption.appendChild(option);
    }
    // 質問が新規登録の場合の処理終了

    // 選択肢の保存処理
    // 選択肢の入力値を取得
    const optionA = document.getElementById('option_a');
    const optionB = document.getElementById('option_b');
    const optionC = document.getElementById('option_c');
    const optionD = document.getElementById('option_d');
    const optionE = document.getElementById('option_e');

    // 質問をキーとしたオブジェクトに、選択肢をリスト形式で格納
    // {質問1:[A,B,C,D,E],質問2:[A,B,C,D,E]}の形式
    const options = [optionA.value, optionB.value, optionC.value, optionD.value, optionE.value]
    questionsList[question.value] = options;
    sessionStorage.setItem('questionsList', JSON.stringify(questionsList));
  }
};


/*------------------------------------------------------
* 質問と選択肢、アンケート結果の表示をリセットする処理
* 引数：なし
* 戻り値：なし
*-----------------------------------------------------*/
function restChart(){
  // グラフ用の値と質問エリアをリセット
  a=b=c=d=e=0;
  question.value = '';
  document.getElementById('option_a').value = '';
  document.getElementById('option_b').value = '';
  document.getElementById('option_c').value = '';
  document.getElementById('option_d').value = '';
  document.getElementById('option_e').value = '';
  chartList = [a,b,c,d,e];

  // 初期化したデータでグラフ描画して表示をリセット
  doughnutChartDraw("my_doughnut_chart", chartList) ;
  barChartDraw("my_bar_chart", chartList) ;
};


/*------------------------------------------------------
* 選択された質問で保存済みのアンケート結果を再描画する処理
* 引数：なし
* 戻り値：なし
*-----------------------------------------------------*/
function reloadChart(){
  const question = document.getElementById('question');

  // - 回答結果が保存されてたら再読込
  if (resultsList[question.value]){
    chartList = resultsList[question.value];
    a = chartList[0];
    b = chartList[1];
    c = chartList[2];
    d = chartList[3];
    e = chartList[4];
    // - グラフ描画
    doughnutChartDraw("my_doughnut_chart", chartList) ;
    barChartDraw("my_bar_chart", chartList) ;
  }
};


/*------------------------------------------------------
* 選択された質問で保存済みの選択肢を再設定する処理
* 引数：変更されたオブジェクト（質問のテキストエリア）
* 戻り値：なし
*-----------------------------------------------------*/
function insertOption(obj){
    // 質問が登録済みなら処理する
    if(questionsList[obj.value]){
        // 質問をキーにして選択肢の配列を取得
        const optionList = questionsList[obj.value];
        document.getElementById('option_a').value = optionList[0];
        document.getElementById('option_b').value = optionList[1];
        document.getElementById('option_c').value = optionList[2];
        document.getElementById('option_d').value = optionList[3];
        document.getElementById('option_e').value = optionList[4];
    }
};


/*------------------------------------------------------
* チェックボックス押下で指定クラスの要素の表示・非表示を切り替える
* 引数1：チェックボックスのID（Bootstrapのボタン化ラベルを押してもcheckdにならないのでvalueでチェック有無を判断）
* 引数2：表示非表示切り替え対象のクラス名
* 引数3：要素が表示されてるときのボタン表示文言（非表示にするなど）
* 引数4：要素が非表示のときのボタン表示文言（表示するなど）
* 戻り値：なし
*-----------------------------------------------------*/
function noneBlockChangeByClass(id,className,textId,textHide,textOpen) {
  const displayChange = document.getElementById(id);
  const kesu = document.getElementsByClassName(className);
  // チェックなし（表示されてる）の場合
  if(displayChange.value == 0){
    for(var i = 0; i < kesu.length; i++) {
      // 非表示に切り替え
      kesu[i].style.display = "none";
    }
    // チェックボックスをチェックありに変更
    displayChange.value = 1;
    // ボタン表示文言を要素が非表示の際の内容に切り替え
    document.getElementById(textId).innerHTML = textOpen;
  }else {
    for(var i = 0; i < kesu.length; i++) {
    // 表示に切り替え
      kesu[i].style.display = "block";
    }
    // チェックボックスをチェックなしに変更
    displayChange.value = 0;
    // ボタン表示文言を要素が表示の際の内容に切り替え
    document.getElementById(textId).innerHTML = textHide;
  }
};
