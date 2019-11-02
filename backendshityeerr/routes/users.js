var express = require('express');
var router = express.Router();
var admin = require('../firebase');

/* GET users listing. */
router.post('/settings', function(req, res, next) {
  //connect to database post
  const db = admin.database();
  var ref = db.ref("server/saving-data/settings");

  ref.set(req.body.settings, err => {
    if (err) {

    } else {
      res.json(req.body.settings);
    }
  });


});


module.exports = router;
