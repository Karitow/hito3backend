import express, { json } from 'express';
import cors from 'cors';
//nos proporciona la infromacion de la terminal
import { serverLog } from '../middlewares/index.middleware.js';
//rutas
import { cartRouter, orderRouter, productRouter, router, userRouter} from "../routes/indexRoutes.js";
import errorHandler from '../middlewares/error.middleware.js';

const app = express();
//puerto
const PORT = process.env.PORT ?? 3000
//middlewares
app.use(cors());
app.use(json());
app.use(serverLog);
//middleware para uso de rutas
app.use('/restobuApi/cart',cartRouter);
app.use('/restobuApi/orders', orderRouter);
app.use('/restobuApi/products',productRouter);
app.use('/restobuApi/users',userRouter);
//manejo de errores
app.use(errorHandler);
//ruta manejo 404
app.all('*', (req,res) => res.status(404).json({status: false, code: 404, message: 'Page not found'}));
//levantando servidor
app.listen(PORT, () => console.log(`Server UP in ${PORT}`));

export default app;