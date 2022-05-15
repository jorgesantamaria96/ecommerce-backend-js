import nodemailer from 'nodemailer';
import { environment } from './environment';

export const transporter = nodemailer.createTransport({
  host: environment.NODEMAILER_HOST,
  port: environment.NODEMAILER_PORT,
  secure: true,
  auth: {
      user: environment.NODEMAILER_USER,
      pass: environment.NODEMAILER_PASS
  }
});