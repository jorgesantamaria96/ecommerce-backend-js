const {
  getPublicChatService,
  postPublicMessageService,
  getChatByEmailService,
  getPrivateChatByUserService,
  postPrivateMessageService,
} = require("../services/chatsService");
const log4js = require("../logs/loggers");

const loggerError = log4js.getLogger("error");

const getPublicChat = async (req, res) => {
  try {
    const response = await getPublicChatService();
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting public chat - controller");
  }
};

const postPublicMessage = async (req, res) => {
  try {
    const email = req.user.email;
    const msg = req.body.message;
    const type = req.user.isAdmin ? "system" : "user";

    const response = await postPublicMessageService(msg, type, email);
    res.status(201).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error posting public message - controller");
  }
};

const getChatByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const response = await getChatByEmailService(email);
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting chat by email - controller");
  }
};

const getPrivateChatByUser = async (req, res) => {
  try {
    const user = req.user;
    let isAdmin = "";
    let idChat = "";
    let email = "";

    if (user.isAdmin) {
      isAdmin = true;
      email = req.query.email;
    } else {
      isAdmin = false;
      idChat = user.email.chat;
    }
    const response = await getPrivateChatByUserService(isAdmin, idChat, email);
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting private chat by user - controller");
  }
};

const postPrivateMessage = async (req, res) => {
  try {
    const msg = req.body.message;
    const isAdmin = req.user.isAdmin;
    const emailUser = isAdmin ? req.query.email : "";
    const email = req.user.email;
    const idChat = isAdmin ? "" : req.user.chat;

    const response = await postPrivateMessageService(
      msg,
      isAdmin,
      emailUser,
      email,
      idChat
    );
    res.status(201).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error posting private message - controller");
  }
};

module.exports = {
  getPublicChat,
  postPublicMessage,
  getChatByEmail,
  getPrivateChatByUser,
  postPrivateMessage,
};
