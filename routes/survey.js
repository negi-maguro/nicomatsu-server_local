const express = require('express');
const router = express.Router();

// ルーム名未入力ならオープンルームを開く
router.get('/', function(req, res, next) {
  const msg = "";
  const room = req.params.room_id;
  res.render("survey",{
    room:"オープンルーム",
    msg : msg,
  });
});

// ルーム名ありならルーム名有りとして開く
router.get('/:room_id', function(req, res, next) {
  const msg = "";
  const room = req.params.room_id;
  res.render("survey",{
    room:room,
    msg : msg,
  });
});

module.exports = router;
