let productsDao
let cartsDao
let ordersDao
let usersDao
let chatsDao

let contenedor = 'mongodb'
switch (contenedor) {
  // case 'txt':
  //     const ProductsDaoArchivo = require("./Products/ProductsDao")
  //     const CarritosDaoArchivo = require("./Carts/CarritoDaoArchivo")

  //     productosDao = new ProductosDaoArchivo()
  //     carritosDao = new CarritosDaoArchivo()
  //     break
  // case 'firebase':
  //     const ProductosDaoFirebase = require("./Products/ProductosDaoFirebase");
  //     const CarritosDaoFirebase = require("./Carts/CarritosDaoFirebase")
  //     productosDao = new ProductosDaoFirebase()
  //     carritosDao = new CarritosDaoFirebase()
  //     break
  case 'mongodb':
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
    break
  default:
    break
}

export {
  productsDao,
  cartsDao,
  ordersDao,
  usersDao,
  chatsDao
}