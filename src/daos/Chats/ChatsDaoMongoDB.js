import { ContainerMongoDB } from "../../containers/containerMongoDB";
import { ChatsSchema } from "../../models/chatModel";

class ChatsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('chats', ChatsSchema);
  }
}

export { ChatsDaoMongoDB };