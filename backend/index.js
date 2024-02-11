const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
