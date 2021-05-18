const express = require("express");
const router = express.Router();
var User = require("./Models/userModel.js");
var Palette = require("./Models/paletteModel.js");
var Like = require("./Models/likeModel.js");

router.get("/", async (req, res) => {
  res.send("Welcome to the ColorPal API🎨");
});

// Retrieve all palettes from database
router.get("/palettes", async function (req, res) {
  try {
    const query = await Palette.find().sort({ _id: -1 });
    res.json(query);
  } catch (error) {
    console.log("Something went wrong");
    res.send("Fail");
    throw error;
  }
});

//USER ROUTES
// Retrieved specified user from database
router.get("/login/:username/:password", async function (req, res) {
  try {
    const query = await User.find({ username: req.params.username });
    var match = false;
    var id = "";
    if (query[0].password === req.params.password) {
      match = true;
      id = query[0]._id;
    } else match = false;

    res.json({
      match: match,
      id: id,
    });
  } catch (error) {
    console.log("Something went wrong");
    throw error;
  }
});
// Add new user to database
router.post("/users/:username/:password", async function (req, res) {
  var username = req.params.username;
  var password = req.params.password;
  try {
    var result = await User.create({ username: username, password: password });
    if (result) {
      res.status(201).send("User created");
    } else {
      res.status(500).send("Username is already taken");
    }
  } catch (error) {
    console.log("Something went wrong");
    res.status(500).send("Username is already taken");
    throw error;
  }
});

//PALETTE ROUTES
// Retrieve all palettes from database
router.get("/palettes", async function (req, res) {
  try {
    const query = await Palette.find().sort({ _id: -1 });
    res.json(query);
  } catch (error) {
    console.log("Something went wrong");
    res.send("Fail");
    throw error;
  }
});
// Retrive palettes created by specified user from database
router.get("/palettes/:username", async function (req, res) {
  var username = req.params.username;
  try {
    const query = await Palette.find({ creator: username }).sort({ _id: -1 });
    res.json(query);
  } catch (error) {
    console.log("Something went wrong");
    res.send("Fail");
    throw error;
  }
});
// Adds a new palette to the database
router.post(
  "/palettes/:name/:creator/:count/:color1/:color2/:color3/:color4/:color5/",
  async function (req, res) {
    var name = req.params.name;
    var creator = req.params.creator;
    var count = req.params.count;
    var color1 = req.params.color1;
    var color2 = req.params.color2;
    var color3 = req.params.color3;
    var color4 = req.params.color4;
    var color5 = req.params.color5;
    try {
      var result = await Palette.create({
        name: name,
        creator: creator,
        count: count,
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        color5: color5,
      });
      if (result) {
        res.status(201).send("Palette inserted");
      } else {
        res.status(500).send("Insert was unable to be made into database");
      }
    } catch (error) {
      console.log("Something went wrong");
      res.status(500).send("Insert was unable to be made into database");
    }
  }
);
// Removes a specified palette from the database
router.delete("/palettes/:paletteid", async function (req, res) {
  var paletteid = req.params.paletteid;
  try {
    var result = await Palette.deleteOne({ _id: paletteid });
    console.log(result);
    if (result) {
      res.status(200).send("Palette deleted");
    } else {
      res.status(500).send("Palette failed to be deleted");
    }
  } catch (error) {
    console.log("Something went wrong");
    res.status(500).send("Palette failed to be deleted");
    throw error;
  }
});

//LIKE ROUTES
// Retrieves a specified user's liked palettes from the database
router.get("/likes/:userid", async function (req, res) {
  var userID = req.params.userid;
  try {
    const query = await Like.find({ user_id: userID })
      .populate("palette_id")
      .select("palette_id");
    res.json(query);
  } catch (error) {
    console.log("Something went wrong");
    res.send("Fail");
    throw error;
  }
});
// Retrieves specified like from database
router.get("/likes/:userid/:paletteid", async function (req, res) {
  var userID = req.params.userid;
  var paletteID = req.params.paletteid;
  try {
    const query = await Like.find({ user_id: userID, palette_id: paletteID });
    res.json(query);
  } catch (error) {
    console.log("Something went wrong");
    res.send("Fail");
    throw error;
  }
});
// Adds new like to the database
router.post("/likes/:userid/:paletteid", async function (req, res) {
  var userid = req.params.userid;
  var paletteid = req.params.paletteid;
  try {
    var result = await Like.create({ user_id: userid, palette_id: paletteid });
    if (result) {
      res.status(201).send("Like created");
    } else {
      res.status(500).send("Like failed to be created");
    }
  } catch (error) {
    console.log("Something went wrong");
    res.status(500).send("Palette is already liked by user");
    throw error;
  }
});
// Removes a like from the database
router.delete("/likes/:userid/:paletteid", async function (req, res) {
  var userid = req.params.userid;
  var paletteid = req.params.paletteid;
  try {
    var result = await Like.deleteOne({
      user_id: userid,
      palette_id: paletteid,
    });
    if (result) {
      res.status(200).send("Like Deleted");
    } else {
      res.status(500).send("Like could not be deleted");
    }
  } catch (error) {
    console.log("Something went wrong");
    res.status(500).send("Like could not be deleted");
    throw error;
  }
});

module.exports = router;
