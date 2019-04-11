export default class Channel{
    constructor(name, owner){
        this.name = name;
        this.owner = owner;
    }

    getName() {
        return this.name;
    }

    getOwner() {
        return this.owner;
    }
}