import db from '../database/db.js';

export const createOrder = (req, res) => {
  const { usuarioId, fecha_pedido, total } = req.body;
  if(!usuarioId || !fecha_pedido || !total ) {
    return res.status(400).json({status:false, code:400, message: 'Pedido Invalido'})
  }
  return db.query('INSERT INTO pedidos (usuario_id, fecha_pedido, total) VALUES ($1, $2, $3) RETURNING *', [usuarioId, fecha_pedido, total])
    .then(result => res.status(201).json({ status: true, code: 201, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const getOrder = (req, res) => {
  const { orderId } = req.params;
  return db.query('SELECT * FROM pedidos WHERE id = $1', [orderId])
  .then(result => { 
    if (result.rows.lenght === 0 ){
    return res.starus(404).json({ status:false, code:404, message: 'Pedido no encontrado'});
  } 
  res.status(200).json({status:true, code:200, message: result.rows[0]});
  })
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const getAllOrders = (req, res) => {
  const { userId } = req.params;
  return db.query('SELECT * FROM pedidos WHERE usuario_id = $1', [userId])
    .then(result => res.status(200).json({ status: true, code: 200, message: result.rows }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const updateOrder = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ status:false, code:400, message:'No se pudo actualizar'});
  }
  return db.query('UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *', [status, orderId])
    .then(result => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const deleteOrder = (req, res) => {
  const { orderId } = req.params;
  return db.query('DELETE FROM pedidos WHERE id = $1 RETURNING *', [orderId])
    .then(result => {
      if (result.rows.lenght === 0) {
        return res.status(404).json({ status:false, code:404, message:'No encontrado'});
      }
      res.status(200).json({ status: true, code: 200, message: result.rows[0] });
      })
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};
