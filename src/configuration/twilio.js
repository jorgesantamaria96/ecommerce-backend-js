import twilio from "twilio";
import { environment } from "./environment";

export const twilioClient = twilio(environment.TWILIO_ACCOUNT_SID, environment.TWILIO_AUTH_TOKEN);