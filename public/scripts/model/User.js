export default class User {
    constructor(name) {
        this.name = name;
        this.id = null;
        this.isOnline = true;
        this.activeChannel = null;
    }
}