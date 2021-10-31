const express = require('express');
const router = express.Router();
// basicAuth for Admin Apps
const basicAuth = require('basic-auth-connect');
// コメント表示（発表者）ページ表示に認証を行うか設定
const authFlg = false;　//デフォルト:false

// 認証ユーザIDとパスワードを設定
const user = 'user';
const password = 'password';

// Basic認証オンなら実施するように設定
if (authFlg){
  router.use(basicAuth(user, password ));
}

// ルーム名未入力ならルーム選択画面を開く
router.get('/', function(req, res, next) {
  res.render("commentListFirst",{
    title : "nicomatsu"
  });
});

// ルーム名入力済みならコメントリスト画面を開く
router.get('/:room_id', function(req, res, next) {
  const msg = req.params.room_id
  res.render("commentList",{
    msg:msg
  });
});

module.exports = router;
