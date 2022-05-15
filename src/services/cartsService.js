import { cartsDao, productsDao } from '../daos/index';
import { getDate } from '../utils';

// Logs
import log4js from '../logs/loggers';
const loggerConsole = log4js.getLogger('console');
const loggerError = log4js.getLogger('error');

let carts = cartsDao;
let products = productsDao;

// CREAMOS UN CARRITO NUEVO
const createCartService = async () => {
  try {
    let cart = {
      timestamp: getDate(),
      products: [],
    };
    let cartCreated = await carts.save(cart);
    return { id: cartCreated.id}
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al crear el carrito');
  }
}

// AÑADIR PRODUCTO A CARRITO
const addProductToCartService = async (idProduct, idCart) => {
  try {
    let product = await products.getById(idProduct);
    let cart = await carts.getById(idCart);
    if (cart && product) {
      cart.products.push(product);
      await carts.update(cart);
      return { status: "ok", cart: cart };
    } else {
      return { status: "error", message: "El carrito o el producto no existen" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error('Error al añadir el producto al carrito');
  }
}

// BORRAR CARRITO SEGÚN ID
const deleteCartService = async (id) => {
  try {
    let cart = await carts.getById(id);
    if (Object.keys(cart).length != 0) {
      await carts.deleteById(id);
      return { status: "ok" };
    }
    else {
      return { status: "non-existent" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al borrar el carrito por ID");
  }
};

// BORRAR UN PRODUCTO DE UN CARRITO SEGÚN ID
const deleteProductFromCartService = async (idProduct, idCart) => {
  try {
    let cart = await carts.getById(idCart);
    if (Object.keys(cart).length != 0) {
      let productsFromCart = cart.products;
      let indexProduct = productsFromCart.findIndex((aux) => aux.id == idProduct);
      if (indexProduct >= 0) {
        cart.products.splice(indexProduct, 1);
        carts.update(cart);
        return { status: "ok", cart: cart };
      }
      else {
        return { status: "producto no existe" };
      }
    }
    else {
      return { status: "carrito no existe" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error al borrar un producto de un carrito");
  }
};

//OBTENER PRODUCTOS DEL CARRITO POR ID
const getProductsFromCartService = async (id) => {
  try {
    let cart = await carts.getById(id);
    if (cart) {
      const productsFromCart = cart.products;
      return { estado: "ok", products: productsFromCart };
    }
    else {
      return { estado: "carrito no existe" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error obteniendo los productos del carrito con id: " + id);
  }
};

//GET TODOS LOS CARRITOS
const getCartsService = async () => {
  try {
    let allCarts = await carts.getAll();
    return allCarts;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error obteniendo todos los carritos");
  }
};

export {
  createCartService,
  addProductToCartService,
  deleteCartService,
  deleteProductFromCartService,
  getProductsFromCartService,
  getCartsService,
}
