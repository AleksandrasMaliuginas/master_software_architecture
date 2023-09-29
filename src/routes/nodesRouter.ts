// import express, { NextFunction } from 'express';
import express, { Request, Response, NextFunction, Router } from 'express';
import { NodesController } from '../controllers/nodesController';

const router = express.Router();

const nodesRouter = (nodesController: NodesController): Router => {
    router.get('/', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));
    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => nodesController.get(req, res, next));
    router.post('/create', async (req: Request, res: Response, next: NextFunction) => nodesController.create(req, res, next));
    router.post('/update', async (req: Request, res: Response, next: NextFunction) => nodesController.update(req, res, next));
    router.post('/delete', async (req: Request, res: Response, next: NextFunction) => nodesController.delete(req, res, next));

    return router;
}

// REST
// router.get('/nodes', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));
// router.get('/nodes/:id', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));
// router.post('/nodes', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));
// router.put('/nodes/:id', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));
// router.delete('/nodes/:id', async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next));


export { nodesRouter }