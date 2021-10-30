const User = require("../model/user");

module.exports = function (app) {
  //handle loging request
  app.post("/login", (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log(err);
        res.json({ err: true, message:"database error" });
      } else if (user) {
        res.json({ username: username });
      } else {
        res.json({ username: "" });
      }
    });
  });

  //handle signup request
  app.post("/signup", (req, res) => {
    let username = req.body.username;
    user = new User({ username: username, artists: [] });
    user.save((err, data) => {
      if (err) res.json({ err: true, message: "database error" });
      else res.json({ username: data });
    });
  });

  //handle add artist Ids
  app.post("/saveArtIds", (req, res) => {
    console.log(req.body)
    let { artistIds, username } = req.body;
    let validIds = artistIds.filter(item => item.length == 22)
    if (username) {
      User.findOneAndUpdate(
        { username: username },
        { artists: validIds },
        (err, data) => {
          if (err) res.json({ err: true, message: "database error" });
          else res.json({ artistIds: validIds });
        }
      );
    } else res.json({ err: true, message: "Please Login" });
  });

  //handle get artistIds
  app.post("/artistIds", (req, res) => {
    let username = req.body.username;
    if (username) {
      User.findOne({ username: username }, (err, data) => {
        if (err) res.json({ err: true, message: "database error" });
        else if (data) res.json({ artistIds: data.artists });
        else res.json({ err: true, message: "username doesn't exist" });
      });
    }
  });
};
