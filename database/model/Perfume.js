'use strict';

import Product from "./Product.js";
import {EmptyValueException, InvalidValueException} from "./ES6Errors.js";

/**
 * Clase que hereda de Product con unos getter y setter
 */
export default class Perfume extends Product{
  #odor;
  #gender;
  constructor(serialNumber,name,description,price,tax,images,odor,gender) {
    super(serialNumber,name,description,price,tax,images);
    this.#odor = odor;
    this.#gender = gender;
  }

  get odor(){
    return this.#odor;
  }

  set odor(odor){
    this.#odor = odor;
  }

  get gender(){
    return this.#gender;
  }

  set gender(gender){
    this.#gender = gender;
  }
}