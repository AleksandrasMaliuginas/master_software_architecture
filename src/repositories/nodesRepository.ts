import { IpAddress, Node } from "../models/node"

interface NodesRepository {
	getAll(): Node[]
	get(hostname: String): Node | undefined

	create(node: Node): Node | undefined
	update(id: number, node: Node): Node | undefined
	delete(id: number): void
}

const NODES: Node[] = [
    new Node(1, "SERVER001", new IpAddress("10.0.0.1"), true, 10),
    new Node(2, "SERVER002", new IpAddress("10.0.0.2"), false, 9),
    new Node(3, "SERVER003", new IpAddress("10.0.0.3"), true, 9)
];

class Nodes implements NodesRepository {

    getAll(): Node[] {
        return NODES;
    }

    get(hostname: String): Node | undefined {
        return NODES.find(n => n.hostname === hostname);
    }

    create(node: Node): Node | undefined {
        if (!node.valid()) return undefined;
        if (NODES.findIndex(n => n.hostname === node.hostname) > -1) return undefined;
        
        this.assignId(node);
        NODES.push(node);

        return node;
    }

    update(id: number, node: Node): Node | undefined {
        const nodeToUpdate = NODES.find(n => n.id === id);

        if (!nodeToUpdate) return undefined;
        if (!node.valid()) return undefined;
        if (NODES.findIndex(n => n.id !== id && n.hostname === node.hostname) > -1) return undefined;

        nodeToUpdate.hostname = node.hostname;
        nodeToUpdate.ipAddress = node.ipAddress;
        nodeToUpdate.isActive = node.isActive;
        nodeToUpdate.dataCenterId = node.dataCenterId;

        return nodeToUpdate;
    }

    delete(id: number): void {
        this.removeNode(id);
    }

    private removeNode(id: number) {
        const index = NODES.findIndex(n => n.id === id);

        if (index > -1) {
            NODES.splice(index, 1);
        }
    }

    private assignId(node: Node): boolean {
        node.id = Math.floor(Math.random() * 1_000_000);
        
        if (NODES.findIndex(n => n.id === node.id) > -1) return this.assignId(node);
        
        return true;
    }    
}

export { Nodes, NodesRepository }