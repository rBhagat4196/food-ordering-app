const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./serviceAccountKey.json");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
    return res.send("hello");
});

app.use("/api/user", userRoute);

exports.App = functions.https.onRequest(app);
