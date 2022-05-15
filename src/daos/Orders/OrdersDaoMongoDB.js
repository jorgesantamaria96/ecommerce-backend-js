const { ContainerMongoDB } = require("../../containers/containerMongoDB");
const { OrdersSchema } = require("../../models/ordersModel");
const log4js = require("../../logs/loggers");

const loggerError = log4js.getLogger("error");

class OrdersDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super("orders", OrdersSchema);
  }

  async getByUser(idUser) {
    try {
      let orders = await super.getAll();
      const ordersUser = orders.filter((order) => order.user == idUser);
      return ordersUser;
    } catch (error) {
      loggerError.error(error);
      throw Error("Error al obtener las ordenes por usuario - dao");
    }
  }
}

module.exports = { OrdersDaoMongoDB };
