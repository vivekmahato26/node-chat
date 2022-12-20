const { Router } = require("express");

const { sendMessage, getMessages, getMessage, updateMessage,deleteMessage } = require("../controller/messageController");
const messageRouter = new Router();

messageRouter.post("/send/:receiverId", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await sendMessage(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({ err: error.message });
            res.end();
        }
    } else {
        res.send({ err: "Please Login!!!" });
        res.end();
    }
})
messageRouter.get("/", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await getMessages(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({ err: error.message });
            res.end();
        }
    } else {
        res.send({ err: "Please login!!!" });
        res.end();
    }
})
messageRouter.get("/:messageId", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await getMessage(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({ err: error.message });
            res.end();
        }
    } else {
        res.send({ err: "Please login!!!" });
        res.end();
    }
})
messageRouter.delete("/:messageId", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await deleteMessage(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({ err: error.message });
            res.end();
        }
    } else {
        res.send({ err: "Please login!!!" });
        res.end();
    }
})
messageRouter.put("/:messageId", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await updateMessage(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({ err: error.message });
            res.end();
        }
    } else {
        res.send({ err: "Please login!!!" });
        res.end();
    }
})

module.exports = messageRouter;