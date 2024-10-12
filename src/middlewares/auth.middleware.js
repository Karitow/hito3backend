//autorizacion
import { jwtVerify, jwtDecode } from '../util/jwt.js';

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(401).json({ status: false, code: 401, message: 'El Token no ha sido proporcionado' });
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return res.status(401).json({ status: false, code: 401, message: 'El formato del token es inválido' });
  }

  try {
    req.usuario = jwtDecode(token);
    jwtVerify(token) && next();
  } catch (error) {
    res.status(401).json({ status: false, code: 401, message: 'Token es inválido' });
  }
};
