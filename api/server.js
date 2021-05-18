const express = require("express");
const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const { uri } = require("./uri.js");

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.use("/api", routes);

    var server = app.listen(1738, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log("API listening at http://%s:%s", host, port);
    });
  });
var colorPalDB = mongoose.connection;
colorPalDB.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
