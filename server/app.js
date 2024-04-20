const express = require("express");
const app = express();
const { Company } = require("./db/db");
const port = 3001;
app.get("/", (req, res) => {
  res.json({ message: "Server is live" });
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
