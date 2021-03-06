"use strict";

import {
  DuplicatedProductException,
  EmptyValueException,
  IndexOutOfBoundsException,
  InvalidInstanceException,
  InvalidValueException,
  RepeatedArgumentException,
} from "../../public/js/ES6Errors.js";
import {Category} from "../entities/Category.js";
import {Store} from "../entities/Store.js";
import {Coords} from "../entities/Coords.js";
import {Product} from "../entities/Product.js";
import {Clothes} from "../entities/Clothes.js";
import {Perfume} from "../entities/Perfume.js";
import {SmartWatch} from "../entities/SmartWatch.js";



//Declaracion de StoreHouse como singleton
const StoreHouse = (function () {
  var instance;

  function init() {
    class StoreHouse {
      #name;
      #categories;
      #stores;
      static #defCategory; //Colocamos las categorias por defecto y la tienda como atributos estaticos
      static #defStore;
    
      constructor(name) {
        this.#name = name;
        this.#stores = [];
        this.#categories = [];
        StoreHouse.#defCategory = new Category("Def", "DefaultCategory")
        StoreHouse.#defStore = new Store(
          "H92482892",
          "DefStore",
          "RandomAddress",
          "123456789",
          new Coords("1", "1"),
          "defstore.png"
        );

        this.#stores.push({
          store: StoreHouse.#defStore,
          products: [
            /*id:Product.id,stock:number*/
          ],
        })

        this.#categories.push({
          category: StoreHouse.#defCategory, 
          products: [] 
        })
      }
      /*Getter & Setter basico name*/
      get name() {
        return this.#name;
      }
    
      set name(name) {
        if (!name) throw new EmptyValueException("name");
        this.#name = name;
      }
    
      /**
       * este getter es realmente un iterador que usando Symbol.iterator nos da la capacidad de recorrerlo con un forof
       * @returns {{[Symbol.iterator](): {next(): {value: *, done: boolean}|{done: boolean}}}|{next(): {value: *, done: boolean}|{done: boolean}}|{value: *, done: boolean}|{done: boolean}}
       */
    
      // * REFACTOR DEL ITERADOR PARA LA V2 MVC
      get categories() {
        let categories = this.#categories;
        return {
          *[Symbol.iterator]() {
            for (let cat of categories) {
              yield cat;
            }
          },
        };
      }
    
      /**
       * este getter es un iterador que usando Symbol.iterator nos permite que el resultado sea iterable por un forof
       * @returns {{[Symbol.iterator](): {next(): {value: *, done: boolean}|{done: boolean}}}|{next(): {value: *, done: boolean}|{done: boolean}}|{value: *, done: boolean}|{done: boolean}}
       */
      // * REFACTOR DEL ITERADOR PARA LA V2 MVC
      get shops() {
        let shops = this.#stores;
        return {
          *[Symbol.iterator]() {
            for (let shop of shops) {
              yield shop;
            }
          },
        };
      }
      
      peek(){
        return this.#categories;
      }
      /**
       * Dada una nueva categoria si es correcta insertamos en el array de categorias un objeto a forma JSON con los parametros requeridos
       * @param newCategory
       * @returns {Number} categories length
       */
      addCategory(newCategory) {
        if (!(newCategory instanceof Category))
          throw new InvalidInstanceException(newCategory, Category);
        let catCheck = this.#categories.find((elem) => {
          return (
            Object.entries(elem).toString() ===
            Object.entries(newCategory).toString()
          );
        });
        if (catCheck) throw new RepeatedArgumentException(newCategory);
        this.#categories.push({ category: newCategory, products: [] });
        return this.#categories.length;
      }
    
      /**
       * dada una categoria si es correcta se elimina el objeto JSON con sus datos del array catgorias
       * @param newCategory
       * @returns {Number} product length
       */
      removeCategory(newCategory) {
        if (!(newCategory instanceof Category))
          throw new InvalidInstanceException(newCategory, Category);
        let index = this.#categories.findIndex((elem) => {
          return elem.category.title === newCategory.title; 
        });
        if (index === -1) throw new InvalidValueException("newCategory", newCategory);
        this.#categories[index].products.forEach((e)=>{
          this.#categories[0].products.push(e);
        })
        this.#categories.splice(index, 1);
        return this.#categories.length;
      }
    
      /**
       * Dada una categoria y un producto nuevo, si los parametros son correctos y la categoria existe
       * el nuevo producto sera insertado en el array products de dicha categoria con los paremetros requeridos como JSON
       * @param newCategory
       * @param newProduct
       * @returns {number} products length
       */
      
      addProduct(newProduct,newCategory) {
        // if (!newCategory) throw new EmptyValueException("newCategory", newCategory);
        if (!newProduct) throw new EmptyValueException("newProduct", newProduct);
         
       
          let catIndex = this.#categories.findIndex((elem) => {
            return elem.category.title == newCategory.title;
          });


          if(catIndex !== -1){
            this.#categories[catIndex].products.push({
              product: newProduct,
              store: StoreHouse.#defStore.cif,
            });
          }
        
        
        return this.#categories[catIndex].products.length;
      }
    
      /**
       * Dado un producto, si este es correcto borramos todas las ocurrencias de todas las categorias a las que pertenezca
       * @param newProduct
       */
      removeProduct(newProduct) {
        if (!newProduct) throw new EmptyValueException("newProduct", newProduct);
        // if (!(newProduct instanceof Product))
        //   throw new InvalidInstanceException("newProduct", Product);
        
        this.#categories.forEach((cat) => {
          cat.products.forEach((prod,idxProd)=>{
            if(prod.product.serialNumber == newProduct.serialNumber){
              this.#categories[0].products.push({
                product: prod.product,
                store: prod.store
              });
              cat.products.splice(idxProd,1);
            }
          });
        });
          this.#stores.forEach((str)=>{
            str.products.forEach((prod,idxProd)=>{
              if(prod.serialNumber == newProduct.serialNumber){
                this.#stores[0].products.push({
                  serialNumber: prod.serialNumber,
                  stock: prod.stock
                })
                str.products.splice(idxProd,1);
              }
            })
          });
      
    }
    
      /**
       * Dados un producto, una tienda y un numero de stock si los parametros son correctos insertamos el producto en la tienda con el stock pasado
       * @param newProduct
       * @param newShop
       * @param number
       * @returns {Number} stock number
       */
      addProductInShop(newProduct, newShop, number = 1) {
        if (!(newProduct instanceof Product))
          throw new InvalidInstanceException("newProduct", Product);
        if (!newShop) throw new EmptyValueException("newShop", newShop);
        if (number < 0) throw new IndexOutOfBoundsException();
    
        this.#categories.forEach((cat) => {
          let prodIndex = cat.products.findIndex((prod) => {
            return prod.product.serialNumber === newProduct.serialNumber;
          });
          if(prodIndex !== -1 ) {
            cat.products[prodIndex].store = newShop.cif;
          }
          
        });
    
        let indexStore = this.#stores.findIndex((elem) => {
          return elem.store.cif === newShop.cif;
        });
    
        let indexProd = this.#stores[indexStore].products.findIndex((elem) => {
          return elem.serialNumber === newProduct.serialNumber;
        });
    
        if (indexProd !== -1) throw new DuplicatedProductException(newProduct.name);
    
        this.#stores[indexStore].products.push({
          serialNumber: newProduct.serialNumber,
          stock: number,
        });
        /*
         let oldStock =  this.#stores[indexStore].products[indexProd].stock;
         oldStock += number;
         this.#stores[indexStore].products[indexProd].stock = oldStock;
           */
        return number;
      }
    
      /**
       * igual que addProduct in shop pero en este caso realizamos un sumatorio del stock
       * @param newProduct
       * @param newShop
       * @param number
       * @returns {*}
       */
      addQuantityProductInShop(newProduct, newShop, number = 1) {
        let indexStore = this.#stores.findIndex((elem) => {
          return elem.store.cif === newShop.cif;
        });
    
        if (indexStore === -1) throw new InvalidValueException("newShop", newShop);
    
        let indexProd = this.#stores[indexStore].products.findIndex((elem) => {
          return elem.serialNumber === newProduct.serialNumber;
        });
    
        if (indexProd === -1)
          throw new InvalidValueException("newProduct", newProduct);
    
        let oldStock = this.#stores[indexStore].products[indexProd].stock;
        oldStock += number;
        this.#stores[indexStore].products[indexProd].stock = oldStock;
    
        return oldStock;
      }
    
      /**
       * Usando un generador retornamos los productos asociados a la categoria pasada por parametro
       * @param category
       * @param product
       * @returns {Generator<[]|*, void, *>}
       */
      // * REFACTOR GENERADORES PARA QUE FUNCIONEN CORRECTAMENTE Y NO MUESTREN COSAS DE MAS
      *getCategoryProducts(category, product = Product) {
        if (!category) throw new EmptyValueException(category);
        let i = this.#categories.findIndex((e) => {
          
          return e.category.title == category.title;
          
        });
        
        for (let products of this.#categories[i].products) {
          
          if (products.product instanceof product) {
            for (let store of this.#stores) {
              for (let prod of store.products) {
                if (prod.serialNumber === products.product.serialNumber) {
                  yield { product: products.product, stock: prod.stock };
                }
              }
            }
          }
        }
      }
    
      /**
       * Dada una nueva tienda, se a??ade como JSON en el array de tiendas
       * @param newShop
       * @returns {*}
       */
      addShop(newShop) {
        if (!newShop) throw new EmptyValueException("newShop", newShop);
        if (
          this.#stores.find((elem) => {
            return (
              Object.entries(elem).toString() === Object.entries(newShop).toString()
            );
          })
        )
          throw new RepeatedArgumentException();
    
        this.#stores.push({
          store: newShop,
          products: [
            /*id:Product.id,stock:number*/
          ],
        });
        return this.#stores.length;
      }
      
      /**
       * Borramos la tienda requerida, pero antes de eso colocamos todos los productos que contenia en la tienda por defecto
       * @param shop
       */
      removeShop(shop) {
        let shopIndex = this.#stores.findIndex((elem) => {
          return shop.cif === elem.store.cif;
        });
        if (shopIndex !== -1) {
          this.#stores[shopIndex].products.forEach((elem) => {
            this.#categories.forEach((cat) => {
              cat.products.forEach((prod) => {
                if (prod.product.serialNumber === elem.serialNumber) {
                  prod.store = StoreHouse.#defStore.cif;
                  //* EDITADO PARA MANTENER REFERENCIAS CORRECTAS PRACTICA FORMS
                  this.#stores[0].products.push({
                    serialNumber: elem.serialNumber,
                    stock: elem.stock 
                  });
                }
              });
            });
          });




          this.#stores.splice(shopIndex, 1);
        }
      }
    
      /**
       * Generador el cual dada una tienda retorna tanto el producto como el stock que contiene de esta
       * @param shop
       * @param product
       * @returns {Generator<*, void, *>}
       */
      // * REFACTOR GENERADORES PARA QUE FUNCIONEN CORRECTAMENTE Y NO MUESTREN COSAS DE MAS
      *getShopProducts(shop, product = Product) {
        if (!shop) throw EmptyValueException(shop);
    
        let i = this.#stores.findIndex((e) => {
          return e.store.cif === shop.cif; 
        });
        
        for (let cat of this.#categories) {
          for (let prods of cat.products) {
            if (prods.store === shop.cif && prods.product instanceof product) {
              for (let prodsStore of this.#stores[i].products) {
                if(prods.product.serialNumber === prodsStore.serialNumber)
                yield { product: prods.product, stock: prodsStore.stock, category: cat.category  }; //modifico el modelo para que sea mas facil acceder a los datos en pla practica mvc
              }
            }
          }
        }
      }
    }
    Object.defineProperty(StoreHouse.prototype,"categories",{enumerable: true});
    Object.defineProperty(StoreHouse.prototype,"shops",{enumerable: true});
    let sh = new StoreHouse('RubenWarehouse');
    Object.freeze(sh);
    return sh;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export {
  DuplicatedProductException,
  EmptyValueException,
  IndexOutOfBoundsException,
  InvalidInstanceException,
  InvalidValueException,
  RepeatedArgumentException,
} from "../../public/js/ES6Errors.js";
export {Category} from "../entities/Category.js";
export {Store} from "../entities/Store.js";
export {Coords} from "../entities/Coords.js";
export {Product} from "../entities/Product.js";
export {Clothes} from "../entities/Clothes.js";
export {Perfume} from "../entities/Perfume.js";
export {SmartWatch} from "../entities/SmartWatch.js";


export default StoreHouse;