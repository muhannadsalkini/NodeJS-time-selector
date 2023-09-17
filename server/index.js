import express from "express";
import mongoose from "mongoose";
import requestRoutes from "./routes/requests.js";

const app = express();
app.use(express.json());

const PORT = 4001;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/request", requestRoutes);

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(PORT + " did not connect!"));
