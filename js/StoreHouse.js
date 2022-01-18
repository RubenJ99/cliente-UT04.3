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


let inst = new StoreHouse('Almacen1');
console.log(inst.getName)
inst.setName = 1;
console.log(inst.getName)
