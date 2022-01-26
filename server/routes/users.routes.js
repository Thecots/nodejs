const express = require("express");
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

/* get */
router.get("/user", (req, res) => {
  User.find({}, "username email role").exec((err, response) => {
    if (err) return res.status(400).json({ok: false, err});

    res.status(200).json({
      ok: true,
      response,
    });
  });
});

/* put */
router.put("/user", (req, res) => {
  let body = req.body;
  if(body.username == null || body.password == null || body.email == null){
    return res.status(400).json({ok:false, err: 'no data'});
  }
  
  let user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, response) => {
    if (err) return res.status(400).json({ok: false, err});
    res.status(200).json({
      ok: true,
      user: response,
    });
  });
});

/* delete */
router.delete("/user",(req,res) => {
  if(req.body.id == null) return res.status(400).json({ok: false, err: 'no data'});
  User.deleteOne({_id: req.body.id}, (err,response) => {
    if (err) return res.status(400).json({ok: false, err});
    if(response.deletedCount === 1) return res.status(200).json({ok:true});
    return res.status(400).json({ok: false});
  });
})


module.exports = router;
  