const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  const msg = "";
  res.render("startNew",{
    title : "コメントツール",
    msg : msg,
  });
});

module.exports = router;
