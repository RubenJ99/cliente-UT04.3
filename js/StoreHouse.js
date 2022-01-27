"use strict";

export default class StoreHouse {
  #name;
  #categoriesList;
  constructor(name) {
    this.#name = name;
    this.#categoriesList = [];

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

