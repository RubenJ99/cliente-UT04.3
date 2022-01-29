"use strict";

import Category from "./Category.js";
import Clothes from "./Clothes.js";
import SmartWatch from "./SmartWatch.js";
import Perfume from "./Perfume.js";
import Store from "./Store.js";
import {InvalidInstanceException, InvalidValueException, RepeatedArgumentException} from "./ES6Errors.js";
import Coords from "./Coords.js";


export default class StoreHouse {
  #name;
  #categories;
  #stores;

  constructor(name) {
    this.#name = name;
    this.#stores = [new Store('H92482892','Primark','Calle piruleta','1111111',new Coords('17','12'))];
    this.#categories = [{category: new Category('pitos'),
                        products: []},{category: new Category('chochitos'),
                        products: []}];

  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if(!name) throw new Error('Empty value');
    this.#name = name;
  }

  get categories(){
      let _cats = this.#categories;
    return{
        [Symbol.iterator](){
            let i = 0;
            return {
                next(){
                    return i < _cats.length ? {value: _cats[i++],done: false} : {done:true}
                }
            }
        }
    }
  }

  get shops(){
      let _shops = this.#stores;
      return {
          [Symbol.iterator](){
              let i = 0;
              return {
                  next(){
                      return i < _shops.length ? {value: _shops[i++],done:false} : {done:true}
                  }
              }
          }
      }
  }

  addCategory(newCategory){
      if(!(newCategory instanceof Category)) throw new InvalidInstanceException(newCategory,Category);
      let catCheck = this.#categories.find((elem)=>{
          return Object.entries(elem).toString() === Object.entries(newCategory).toString();
      });
      if(catCheck) throw new RepeatedArgumentException(newCategory);
      this.#categories.push(newCategory);
      return this.#categories.length;
  }

  removeCategory(newCategory){
      if(!(newCategory instanceof Category)) throw new InvalidInstanceException(newCategory,Category);
      let index = this.#categories.findIndex((elem)=>{
          return Object.entries(elem).toString() === Object.entries(newCategory).toString();
      });
      if(index === -1) throw new InvalidValueException('newCategory',newCategory);
      this.#categories.splice(index,1);
      return this.#categories.length;
  }


}

