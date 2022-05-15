//GET LOGIN

const getUser = (req, res) => {
  if (req.user) {
    res.status(200)
    res.send({
      user: req.user.nombre,
      avatar: req.user.avatar,
      cart: req.user.carrito,
    });
  } else {
    res.status(404)
    res.send(false);
  }
};

export {
  getUser
}
