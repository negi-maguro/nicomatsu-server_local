const express = require('express');
const router = express.Router();
const basicAuth = require('basic-auth-connect');

// コメント表示（発表者）ページ表示に認証を行うか設定
const authFlg = false;　//デフォルト:false

// 認証ユーザIDとパスワードを設定
const user = 'user';
const password = 'password';

// Basic認証オンなら実施するよう
if (authFlg){
  router.use(basicAuth(user, password ));
}


// ルーム名未入力ならオープンルームを開く
router.get('/', function(req, res, next) {
  const room = "オープンルーム"
  res.render("display",{
    room:room
  });
});


router.get('/:room_id', function(req, res, next) {
  const room = req.params.room_id
  res.render("display",{
    room:room
  });
});

module.exports = router;
