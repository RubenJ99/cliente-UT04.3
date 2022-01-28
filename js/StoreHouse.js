"use strict";

import Category from "./Category";
import {InvalidAccessConstructorException,EmptyValueException,
    InvalidValueException,AbstractClassException,
    InvalidInstanceException,IndexOutOfBoundsException,
    NonExistentMethodException,FullListException,
    AbstractClassException,InvalidRegexException,
    RepeatedArgumentException,NotFoundArgumentException} from "./ES6Errors";


export default class StoreHouse {
  #name;
  #categoriesList;
  constructor(name) {
    this.#name = name;
    this.#categoriesList = new ObjectList(Category);


  }

  get getName() {
    return this.#name;
  }

  /**
   * @param {string} name
   * 
   */
  set setName(name) {
    if(!name) throw new Error('Empty value');
    this.#name = name;
  }

  get categories(){

  }
}

