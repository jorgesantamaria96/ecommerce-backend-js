const { ContainerMongoDB } = require("../../containers/containerMongoDB");
const { ChatsSchema } = require("../../models/chatModel");

class ChatsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super("chats", ChatsSchema);
  }
}

module.exports = { ChatsDaoMongoDB };
