const { ContainerMongoDB } = require("../../containers/containerMongoDB");
const { UserSchema } = require("../../models/userModel");
const log4js = require("../../logs/loggers");

const loggerError = log4js.getLogger("error");

class UsersDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super("users", UserSchema);
  }

  async getByUser(username) {
    try {
      let docs;
      docs = await super.getAll();
      let response = docs.filter((doc) => {
        if (doc.email === username) {
          return doc;
        }
      });
      return response[0];
    } catch (error) {
      loggerError.error("Error getting element: " + error);
      throw Error("Error getting element by username in DAO: " + username);
    }
  }
}

module.exports = { UsersDaoMongoDB };
