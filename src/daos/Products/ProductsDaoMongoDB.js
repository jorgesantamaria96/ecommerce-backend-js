const { ContainerMongoDB } = require("../../containers/containerMongoDB");
const { ProductsSchema } = require("../../models/productsModel");
const log4js = require("../../logs/loggers");

const loggerError = log4js.getLogger("error");

class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super("products", ProductsSchema);
  }

  async getByCategory(category) {
    try {
      let products = await super.getAll();
      const productsCategory = products.filter(
        (product) => product.category == category
      );
      return productsCategory;
    } catch (error) {
      loggerError.error(error);
      throw Error("Error al obtener los productos por categoria - dao");
    }
  }
}

module.exports = { ProductsDaoMongoDB };
