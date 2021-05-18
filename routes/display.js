const express = require('express');
const router = express.Router();

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
