
interface Node {
    id: number;
    hostname: string;
    ipAddress: IpAddress;
    isActive: boolean;
    dataCenterId: number;
}

class Node implements Node {

    constructor(id: number, hostname: string, ipAddress: IpAddress, isActive: boolean, dataCenterId: number) {
        this.id = id;
        this.hostname = hostname.trim().toUpperCase();
        this.ipAddress = ipAddress;
        this.isActive = isActive;
        this.dataCenterId = dataCenterId;
    }

    public valid() : Boolean {
        if (this.hostname.length < 4) return false;

        if (!this.ipAddress.valid()) return false;
        if (this.dataCenterId < 0) return false;

        return true;
    }
}

class IpAddress {

    public readonly value: string;

    constructor(ipAddress: string) {
        this.value = ipAddress;
    }

    public valid() : boolean {
        return IpAddress.valid(this.value);
    }

    static valid(ipAddress: string) : boolean {
        const regex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g;
        return ipAddress.match(regex) === null ? false : true;
    }
}

export { Node, IpAddress }