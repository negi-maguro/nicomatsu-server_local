/*------------------------------------------------------
* コメント表示ページ(display.pug)の動作のためのJavascript
*-----------------------------------------------------*/

// URLの末尾からルーム名を取得
const myUrl = decodeURI(location.href);
const splitMyUrl = myUrl.split('/');
  // 末尾に/があってもなくてもいいようにdisplayの次をルーム名として設定
const roomName = splitMyUrl[splitMyUrl.indexOf('display')+1] || 'オープンルーム'


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


// コメント受信時にniconico.jsのhandleCommentを呼ぶ
socket.on('comment', function(msg){
    handleComment (msg) ;
});


// スタンプ受信時にniconico.jsのhandleLikeを呼ぶ
socket.on('like', function(msg){
    handleLike (msg) ;
});
