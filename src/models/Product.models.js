import db from '../database/db.js';

export const getProducts = () => {
  return db.query('SELECT * FROM Productos');
};

export const createProduct = (producto) => {
  const { nombre, descripcion, stock, imageUrl, categoria } = producto;
  return db.query(
    'INSERT INTO productos (nombre, descripcion, stock, image_url, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, descripcion, stock, imageUrl, categoria]
  );
};

export const updateProduct = (id, producto) => {
  const { nombre, descripcion, stock, imageUrl, category } = producto;
  return db(
    'UPDATE products SET nombre = $1, descripcion = $2, stock = $3, image_url = $4, categoria = $5 WHERE id = $6 RETURNING *',
    [nombre, descripcion, stock, imageUrl, categoria, id]
  );
};

export const deleteProduct = (id) => {
  return db('DELETE FROM Productos WHERE id = $1 RETURNING *', [id]);
};
