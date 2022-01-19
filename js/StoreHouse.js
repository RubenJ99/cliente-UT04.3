"use strict";

export default class StoreHouse {
  #name;
  constructor(name) {
    this.#name = name;
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
}

