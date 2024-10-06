import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
