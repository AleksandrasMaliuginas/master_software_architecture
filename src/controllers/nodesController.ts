import { Request, Response, NextFunction } from 'express';
import { NodesRepository } from '../repositories/nodesRepository';
import { IpAddress, Node } from '../models/node';


class NodesController {

    private readonly nodesRepository: NodesRepository;

    constructor(nodesRepository: NodesRepository) {
        this.nodesRepository = nodesRepository;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const nodes = this.nodesRepository.getAll();

        return res.render('nodes', {
            nodes: nodes
        });
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const node: Node | undefined = this.nodesRepository.get(id.toUpperCase());

        return res.render('node', {
            node: node
        });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const active = req.body.isActive ? true : false;
        const nodeToCreate = new Node(-1, req.body.hostname, new IpAddress(req.body.ipAddress), active, Number.parseInt(req.body.dataCenterId));
        
        const createdNode: Node | undefined = this.nodesRepository.create(nodeToCreate);

        return res.render('node', {
            node: createdNode
        });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = Number.parseInt(req.body.id);
        const active = req.body.isActive ? true : false;
        const nodeToUpdate = new Node(id, req.body.hostname, new IpAddress(req.body.ipAddress), active, Number.parseInt(req.body.dataCenterId));
        
        const updatedNode: Node | undefined = this.nodesRepository.update(id, nodeToUpdate);

        return res.render('node', {
            node: updatedNode
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.body.id);
        this.nodesRepository.delete(id);

        const nodes = this.nodesRepository.getAll();

        return res.render('nodes', {
            nodes: nodes
        });
    }
}

export { NodesController };