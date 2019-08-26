const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./server/routes/users");
const products = require("./server/routes/products");
const banners = require("./server/routes/banners");
const passport = require("passport");
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
//db
const db = require("./server/config/keys").url;
//connenct
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database connected."))
  .catch(err => console.log(err));
//passport
app.use(passport.initialize());
//pass conf
require("./server/config/passport")(passport);

//user route
app.use("/api", users);
app.use("/api", products);
app.use("/api", banners);

app.listen(PORT, () => console.log(`Listenin on ${PORT}`));
