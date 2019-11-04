var express = require("express");
var router = express.Router();
var admin = require("../firebase");

/* GET users listing. */
router.post("/settings", function(req, res, next) {
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

router.post("/register", function(req, res, next) {
  admin
    .auth()
    .createUser({
      email: req.body.email,
      emailVerified: false,
      // phoneNumber: '+11234567890',
      password: req.body.password,
      displayName: req.body.displayName,
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.json(userRecord);
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });
});

router.post("/logout", function(req, res, next) {
  admin
    .auth()
    .signOut(req.body.email)
    .then(
      function() {
        console.log("Signed Out");
        res.json("Success");
      },
      function(error) {
        console.error("Sign Out Error", error);
        res.json("Failed");
      }
    );
});

router.get("/login", function(req, res, next) {
  admin
    .auth()
    .getUserByEmail("samitannir@gmail.com")
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully fetched user data:", userRecord.toJSON());
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
  res.json("Login Here");
});

module.exports = router;
