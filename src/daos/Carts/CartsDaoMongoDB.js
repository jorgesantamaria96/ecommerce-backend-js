import { ContainerMongoDB } from "../../containers/containerMongoDB";
import { CartsSchema } from "../../models/cartModel";

class CartsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('carts', CartsSchema);
  }
}

export {
  CartsDaoMongoDB
}

