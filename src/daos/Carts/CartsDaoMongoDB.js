const { ContainerMongoDB } = require("../../containers/containerMongoDB");
const { CartsSchema } = require("../../models/cartModel");

class CartsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super("carts", CartsSchema);
  }
}

module.exports = {
  CartsDaoMongoDB,
};
