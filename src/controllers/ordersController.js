const {
  getOrdersService,
  createOrderService,
  updateOrderService,
  deleteOrdersService,
  getAllOrdersService,
} = require("../services/ordersService");

const log4js = require("../logs/loggers");

const loggerError = log4js.getLogger("error");

const getOrders = async (req, res) => {
  try {
    const response = await getOrdersService(req.user.id);
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting orders - controller");
  }
};

const getAllOrders = async (req, res) => {
  try {
    const response = await getAllOrdersService();
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting all orders - controller");
  }
};

const postOrder = async (req, res) => {
  try {
    const { idCart } = req.params;
    const { idUser, email } = req.user;
    let addressUser = req.body.address ? req.body.address : "";
    const response = await createOrderService(req.body, req.user.id);

    if (response.status === "ok") {
      res.status(201).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error posting order - controller");
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, status, address } = req.body;
    const orderMod = {
      id,
      products,
      status,
      address,
    };
    const response = await updateOrderService(id, orderMod);
    if (response.status === "ok") {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error updating order - controller");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteOrdersService(id);
    if (response.status === "ok") {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error deleting order - controller");
  }
};

module.exports = {
  getOrders,
  getAllOrders,
  postOrder,
  updateOrder,
  deleteOrder,
};
