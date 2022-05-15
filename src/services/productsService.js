import { productsDao } from '../daos/index';
// import { getDate } from '../utils';

// Logs
import log4js from '../logs/loggers';
const loggerError = log4js.getLogger('error');

const products = productsDao;

const getProductsService = async () => {
  try {
    const response = await products.getAll();
    return response;
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al obtener los productos - service');
  }
}

const getProductByIdService = async (id) => {
  try {
    const response = await products.getById(id);

    if (response ){
      return { status: "ok", product: response };
    } else {
      return { status: "non-existent" };
    }

  } catch (error) {
    loggerError.error(error);
    throw Error('Error al obtener el producto por id - service');
  }
}

const getProductsByCategoryService = async (category) => {
  try {
    const response = await products.getByCategory(category);
    return (response ? { status: "ok", products: response } : { status: "non-existent" });
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al obtener los productos por categoría - service');
  }
}

const createProductService = async (product) => {
  try {
    const response = await products.save(product);
    return (response ? { status: "ok", product: response } : { status: "non-existent" });
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al crear el producto - service');
  }
}

const updateProductService = async (id, product) => {
  try {
    let response = await products.getById(id);
    if (response) {
      const newProduct = await products.update(id, product);
      return { status: "ok", product: newProduct };
    } else {
      return { status: "non-existent" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al actualizar el producto - service');
  }
}

const deleteProductService = async (id) => {
  try {
    let response = await products.getById(id);
    if (response) {
      await products.deleteById(id);
      const allProducts = await products.getAll();
      return { status: "ok" , products: allProducts };
    } else {
      return { status: "non-existent" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al borrar el producto - service');
  }
}

export {
  getProductsByCategoryService,
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
}