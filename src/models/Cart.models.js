import db from '../database/db.js';

export const addToCart = (usuarioId, productoId, cantidad) => {
  return db('INSERT INTO Carrito_producto (carrito_id, producto_id, cantidad) VALUES ((SELECT id FROM Carrito WHERE usuario_id = $1), $2, $3) RETURNING *;', [usuarioId, productoId, cantidad]);
};

export const getCart = (usuarioId) => {
  return db('SELECT * FROM Carrito_producto WHERE carrito_id = (SELECT id FROM Carrito WHERE usuario_id =$1);', [usuarioId]);
};

export const deleteFromCart = (carritoId, productoId) => {
  return db('DELETE FROM Carrito_producto WHERE carrito_id = $1 AND producto_id = $2 RETURNING *;', [carritoId, productoId]);
};
