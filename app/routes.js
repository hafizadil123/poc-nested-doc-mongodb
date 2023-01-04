import { Router } from 'express';
import UsersController from './controllers/user.controller';
import productController from './controllers/product.controller';
import errorHandler from './middleware/error-handler';

const routes = new Router();

// Users
routes.post('/api/users/register', UsersController.register);
routes.post('/api/users/register', UsersController.login);

routes.post('/api/users/create-product', productController.createProduct)
routes.post('/api/users/create-category', productController.addCategory)
routes.get('/api/users/get-product', productController.getProduct)
routes.use(errorHandler);

export default routes;
