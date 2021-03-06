var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect("/sessions");
  } else {
    res.redirect('login');
  }
});

router.get("/login", function(req, res, next) {
  res.render('login', {layout: false});
});

router.get("/createAccount", function(req, res, next) {
  res.render('createAccount', {layout: false});
});

router.get("/about", function(req, res, next) {
  res.render("about");
});

router.get('/meeting/:sessionID', function (req, res, next) {
  console.log('hi');
  console.log(req.user._id);
    Session
    .findOne({"_id" : req.params.sessionID})
    .populate("members", 'firstName lastName -_id')
    .exec(function (err, session) {
      if (err) throw err; //TODO: Change throw to a redirect

      console.log(session);
      console.log(session.members);
      res.render("meeting", {layout: false, id : req.params.sessionID, userId: req.user._id, members: session.members, session:session});
    }
  );

});

router.get('/meeting/:sessionID/speechmaticsUpload', function (req, res, next) {
  console.log('hi');
  console.log(req.user._id);
    Session
    .findOne({"_id" : req.params.sessionID})
    .populate("members", 'firstName lastName -_id')
    .exec(function (err, session) {
      if (err) throw err; //TODO: Change throw to a redirect

      console.log(session);
      console.log(session.members);
      res.render("speechmaticsUpload", {layour: false, id : req.params.sessionID, userId: req.user._id, members: session.members});
    }
  );

});

router.get("/joinSession", function(req, res, next) {
  var validMeeting = req.query.validMeeting;
  // console.log(validMeeting);
  // console.log(typeof(validMeeting));
  if(validMeeting == 0) {
    console.log("Not valid meeting code");
    res.render('joinSession', {layout: false, errorMessage: "This is not a valid Meeting Code"});
  }
  else {
    //console.log('go in');
    res.render('joinSession', {layout: false});  
  }
  
});

router.get("/createSession", function(req, res, next) {
  res.render('createSession', {layout: false});
});

router.get('/record', function(req, res, next) {
  res.render('record');
});

router.get('/upload', function(req, res, next) {
  res.render("upload");
});

router.get('/upload_json', function(req, res, next) {
  res.render("upload_json");
});

router.post("/upload", function(req, res, next) {
  console.log("upload");
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
