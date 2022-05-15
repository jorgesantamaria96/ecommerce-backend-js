import {
  getProductsService,
  getProductByIdService,
  getProductsByCategoryService,
  createProductService,
  updateProductService,
  deleteProductService
} from '../services/productsService';

import { getDate } from "../utils";
import log4js from '../logs/loggers';

const loggerError = log4js.getLogger('error');

const getProducts = async (req, res) => {
  try {
    const response = await getProductsService();
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting products - controller");
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductByIdService(id);
    if (response.status === 'ok') {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting product by id - controller");
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await getProductsByCategoryService(category);
    if (response.status === 'ok') {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error getting products by category - controller");
  }
}

const postProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, thumbnail } = req.body;
    const product = {
      name,
      price,
      category,
      description,
      stock,
      thumbnail,
      timestamp: getDate()
    }
    const response = await createProductService(product);
    if (response.status === 'ok') {
      res.status(201).send(response);
    } else {
      res.status(400).send(`bad request, ${response}`);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error posting product - controller");
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, stock, thumbnail } = req.body;
    const product = {
      id,
      timestamp: getDate(),
      name,
      price,
      category,
      description,
      stock,
      thumbnail
    }
    const response = await updateProductService(id, product);
    if (response.status === 'ok') {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error updating product - controller");
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProductService(id);
    if (response.status === 'ok') {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error deleting product - controller");
  }
}

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  postProduct,
  updateProduct,
  deleteProduct
}