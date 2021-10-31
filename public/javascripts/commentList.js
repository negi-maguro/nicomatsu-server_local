/*------------------------------------------------------
* コメントリスト表示ページ(commentList.pug)の動作のためのJavascript
*-----------------------------------------------------*/

// URLの末尾からルーム名を取得
const myUrl = decodeURI(location.href);
const splitMyUrl = myUrl.split('/');
  // 末尾に/があってもなくてもいいようにcommentListの次をルーム名として設定
const roomName = splitMyUrl[splitMyUrl.indexOf('commentList')+1]


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

// コメント受信時にlistCommentを呼ぶ
socket.on('comment', function(msg){
    listComment (msg) ;
});


/*------------------------------------------------------
* コメントリスト追加のJavascript
* 引数：GETリクエストされたクエリパラメタをオブジェクトにしたもの
* 戻り値：なし
*-----------------------------------------------------*/
function listComment(msg){
  const targetTable = document.getElementById('targetTable');
  // テーブルに行とセルを追加（1行3列）
  const newRow = targetTable.insertRow();
  const newDateCell = newRow.insertCell();    // 日時
  const newNameCell = newRow.insertCell();    // ニックネーム
  const newCommentCell = newRow.insertCell(); // コメント

  // 日時を設定
  let date = new Date();
  let dateText = date.toLocaleString('ja-JP');

  // ニックネームを取得、空白の場合はAnonymousで表示
  let nameText = msg.nickname;
  if(nameText == ""){
    nameText = 'Anonymous';
  }

  // コメントを取得
  let commentText = msg.body;

  // テキストノードにしてセルに挿入
  newDateCell.appendChild(document.createTextNode(dateText));
  newNameCell.appendChild(document.createTextNode(nameText));
  newCommentCell.appendChild(document.createTextNode(commentText));

}
