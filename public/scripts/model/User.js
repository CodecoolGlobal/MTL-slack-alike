export default class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.isOnline = true;
        this.activeChannel = null;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getActiveChannel() {
        return this.activeChannel;
    }
}