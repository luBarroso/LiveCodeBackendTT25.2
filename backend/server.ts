import express from "express";
import configDotenv from "./src/config/dotenv";
import cors from "cors";
import routes from "./src/routes/routes";
import passport from "passport";
import configAuth from "./src/middlewares/useCredentialMiddleware";

configDotenv();
configAuth();

const app = express();
const port = process.env.PORT;

app.use(passport.initialize());
app.use("/uploads", express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.use("/", routes);

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} app listening at http://localhost:${port}`
  );
});
