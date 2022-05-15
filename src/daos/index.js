let productsDao;
let cartsDao;
let ordersDao;
let usersDao;
let chatsDao;

let contenedor = "mongodb";
switch (contenedor) {
  case "mongodb":
    const { ProductsDaoMongoDB } = require("./Products/ProductsDaoMongoDB");
    const { CartsDaoMongoDB } = require("./Carts/CartsDaoMongoDB");
    const { OrdersDaoMongoDB } = require("./Orders/OrdersDaoMongoDB");
    const { UsersDaoMongoDB } = require("./Users/UsersDaoMongoDB");
    const { ChatsDaoMongoDB } = require("./Chats/ChatsDaoMongoDB");

    productsDao = new ProductsDaoMongoDB();
    cartsDao = new CartsDaoMongoDB();
    ordersDao = new OrdersDaoMongoDB();
    usersDao = new UsersDaoMongoDB();
    chatsDao = new ChatsDaoMongoDB();
    break;
  default:
    break;
}

module.exports = { productsDao, cartsDao, ordersDao, usersDao, chatsDao };
