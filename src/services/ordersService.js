const { cartsDao, ordersDao, usersDao } = require("../daos/index");
const { transporter } = require("../configuration/nodemailer");
const { getDate } = require("../utils");

// Logs
const log4js = require("../logs/loggers");
const loggerConsole = log4js.getLogger("console");
const loggerError = log4js.getLogger("error");

const carts = cartsDao;
const orders = ordersDao;
const users = usersDao;

const getOrdersService = async (id) => {
  try {
    const order = await orders.getByUser(id);
    return order;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al obtener la orden - service");
  }
};

const getAllOrdersService = async () => {
  try {
    let allOrders = await orders.getAll();
    return allOrders;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al obtener las ordenes");
  }
};

const createOrderService = async (idUser, idCart) => {
  try {
    let user = await users.getById(idUser);
    let cart = await carts.getById(idCart);
    if (user && cart) {
      const products = cart.products;

      let newOrder = {
        timestamp: getDate(),
        user: idUser,
        products,
      };
      const order = await orders.save(newOrder);

      const mailOptions = {
        from: "ecommerce.animetaru@gmail.com",
        to: user.email,
        subject: "Nuevo pedido",
        html:
          "Productos solicitados <br>" +
          JSON.stringify(
            products[0].name + "  " + "$" + products[0].price,
            null,
            2
          ),
      };
      const info = await transporter.sendMail(mailOptions);

      return { status: "ok", order: order };
    } else {
      return { status: "error", message: "El usuario o el carrito no existen" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al crear la orden");
  }
};

const updateOrderService = async (id, orderMod) => {
  try {
    let order = await orders.getById(id);
    if (order) {
      finalOrder = {
        ...orderMod,
        timestamp: order.timestamp,
        user: order.user,
      };
      const updatedOrder = await orders.update(finalOrder);
      return { status: "ok", order: updatedOrder };
    } else {
      return { status: "non-existent" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al actualizar la orden - service");
  }
};

const deleteOrdersService = async (id) => {
  try {
    const order = await orders.deleteById(id);
    return order ? { status: "ok", order: order } : { status: "non-existent" };
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al borrar la orden - service");
  }
};

module.exports = {
  getOrdersService,
  createOrderService,
  deleteOrdersService,
  updateOrderService,
  getAllOrdersService,
};
