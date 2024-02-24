const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

let data = [];

router.get("/", (req, res) => {
   res.json("inside user");
});

router.get("/jwtVerification", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).json({ msg: "token not found" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if (!decodedValue) {
            return res.status(500).json({ success: false, msg: "Unauthorized User" });
        }
        return res.status(200).json({ success: true, data: decodedValue });
    } catch (error) {
        res.send({
            success: false,
            msg: `Error in extracting the token : ${error}`
        });
    }
});

const listAllUsers = async (nextPageToken) => {
    try {
        const listUserResult = await admin.auth().listUsers(1000, nextPageToken);
        listUserResult.users.forEach((rec) => {
            data.push(rec.toJSON());
        });
        if (listUserResult.pageToken) {
            await listAllUsers(listUserResult.pageToken);
        }
    } catch (error) {
        console.log(error);
    }
};

// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all", async (req, res) => {
    try {
        // Ensure data is cleared before fetching users
        data = [];
        await listAllUsers();
        // console.log(data+"difjwoeijfcwchernfyywocyeryfmcioweucfeoihfoxmeufoihxiomhefxiueiufhy3ruihiuhiuhoiuh");
        return res.status(200).send({ success: true, data: data, dataCount: data.length });
    } catch (error) {
        return res.send({
            success: false,
            msg: `Error in listing users: ${error}`,
        });
    }
});

module.exports = router;
