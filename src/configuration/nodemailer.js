const nodemailer = require("nodemailer");
const { environment } = require("./environment");

const transporter = nodemailer.createTransport({
  host: environment.NODEMAILER_HOST,
  port: environment.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: environment.NODEMAILER_USER,
    pass: environment.NODEMAILER_PASS,
  },
});

module.exports = {
  transporter,
};
