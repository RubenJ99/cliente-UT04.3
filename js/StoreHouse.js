"use strict";

import Category from "./Category.js";
import Clothes from "./Clothes.js";
import SmartWatch from "./SmartWatch.js";
import Perfume from "./Perfume.js";
import Store from "./Store.js";
import {
    EmptyValueException,
    InvalidInstanceException,
    InvalidValueException,
    RepeatedArgumentException
} from "./ES6Errors.js";
import Coords from "./Coords.js";
import Product from "./Product";


export default class StoreHouse {
  #name;
  #categories;
  #stores;
  static #defCategory;
  static #defStore;

  constructor(name,) {
    this.#name = name;
    this.#stores = [];
    this.#categories = [];
    StoreHouse.#defCategory = {category: new Category('Def','DefaultCategory')};
    StoreHouse.#defStore = new Store('H92482892','DefStore','RandomAddress','123456789',new Coords('1','1'));
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
      this.#categories.push({category:newCategory,products:[]});
      return this.#categories.length;
  }

  removeCategory(newCategory){
      if(!(newCategory instanceof Category)) throw new InvalidInstanceException(newCategory,Category);
      let index = this.#categories.findIndex((elem)=>{
          return Object.entries(elem.category).toString() === Object.entries(newCategory).toString();
      });
      if(index === -1) throw new InvalidValueException('newCategory',newCategory);
      this.#categories.splice(index,1);
      return this.#categories.length;
  }

  addProduct(newCategory,newProduct){
      if(!newCategory) throw new EmptyValueException('newCategory',newCategory);
      if(!newProduct) throw new EmptyValueException('newProduct',newProduct);
      let catIndex = this.#categories.findIndex((elem)=>{
          return Object.entries(elem.category).toString() === Object.entries(newCategory).toString();
      });
    this.#categories[catIndex].products.push({product:newProduct,store:StoreHouse.#defStore});
    return this.#categories[catIndex].products.length;
  }

  removeProduct(newProduct){
    if(!newProduct) throw new EmptyValueException('newProduct',newProduct);
    if(!(newProduct instanceof Product)) throw new InvalidInstanceException('newProduct',Product);
    this.#categories.forEach((cat)=>{
      let prodIndex = cat.products.findIndex((prod)=>{
        return Object.entries(prod).toString() === Object.entries(newProduct).toString();
      });
      cat.products.splice(prodIndex,1);
    });
  }

  

}

