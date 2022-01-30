"use strict";

import Category from "./Category.js";
import Clothes from "./Clothes.js";
import SmartWatch from "./SmartWatch.js";
import Perfume from "./Perfume.js";
import Store from "./Store.js";
import {
  EmptyValueException, IndexOutOfBoundsException,
  InvalidInstanceException,
  InvalidValueException,
  RepeatedArgumentException
} from "./ES6Errors.js";
import Coords from "./Coords.js";
import Product from "./Product.js";


class StoreHouse {
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
    if(!name) throw new EmptyValueException('name');
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
    this.#categories[catIndex].products.push({product:newProduct,store:StoreHouse.#defStore.cif});
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

  addProductInShop(newProduct,newShop,number){
    if(!(newProduct instanceof Product)) throw new InvalidInstanceException('newProduct',Product);
    if(!newShop) throw new EmptyValueException('newShop',newShop);
    if(number < 0) throw new IndexOutOfBoundsException();

    this.#categories.forEach((cat)=>{
      let prodIndex = cat.products.findIndex((prod)=>{
        return Object.entries(prod).toString() === Object.entries(newProduct).toString();
      });
      cat.products[prodIndex].store = newShop.cif;
    });

    let indexStore = this.#stores.findIndex((elem) => {
      return Object.entries(elem).toString() === Object.entries(newShop).toString();
    });

    let indexProd = this.#stores[indexStore].products.findIndex((elem)=>{
      return elem.serialNumber === newProduct.serialNumber;
    });

    if(indexProd !== -1) throw new
      this.#stores[indexStore].products.push({serialNumber: newProduct.serialNumber, stock: number});
      /*
     let oldStock =  this.#stores[indexStore].products[indexProd].stock;
     oldStock += number;
     this.#stores[indexStore].products[indexProd].stock = oldStock;
       */
    return number;
  }

  addQuantityProductInShop(newProduct,newShop,number){

  }

  getCategoryProducts(){

  }

  addShop(newShop){
    if(!newShop) throw new EmptyValueException('newShop',newShop);
    if(this.#stores.find((elem)=>{
      return Object.entries(elem).toString() === Object.entries(newShop).toString();
    })) throw new RepeatedArgumentException();

    this.#stores.push({store:newShop,products:[/*id:Product.id,stock:number*/]});
    return this.#stores.length;
  }

  removeShop(){

  }

  getShopProducts(){

  }

}

//Declaracion de singleton
const StoreHouseSingle = (function (){
  var instance;

  function createInstance(name){
    var classObj = new StoreHouse(name);
    return classObj;
  }

  return {
    getInstance: function (name){
      if(!instance){
        instance = createInstance(name);
      }
      return instance;
    }
  }
})();

export default StoreHouseSingle;