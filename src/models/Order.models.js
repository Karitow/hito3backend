import db from '../database/db.js';

export const createOrder = (usuarioId, fecha_pedido, total) => {
  return db('INSERT INTO Pedidos (usuario_id, fecha_pedido,total ) VALUES ($1, $2, $3) RETURNING *;', [usuarioId, fecha_pedido, total]);
};

export const getOrder = (pedidosId) => {
  return db('SELECT * FROM Pedidos WHERE id = $1;', [pedidosId]);
};

export const getAllOrders = (usuarioId) => {
  return db('SELECT * FROM Pedidos WHERE usuario_id = $1;', [usuarioId]);
};

export const updateOrder = (pedidosId, status) => {
  return db('UPDATE Pedidos SET status = $2 WHERE id = $1 RETURNING *;', [pedidosId, status]);
};

export const deleteOrder = (pedidosId) => {
  return db('DELETE FROM Pedidos WHERE id = $1 RETURNING *;', [pedidosId]);
};
