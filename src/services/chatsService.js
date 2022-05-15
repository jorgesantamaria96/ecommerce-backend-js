import { chatsDao, usersDao } from '../daos';
import { getDate } from '../utils';

// Logs
import log4js from '../logs/loggers';
const loggerError = log4js.getLogger('error');

let chats = chatsDao;
let users = usersDao;

const idMainChat = "62300971066bc32e142aa268";

const getPublicChatService = async (req, res) => {
  try {
    const mainChat = await chats.getById(idMainChat);
    return mainChat;
  } catch (error) {
    loggerError.error('Error getting element: ' + error);
    throw Error("Error getting chat by id: " + idMainChat);
  }
};

const postPublicMessageService = async (msg, type, email) => {
  try {
    const mainChat = await chats.getById(idMainChat);
    console.log(mainChat);
    
    const newMessage = {
      timestamp: getDate(),
      author: email,
      body: msg,
      type,
    };

    mainChat.messages.push(newMessage);
    await chats.update(mainChat);
    return mainChat.messages;
    
  } catch (error) {
    loggerError.error(error);
    throw Error("Error post public message - service");
  }
};

const getChatByEmailService = async (email) => {
  try {
    const chat = await chats.getById(idMainChat);
    const msgArray = chat.messages;
    const mainMsg = msgArray.filter( (element) => {
      if ( element.author === email ) {
        return element;
      }
    });
    return mainMsg;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting chat by email - service");
  }
};

const getPrivateChatByUserService = async (isAdmin, idChat="", email="") => {
  try {
    let chat = "";
    if (isAdmin) {
      const user = await users.getByUser(email);
      chat = user.chat;
    } else {
      chat = idChat;
    }
    const chatUser = await chats.getById(chat);
    return chatUser;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting private chat by user - service");
  }
};

const postPrivateMessageService = async (msg, isAdmin, emailUser="", email, idChat="") => {
  try {
    let chat = "";
    let type = "";
    if (isAdmin) {
      const user = await users.getByUser(emailUser);
      chat = user.chat;
      type = "system";
    } else {
      chat = idChat;
      type = "user";
    }
    const chatUser = await chats.getById(chat);

    const newMessage = {
      timestamp: getDate(),
      author: email,
      body: msg,
      type,
    };

    chatUser.messages.push(newMessage);
    await chats.update(chatUser);
    return chatUser;

  } catch (error) {
    loggerError.error(error);
    throw Error("Error post private message - service");
  }
}

export {
  getPublicChatService,
  postPublicMessageService,
  getChatByEmailService,
  getPrivateChatByUserService,
  postPrivateMessageService,
}

