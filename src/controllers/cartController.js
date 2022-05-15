import { 
  createCartService,
  addProductToCartService,
  deleteCartService,
  deleteProductFromCartService,
  getProductsFromCartService,
  getCartsService
} from "../services/cartsService";

// Logs
import log4js from "../logs/loggers";
const loggerConsole = log4js.getLogger('console');
const loggerError = log4js.getLogger('error');

// CREAMOS NUEVO CARRITO
const createCart = async (req, res) => {
  try {
    let idCart = await createCartService();
    res.status(201);
    res.send(idCart);
  } catch (err) {
    loggerError.error(err);
    throw Error('Error al crear el carrito desde el controlador');
  }
};

// AGREGAMOS PRODUCTO AL CARRITO
const addProductToCarrito = async (req, res) => {
  try {
    const { idProducto, idCarrito } = req.params;
    const response = await addProductToCartService(idProducto, idCarrito);
    if (response.status === "ok") {
      res.status(200);
      res.send(response.cart);
    } else{
      res.status(400);
      res.send({ error: `Producto con ID ${idProducto} o carrito con ID ${idCarrito} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en agregando producto al carrito desde el controlador");
  }
};

// BORRAR CARRITO SEGUN ID
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCartService(id);
    if (response.status === "ok") {
      res.status(200);
      res.send({ message: `Carrito con ID ${id} borrado` });
    } else if (response.status === "non-existent") {
      res.status(400);
      res.send({ error: `Carrito con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en borrar carrito desde el controlador");
  }
};

// BORRAR UN PRODUCTO DE UN CARRITO SEGUN ID
const deleteProductFromCart = async (req, res) => {
  try {
    const { idProducto, idCarrito } = req.params;
    const response = await deleteProductFromCartService(idProducto, idCarrito);
    if (response.status === "ok") {
      res.status(200);
      res.send(response.cart);
    } else if (response.status === "carrito no existe") {
      res.status(400);
      res.send({ error: `Carrito con ID ${idCarrito} no existe` });
    } else if (response.status === "producto no existe") {
      res.status(400);
      res.send({ error: `Producto con ID ${idProducto} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en borrar producto de un carrito desde el controlador");
  }
};

// OBTENER PRODUCTOS EN CARRITO POR ID
const getProductsFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductsFromCartService(id);

    if (response.status === "ok") {
      res.status(200);
      res.send(response.products);
    } else if (response.status === "carrito no existe") {
      res.status(400);
      res.send({ error: `Carrito con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en obtener productos del carrito, desde el controlador");
  }
};

//GET TODOS LOS CARRITOS
const getCarts = async (req, res) => {
  try {
    const response = await getCartsService();
    res.status(200);
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en traer todos los carritos, desde el controlador");
  }
};

export {
  createCart,
  addProductToCarrito,
  deleteCart,
  deleteProductFromCart,
  getProductsFromCart,
  getCarts
}