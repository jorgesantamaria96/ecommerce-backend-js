const jwt = require("jsonwebtoken");
const { usersDao } = require("../daos/index");
const log4js = require("../logs/loggers");
const { environment } = require("../configuration/environment");

const loggerError = log4js.getLogger("error");

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.headers("authorization").replace("Bearer ", "");
    const verify = jwt.verify(token, environment.JWT_SECRET);
    const userLogin = await usersDao.authTokenVerify({ verify, token });

    if (!userLogin) {
      res.locals.user = userLogin;
      res.locals.token = token;
      next();
    }
  } catch (error) {
    loggerError.error(error);
    return res
      .status(401)
      .json({
        message: "Deslogueado: Acceso Restringido",
        error: error.message,
      });
  }
};

module.exports = {
  auth,
};
