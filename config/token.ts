import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || "default-token-secure-azecedszz2";

const REMEMBER_ME_EXPRIATION_TIME = process.env.REMEMBER_ME_EXPRIATION_TIME || "365d";
const USER_TOKEN_EXPIRATION_TIME = process.env.REMEMBER_ME_EXPRIATION_TIME || "10d";
export { JWT_SECRET_TOKEN, REMEMBER_ME_EXPRIATION_TIME, USER_TOKEN_EXPIRATION_TIME };
