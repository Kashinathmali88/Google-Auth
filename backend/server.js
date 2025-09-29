import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routers/authRouter.js";
import connectDB from "./config/connectDB.js";

const app = express();
const Port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["POST", "GET"],
    credentials: true,
    headers: { "Content-Type": "application/json" },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from auth server");
});

app.use("/auth/", router);

connectDB();

app.listen(Port, () => {
  console.log(`Server is running at port ${Port}`);
});
