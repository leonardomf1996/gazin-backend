import { Router } from 'express';
import { DeveloperController } from './controllers/DeveloperController';

const routes = Router();

const developerController = new DeveloperController();

routes.get('/developers', developerController.show);
routes.get('/developers/:id', developerController.findById);

routes.post('/developers', developerController.create);

routes.put('/developers/:id', developerController.update);

routes.delete('/developers/:id', developerController.delete);

export { routes };