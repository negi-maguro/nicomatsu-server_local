const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const stampList = [];
const seasonStampList = [];

const stampNames = fs.readdirSync('./public/images/stamps');
stampNames.forEach((stampFullname) => {
  stampName = stampFullname.replace(/\.[^/.]+$/, "")
  stampList.push(stampName);
});

const seasonStampNames = fs.readdirSync('./public/images/seasons');
seasonStampNames.forEach((seasonStampFullname) => {
  seasonStampName = seasonStampFullname.replace(/\.[^/.]+$/, "")
  seasonStampList.push(seasonStampName);
});

// ルーム名未入力ならオープンルームを開く
router.get('/', function(req, res, next) {
  const msg = "オープンルーム";
  res.render("controller",{
    room:"オープンルーム",
    msg : msg,
    stampList: stampList,
    seasonStampList: seasonStampList
  });
});

// ルーム名ありならルーム名有りとして開く
router.get('/:room_id', function(req, res, next) {
  const msg = "「" + req.params.room_id + "」ルーム";
  res.render("controller",{
    room:req.params.room_id,
    msg : msg,
    stampList: stampList,
    seasonStampList: seasonStampList
  });
});

module.exports = router;
