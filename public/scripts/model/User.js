export default class User {
    constructor(name) {
        this.name = name;
        this.id = null;
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