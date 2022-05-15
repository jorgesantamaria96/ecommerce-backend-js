import passport from "passport";
import bcrypt from "bcrypt";
import { usersDao, cartsDao, chatsDao } from "../daos/index";
import { Strategy as LocalStrategy } from "passport-local";
import { getDate } from "../utils";
import { transporter } from "../configuration/nodemailer";
import log4js from "../logs/loggers";
import fs from "fs";

const loggerConsole = log4js.getLogger("console");
const loggerError = log4js.getLogger("error");

let users = usersDao;
let carts = cartsDao;
let chats = chatsDao;

const saltRounds = 10;

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  async(req, username, password, done) => {
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
      from: "ecommerce.animetaru@gmail.com",
      to: `${username}`,
      subject: "Nuevo usuario registrado - Servidor NodeJS",
      html: `<main>
      <h1 style='text-align: center'>Hola ${newUser.name} ${newUser.lastname}</h1>
      <h3 style='text-align: center'> Te damos la Bienvenida a Animetaru </h3>
      <div>
        <img src=${newUser.avatar} alt='animetaru' style='width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;'>
      </div>
      <div>
        <div style='display: flex; justify-content: center'>
          <div style='margin-left: 150px'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/362/362000.png?w=740'
              alt="..." style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'>
            <p style='text-align: center'> Pedí online <br>
              de manera fácil, práctica <br>
              y sin costo adicional. </p>
          </div>
          <div style='margin-left: 100px; margin-right: 100px'>
            <img
              src='https://img.freepik.com/vector-gratis/personaje-dibujos-animados-lindo-gato-aguacate-fruta-animal-aislada_138676-3141.jpg?w=740'
              alt="..." style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'>
            <p style='text-align: center'> Descubrí cientos <br>
              de locales y miles <br>
              de opciones para elegir. </p>
          </div>
          <div>
            <img src='https://img.freepik.com/vector-gratis/fondo-delicioso-sopa-ramen_52683-46005.jpg?t=st=1647314805~exp=1647315405~hmac=4168dd3e92f1a38d83b9f896d752b0f1e01188d6d447051ca8ec14a692ba19aa&w=740' alt="..."
              style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'>
            <p style='text-align: center'> Formá parte <br>
              de nuestra comunidad <br>
              con millones de usuarios. </p>
          </div>
        </div>
      </div>
      <div>
        <h3 style='text-align: center'>
          ¡Nos encanta que te hayas sumado! <br>
          El equipo de Animetaru
        </h3>
      </div>
      <footer>
        <h2 style='margin-left: 80px'> Seguinos en las Redes </h2>
      </footer>
    </main>`
    };

    const info = await transporter.sendMail(mailOptions);

    return done(null, newUser);
  }
  )
)

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

export{ 
  passport as passportConfig,
};