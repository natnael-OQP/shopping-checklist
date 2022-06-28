const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
var cors = require("cors");

// routes
const itemsRoute = require("./routes/itemsRoute");

// port
const port = process.env.PORT || "5000";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/items", itemsRoute);

app.listen(port, () => {
  console.log(`backend server ${"http://localhost:" + port} `);
});
