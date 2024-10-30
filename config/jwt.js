import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";
import { status } from "../utils/const.js";
import { auth } from "../src/controllers/auth.controller.js";

dotenv.config();

let accessTokenPublicKey = fs.readFileSync(
  `${process.env.BASE_KEY_PATH}/access_token.public.key`
);
let accessTokenPrivateKey = fs.readFileSync(
  `${process.env.BASE_KEY_PATH}/access_token.private.key`
);
let refreshTokenPublicKey = fs.readFileSync(
  `${process.env.BASE_KEY_PATH}/refresh_token.public.key`
);
let refreshTokenPrivateKey = fs.readFileSync(
  `${process.env.BASE_KEY_PATH}/refresh_token.private.key`
);

export const createTokenAsyncKey = (data) => {
  return jwt.sign({ payload: data }, accessTokenPrivateKey, {
    algorithm: "RS256",
    expiresIn: "10s",
  });
};

export const createRefTokenAsyncKey = (data) => {
  return jwt.sign({ payload: data }, refreshTokenPrivateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
};

export const verifyTokenAsyncKey = (token) => {
  try {
    console.log(accessTokenPublicKey);
    jwt.verify(token, accessTokenPublicKey);

    return { isValid: true, error: null };
  } catch (error) {
    // token is wrong
    return { isValid: false, error };
  }
};

export const middlewareAsyncToken = (req, res, next) => {
  try {
    let { token } = req.headers;

    if (!token) {
      return res
        .status(status.NOT_AUTHORISE)
        .json({ message: `Access token is not found` });
    }

    try {
      const { isValid, error } = verifyTokenAsyncKey(token);
      if (isValid) {
        next();
      }
      if (error.name === "TokenExpiredError") {
        // Call extendAsyncToken with `true` to signal that `next()` should be called afterward
        return auth.extendAsyncToken(req, res, next, true);
      }
    } catch (err) {
      return res.status(status.NOT_AUTHORISE).json({ message: `Aynchronse token issues ${err}` });
    }
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER)
      .json({ message: `Asynchronised token issues: ${error}` });
  }
};
