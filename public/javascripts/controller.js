/*-------------------------------------------------------
* 参加者用ページ(controller.pug)のJavascript
-------------------------------------------------------*/

// URLの末尾からルーム名を取得
const myUrl = decodeURI(location.href);
const splitMyUrl = myUrl.split('/');
  // 末尾に/があってもなくてもいいようにcontrollerの次をルーム名として設定
const roomName = splitMyUrl[splitMyUrl.indexOf('controller')+1] || 'オープンルーム'
console.log(roomName);


/*------------------------------------------------------
* コメントをGetリクエストで送信する
* 引数：コメントのフォームオブジェクト
* 戻り値：なし
*-----------------------------------------------------*/
function handleSubmit (form) {
  const action = $(form).attr('action');
  const params = $(form).serialize();
  const url = `${action}/${roomName}/?${params}`;
  console.log(url);
  $.get(url)
   .fail(function () {
     alert('failed to send message.');
  });
};


/*------------------------------------------------------
* スタンプをGetリクエストで送信する
* 引数：選択されたスタンプファイル名
* 戻り値：なし
*-----------------------------------------------------*/
function stamp (type) {
  const url = `/nico/like/${roomName}/?image=stamps/${type}`;
  console.log(url);
  $.get(url)
    .fail(function () {
      alert('failed to stamp.');
  })
};


/*------------------------------------------------------
* 季節スタンプをGetリクエストで送信する
* 引数：選択されたスタンプファイル名
* 戻り値：なし
*-----------------------------------------------------*/
function seasonStamp (type) {
  const url = `/nico/like/${roomName}/?image=seasons/${type}`;
  console.log(url);
  $.get(url)
    .fail(function () {
      alert('failed to stamp.');
  })
};

/*------------------------------------------------------
* アンケート回答をGetリクエストで送信する
* 送信したら連打防止のために一度非表示にして10秒後に再表示
* 引数：選択された回答
* 戻り値：なし
*-----------------------------------------------------*/
function answer (type) {
  const surveyForm = document.getElementById('survey')
  const result = window.confirm(type + 'で回答します。\n ※回答後の取り消しはできません。');
  if( result ) {
    const url = `/nico/answer/${roomName}/?answer=${type}` ;
    console.log(url);
    surveyForm.style.display = "none";
    $.get(url)
    .fail(function () {
      alert('failed to answer.');
      surveyForm.style.display = "block";
    })
    // 10秒後に回答ボタンを再表示
    setTimeout(() => {
      surveyForm.style.display = "block";
    }, 10000);
  }else{
    //- 何もしない
  }
};


/*-------------------------------------------------------
* チェック有無でテキストボックスの表示非表示を切り替える
*  匿名チェック時に送信したくないのでvalueも消す
*  チェック解除時に入力してたvalueを復活させる
* 引数1：判定対象のチェックボックス
* 引数2：非表示切り替えのテキストボックスのID
* 戻り値：なし
*------------------------------------------------------*/
function checkdiv(obj,id) {
  if(obj.checked ){
    document.getElementById(id).style.display = "none";
    document.getElementById(id).alt = document.getElementById(id).value;
    document.getElementById(id).value = "";
  }
  else {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).value = document.getElementById(id).alt;
    document.getElementById(id).alt = "";
  }
};
