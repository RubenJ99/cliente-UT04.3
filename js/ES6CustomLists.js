'use strict';

export class List{
    #storage;
    constructor(capacity = 100) {
        if(!(this instanceof List )) throw new InvalidAccessConstructorException();
        if(!capacity) throw new EmptyValueException();
        this.#storage = [];
        this.capacity = capacity;
    }
    get peek(){
        return this.#storage;
    }
    isEmpty(){
        return this.#storage.length === 0;
    }

    isFull(){
        return this.#storage === this.capacity;
    }

    size(){
        return this.#storage.length;
    }

    add(elem){
        if(this.isFull()) throw new FullListException();
        if(!elem) throw new EmptyValueException('elem');
        this.#storage.push(elem);
        return this.#storage.length;
    }

    addAt(elem,index){
        if(this.isFull()) throw new FullListException();
        if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
        this.#storage.splice(index,0,elem);
        return this.#storage.length;
    }

    get(index){
        if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
        let dat = this.#storage[index];
        if(!dat) throw new IndexOutOfBoundsException();
        return JSON.stringify(dat);
    }

    toString(){
        let str;
        this.#storage.forEach((elem)=>{
            if(typeof (elem) === 'object'){
                str += JSON.stringify(elem) + '-';
            }else {
                str += elem + '-';
            }
        });
        return str.trimStart();
    }

    indexOf(elem){
        if(!elem) throw new EmptyValueException('elem');
        return this.#storage.findIndex((e)=>{
            return Object.entries(e).toString() === Object.entries(elem).toString();
        });
    }


    lastIndexOf(elem){
        if(!elem) throw new EmptyValueException('elem');
        return this.#storage.reverse().findIndex((e)=> {
            return Object.entries(e).toString() === Object.entries(elem).toString();
        });
    }

    maxCapacity(){
        return this.capacity;
    }

    clear(){
        this.#storage = 0;
    }

    firstElement(){
        return JSON.stringify(this.#storage.find((elem)=>{
            return elem != undefined;
        }));
    }

    lastElement(){
        let stgCopy = [...this.#storage];
        return JSON.stringify(this.#storage.reverse().find((elem)=>{
            return elem!=undefined;
        }));
    }

    remove(index){
        if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
        let data = this.#storage[index];
        if(!data) throw new IndexOutOfBoundsException();
        this.#storage.splice(index,1);
        return JSON.stringify(data);
    }

    removeElement(elem){
        if(!elem) throw new EmptyValueException('elem');
        let index = this.indexOf(elem);
        let old = this.#storage(index);
        this.#storage.splice(index,1);
        return JSON.stringify(old);
    }

    set(elem,index){
        if(!elem) throw new EmptyValueException('elem');
        if(index == undefined) throw new EmptyValueException('index');
        if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
        let prev = this.#storage[index];
        this.#storage[index] = elem;
        return JSON.stringify(prev);
    }
}

export class ObjectList extends List {
    constructor(type, capacity = 100) {
        super(capacity);
        if (!(this instanceof ObjectList)) throw new InvalidAccessConstructorException();
        if (!type) throw new EmptyValueException('type');
        this.type = type;
    }

    add(elem) {
        if (!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.add(elem);

    }

    addAt(elem, index) {
        if (!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.addAt(elem, index);
    }

    indexOf(elem) {
        if (!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.indexOf(elem);
    }

    lastIndexOf(elem) {
        if (!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.lastIndexOf(elem);
    }

    removeElement(elem) {
        if (!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.removeElement(elem);
    }

    set(elem,index){
        if(!(typeof (elem) === 'object' || 'function')) throw new InvalidTypeException('elem');
        return super.set(elem,index);
    }
}

export class OrderedObjectList extends ObjectList{
    #order;
    constructor(type,order,capacity) {
        super(type,capacity);
        if(!(this instanceof OrderedObjectList)) throw new InvalidAccessConstructorException();
        if(!order) throw new EmptyValueException('order');
        this.#order = order;
    }

    add(elem){
        let length = super.add(elem);
        super.peek().sort(this.order);
        return length;
    }

}

