const express = require("express");
const router = express.Router();
const path = require('path');




/* 404 */
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
});

module.exports = router;
