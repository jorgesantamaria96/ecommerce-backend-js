const passport = require("passport");
const bcrypt = require("bcrypt");
const { usersDao, cartsDao, chatsDao } = require("../daos/index");
const { Strategy: LocalStrategy } = require("passport-local");
const { getDate } = require("../utils");
const { transporter } = require("../configuration/nodemailer");
const log4js = require("../logs/loggers");
const fs = require("fs");

const loggerConsole = log4js.getLogger("console");
const loggerError = log4js.getLogger("error");

let users = usersDao;
let carts = cartsDao;
let chats = chatsDao;

const saltRounds = 10;

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = await users.getByUser(username);
      const hash = bcrypt.hashSync(password, saltRounds);
      let avatar = undefined;

      if (user) {
        loggerConsole.warn(`El usuario ${username} ya existe`);
        return done(null, false, { message: "El usuario ya existe" });
      }
      if (req.file) {
        fs.renameSync(
          req.file.path,
          req.file.path + "." + req.file.mimetype.split("/")[1]
        ); //Funcion para agregar extension al archivo subido
        avatar = req.file.filename + "." + req.file.mimetype.split("/")[1];
      }

      let { name, lastname, address, phone, age, passwordRepeat } = req.body;

      if (password !== passwordRepeat) {
        loggerConsole.warn(`Las contraseñas no coinciden`);
        return done(null, false, { message: "Las contraseñas no coinciden" });
      }

      let cart = { timestamp: getDate(), products: [] };
      let aux = await carts.save(cart);
      cart = aux.id;

      let chat = { timestamp: getDate(), messages: [] };
      let aux2 = await chats.save(chat);
      chat = aux2.id;

      let newUser = await users.save({
        email: username,
        password: hash,
        name,
        lastname,
        address,
        phone,
        age,
        avatar,
        cart,
        chat,
      });

      const mailOptions = {
        from: "jorgealberto.santamaria96@gmail.com",
        to: `${username}`,
        subject: "[NEW USER] - Ecommerce Coderhouse JS",
        html: `<main>
      <h1 style='text-align: center'>Hola ${newUser.name} ${newUser.lastname}</h1>
      <h3 style='text-align: center'> Bienvenido a Ecommerce Coderhouse - Jorge Santamaria </h3>
      <div>
        <img src=${newUser.avatar} alt='animetaru' style='width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;'>
      </div>
      <div>
        <div style='display: flex; justify-content: center'>
          <div style='margin-left: 150px'>
            <p style='text-align: center'> Hacé tu pedido online <br>
              de forma sencilla, fácil <br>
              y sin recargos. </p>
          </div>
          <div style='margin-left: 100px; margin-right: 100px'>
            <p style='text-align: center'> Descubrí muchos <br>
              locales y tiendas con productos de diferentes <br>
              opciones para elegir. </p>
          </div>
        </div>
      </div>
      <div>
        <h3 style='text-align: center'>
          ¡Nos encanta que te hayas sumado! <br>
          El equipo de EcomerceCoderhouse
        </h3>
      </div>
      <footer>
        <h2 style='margin-left: 80px'> Seguinos en las Redes </h2>
      </footer>
    </main>`,
      };

      const info = await transporter.sendMail(mailOptions);

      return done(null, newUser);
    }
  )
);

// Sign In

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    //Validacion a la base de datos
    let user = await users.getByUser(username);

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }
    }
    return done(null, false);
  })
);

// Serializacion

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializacion

passport.deserializeUser(async (id, done) => {
  let user = await users.getById(id);
  done(null, user);
});

module.exports = { passport: passportConfig };
