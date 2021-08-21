const express = require('express');
const router = express.Router();
const app = require("../index");
const extend = require('util')._extend;
require('date-utils') //現在時刻の取得に必要

// ルームに接続する
app.io.sockets.on('connection', function(socket) {
  socket.on('client_to_server_join', function(room) {
      socket.join(room);
  });
});

// POSTリクエストのクエリパラメタのコメント情報をemitする
router.post('/comment/:room_id', function(req, res) {
  const msg = req.body;
  app.io.to(req.params.room_id).emit('comment', msg);
  res.end()
});

// Getリクエストのクエリパラメタのスタンプ情報をJSONにしてemitする
router.get('/like/:room_id', function (req, res) {
  const msg = extend({}, req.query);
  app.io.to(req.params.room_id).emit('like', msg);
  res.end();
});

// Getリクエストのクエリパラメタのアンケート回答情報をJSONにしてemitする
router.get('/answer/:room_id', function(req, res) {
  const msg = extend({}, req.query);
  app.io.to(req.params.room_id).emit('answer', msg);
  res.end()
});



module.exports = router;
