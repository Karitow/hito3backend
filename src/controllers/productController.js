import * as sql from '../models/Product.models.js';

export const getProducts = (req, res) => {
  sql.getProducts()
    .then((result) => res.status(200).json({ status: true, code: 200, message: result.rows }))
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const createProduct = (req, res) => {
  sql.createProduct(req.body)
    .then((result) => res.status(201).json({ status: true, code: 201, message: result.rows[0] }))
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const updateProduct = (req, res) => {
  sql.updateProduct(req.params.id, req.body)
    .then((result) => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const deleteProduct = (req, res) => {
  sql.deleteProduct(req.params.id)
    .then((result) => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error.message }));
};
