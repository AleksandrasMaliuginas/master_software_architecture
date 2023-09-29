import express, { Request, Response, NextFunction } from 'express';
import { NodesController } from '../controllers/nodesController';
import { Nodes } from '../repositories/nodesRepository';
import { nodesRouter } from './nodesRouter';

/** Bootstrap */
const nodesRepository = new Nodes();
const nodesController = new NodesController(nodesRepository);

/** Routing */
const router = express.Router();
router.use('/nodes', nodesRouter(nodesController))
// router.use('/api/nodes', nodesRouter(nodesRestController))


export { router as mainRouter }

// type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>
// const requestHandler = (handler: RequestHandler) => {
//     return async (req: Request, res: Response, next: NextFunction) => nodesController.getAll(req, res, next)
// }