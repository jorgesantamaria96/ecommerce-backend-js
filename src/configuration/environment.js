require('dotenv').config();

const environment = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority` || "",
  NODEMAILER_USER: process.env.NODEMAILER_USER || "",
  NODEMAILER_PASS: process.env.NODEMAILER_PASS || "",
  NODEMAILER_PORT: process.env.NODEMAILER_PORT || "",
  NODEMAILER_HOST: process.env.NODEMAILER_HOST || "",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  SESSION_TIME: Number(process.env.SESSION_TIME) || 600000,
  JWT_SECRET: process.env.JWT_SECRET || "", 
}

export {
  environment
}

