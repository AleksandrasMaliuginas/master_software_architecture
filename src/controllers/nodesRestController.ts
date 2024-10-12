import { Request, Response, NextFunction, Application } from 'express';
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
        console.log(req.body)
        const nodeToCreate: Node = req.body.node as Node;
        const createdNode: Node | undefined = this.nodesRepository.create(nodeToCreate);

        return res.render('node', {
            node: createdNode
        });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        const id: number = parseInt(req.params.id);
        const nodeToCUpdate: Node = req.body.node as Node;
        const createdNode: Node | undefined = this.nodesRepository.update(id, nodeToCUpdate);
        
        return res.render('node', {
            node: createdNode
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        this.nodesRepository.delete(id);

        return res.render('node', {
            node: req.params.id
        });
    }
}

const dummyNode : Node = new Node(98, "SERVER001", new IpAddress("10.0.0.10"), true, 10 )

// getting all posts
const listNodes = async (req: Request, res: Response, next: NextFunction) => {
    let posts: [Node] = [dummyNode];

    return res.render('nodes', {
        nodes: [dummyNode]
    });
};

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    // let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Node] = [dummyNode];
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    // let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Node = dummyNode;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    // let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //     ...(title && { title }),
    //     ...(body && { body })
    // });
    // return response
    return res.status(200).json({
        message: dummyNode
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    // let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    // let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
    //     title,
    //     body
    // });
    // return response
    return res.status(200).json({
        message: dummyNode
    });
};

export { NodesController, listNodes, getPosts, getPost, updatePost, deletePost, addPost };