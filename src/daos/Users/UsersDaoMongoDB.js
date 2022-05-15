import { ContainerMongoDB } from "../../containers/containerMongoDB";
import { UserSchema } from '../../models/userModel';
import log4js from "../../logs/loggers";

const loggerError = log4js.getLogger('error');

export class UsersDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('users', UserSchema);
  }

  async getByUser(username) {
    try {
      let docs;
      docs = await super.getAll();
      let response = docs.filter(doc => {
        if (doc.email === username) {
          return doc;
        }
      });
      return(response[0]);
    } catch (error) {
      loggerError.error('Error getting element: ' + error);
      throw Error("Error getting element by username in DAO: " + username);
    }
  }


  // async LogoutUserRes(resLocalUser) {
  //   try {
  //       const LogUs = await super.update({ _id: resLocalUser.id }, { $set: { token: [] } })
  //       return LogUs
  //   } catch (error) {
  //       logger.error(error)
  //       res.status(500).json(error)
  //   }
  // }
}

