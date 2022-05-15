import { ContainerMongoDB } from "../../containers/containerMongoDB";
import { ProductsSchema } from '../../models/productsModel';
import log4js from '../../logs/loggers';

const loggerError = log4js.getLogger('error');

export class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('products', ProductsSchema);
  }

  async getByCategory(category) {
    try {
      let products = await super.getAll();
      const productsCategory = products.filter(product => product.category == category);
      return productsCategory;
    } catch (error) {
      loggerError.error(error);
      throw Error('Error al obtener los productos por categoria - dao');
    }
  }
}

