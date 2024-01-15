const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");

const corsConfig = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsConfig));

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => console.log("Berhasil konek!"))
  .catch((err) => {
    console.log("Gagal karena:", err.message);
    const error = err;
    process.exit();
  });
app.use("/uploads", express.static("uploads"));
require("./app/routes/routes")(app);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
const port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send(this.error);
});
app.listen(port, () => {
  console.log(`Server berjalan di http:${port}/product`);
});
