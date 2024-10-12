import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET_KEY

export const jwtSign = (payload) => jwt.sign(payload, KEY, { expireIn: '1h'});

export const jwtVerify = (token) => jwt.verify(token, KEY);

export const jwtDecode = (token) => jwt.decode(token);