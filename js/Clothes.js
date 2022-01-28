'use strict';

import Product from "./Product";
import {InvalidValueException} from "./ES6Errors";

export default class Clothes extends Product{
    #size;
    #color;
    #sex;
    constructor(serialNumber,name,description,price,tax,images,size,color,sex) {
        super(serialNumber,name,description,price,tax,images);
        this.#size = size;
        this.#color = color;
        this.#sex = sex;

    }

    get size(){
        return this.#size;
    }

    set size(size){
        this.#size = size;
    }

    get color(){
        return this.#color;
    }

    set color(color){
        this.#color = color;
    }

    get sex(){
        return this.#sex;
    }

    set sex(sex){
        if(sex !== 'W' || sex !== 'M' || sex !== 'U') throw new InvalidValueException('sex',sex);
        this.#sex = sex;
    }


}