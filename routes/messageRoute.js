const {Router} = require("express");

const {sendMessage} = require("../controller/messageController");
const messageRouter = new Router();

messageRouter.post("/send", async(req,res) => {
    if(req.isAuth) {
        try {
            const response = await sendMessage(req);
            res.send(response);
            res.end();
        } catch (error) {
            res.send({err: error.message});
            res.end();
        }
    } else {
        res.send({err: "Please Login!!!"});
        res.end();
    }
})
messageRouter.get("/messages", async(req,res) => {

})
messageRouter.get("/:messageId", async(req,res) => {

})
messageRouter.delete("/:messageId", async(req,res) => {

})
messageRouter.put("/:messageId", async(req,res) => {

})

module.exports = messageRouter;