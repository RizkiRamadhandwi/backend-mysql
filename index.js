const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", (req, res) => {
  res.send("welcome");
});

const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
