'use strict';
import {InvalidAccessConstructorException,EmptyValueException,
    InvalidValueException,AbstractClassException,
    InvalidInstanceException,IndexOutOfBoundsException,
    NonExistentMethodException,FullListException,
    AbstractClassException,InvalidRegexException,
    RepeatedArgumentException,NotFoundArgumentException} from "./ES6Errors";

export default class Product {
    #serialNumber;
    #name;
    #description;
    constructor(serialNumber,name,description) {
        if(new.target === Product) throw new AbstractClassException('Product'); //Abstract check
        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#description = description;
    }

    get getSerialNumber(){
        return this.#serialNumber;
    }

    set setSerialNumber(serialNumber){
        this.#serialNumber = serialNumber;
    }

    get getName(){
        return this.#name;
    }

    set setName(name){
        this.#name = name;
    }

    get getDescription(){
        return this.#description;
    }

    set setDescription(description){
        this.#description = description;
    }


}
