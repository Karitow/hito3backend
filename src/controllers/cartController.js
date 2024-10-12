import db from '../database/db.js';

export const addToCart = (userId, productId, quantity) => {
  return db('INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;', [userId, productId, quantity]);
};

export const getCart = (userId) => {
  return db('SELECT * FROM cart WHERE user_id = $1;', [userId]);
};

export const deleteFromCart = (userId, productId) => {
  return db('DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *;', [userId, productId]);
};
