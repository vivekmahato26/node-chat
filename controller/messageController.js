const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");

exports.sendMessage = async (data) => {
    try {
        const { receiverId } = data.params;
        const { message } = data.body;
        const newMessage = await messageModel.create({
            message,
            receiver: receiverId,
            sender: data.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const {_id: messageId} = newMessage;
        const updatedReceiver = await userModel.findByIdAndUpdate(receiverId,{
            $push: {
                receivedMessages : messageId
            }
        });
        const updateSender = await userModel.findByIdAndUpdate(data.userId,{
            $push: {
                sentMessages: messageId
            }
        })
        return newMessage;
    } catch (error) {
        return ({ err: error.message })
    }
}

exports.getMessages = async (data) => {
    try {
        const {receivedMessages:rm , sentMessages:sm} = await userModel.findById(data.userId);
        const receivedMessagesPromises =  rm.map(e => {
            return messageModel.findById(e)
        });
        const receivedMessages = await Promise.all(receivedMessagesPromises);
        const sentMessages = [];
        for (const id of sm) {
            const sentData = await messageModel.findById(id);
            sentMessages.push(sentData);
        }
        return {
            sentMessages,
            receivedMessages
        }

    } catch (error) {
        return({err: error.message})
    }
}

exports.getMessage = async (data) => {
    try {
        const {messageId} = data.params;
        const msgData = await messageModel.findById(messageId);
        return msgData;
    } catch (error) {
        return({err: error.message})
    }
}
exports.updateMessage = async (data) => {
    try {
        const {messageId} = data.params;
        const msgData = await messageModel.findByIdAndUpdate(messageId, {
            message: data.body.message,
            updatedAt: new Date()
        },{new:true});
        return msgData;
    } catch (error) {
        return({err: error.message})
    }
}


exports.deleteMessage = async (data) => {
    try {
        const {messageId} = data.params;
        const {userId} = data;
        const {receiver,sender} = await messageModel.findById(messageId);
        if(userId === receiver) {
            const updatedUser = await userModel.findByIdAndUpdate(userId, {
                $pull: {receivedMessages: messageId}
            });
            return ({msg: "Message deleted sucessfully"})
        }
        if(userId === sender) {
            const updatedSender = userModel.findByIdAndUpdate(userId, {
                $pull: {sentMessages: messageId}
            });
            const updatedReceiver = userModel.findByIdAndUpdate(receiver, {
                $pull: {receivedMessages: messageId}
            });
            const deleteMsg = messageModel.findByIdAndDelete(messageId);
            const result = await Promise.all([updatedSender,updatedReceiver,this.deleteMessage]);
            return ({msg: "Message deleted sucessfully"})
        }
        return({err: "invalid messageId provided"})
    } catch (error) {
        return({err: error.message})
    }
}