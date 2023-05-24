require("./db");
require("dotenv").config();
const express = require("express");

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;
// Middle Ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:19000" }));

app.use("/api/", require("./router"));

app.listen(PORT, () => {
  console.log("Listening at Port no : " + PORT);
});
