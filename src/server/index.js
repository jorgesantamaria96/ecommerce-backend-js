import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import cartRoute from '../routes/cart.js';
import loginRoute from '../routes/login.js';
import registerRoute from '../routes/register.js';
import logoutRoute from '../routes/logout.js';
import productsRoute from '../routes/products.js';
import chatRoute from '../routes/chat.js';
import { middleware } from '../middlewares/index.js';
import { environment } from '../configuration/environment.js';
import log4js from '../logs/loggers.js';


// Logs
const loggerConsole = log4js.getLogger('console');
const loggerError = log4js.getLogger('error');

const app = express();
app.use(express.json({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
// app.set("views", path.join(__dirname,"views"))

// Static Files

app.use(express.static(path.join(__dirname, "../..", "/public")));
app.use(express.static(path.join(__dirname, "../..", "/public/views")));

// Sessions

app.use(session({
  cookie: { maxAge: environment.SESSION_TIME },
  secret: environment.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  rolling:true
}))
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/api/productos", productsRoute);
app.use('/api/carrito', cartRoute);
app.use("/api/chat", chatRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);

// Main route
app.use("/", middleware.isRegister, (req, res) => {
  res.status(301).redirect("/products.html");
});

//Manejo error 404
app.use((req, res, next) => {
  res.status(404);
  res.send({error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`});
});

const server = http.createServer(app);
const io = require('socket.io')(server);


export {
  server, io
}; 
