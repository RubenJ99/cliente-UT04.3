'use strict';

import {Product} from "../entities/Product.js";
import {InvalidValueException} from "../../public/js/ES6Errors.js";

/**
 * Clase que hereda de Product con unos getter y setter
 */
class Clothes extends Product{
  #size;
  #color;
  #gender;
  constructor(serialNumber,name,description,price,tax,images,size,color,gender) {
    super(serialNumber,name,description,price,tax,images);
    this.#size = size;
    this.#color = color;
    this.#gender = gender;

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

  get gender(){
    return this.#gender;
  }

  set gender(gender){
    if(gender !== 'F' || gender !== 'M' || gender !== 'U') throw new InvalidValueException('gender',gender);
    this.#gender = gender;
  }



}

export{Clothes};