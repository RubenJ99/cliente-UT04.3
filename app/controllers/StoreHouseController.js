import StoreHouse from "../../database/model/StoreHouseModel.js";
import {
  DuplicatedProductException,
  EmptyValueException,
  IndexOutOfBoundsException,
  InvalidInstanceException,
  InvalidValueException,
  RepeatedArgumentException,
} from "../../public/js/ES6Errors.js";
import { Category } from "../../database/entities/Category.js";
import { Store } from "../../database/entities/Store.js";
import { Coords } from "../../database/entities/Coords.js";
import { Product } from "../../database/entities/Product.js";
import { Clothes } from "../../database/model/StoreHouseModel.js";
import { Perfume } from "../../database/entities/Perfume.js";
import { SmartWatch } from "../../database/entities/SmartWatch.js";
export default class StoreHouseController {
  #storeHouseModel;
  #storeHouseView;
  static #user;
  static #pass;
  /**
   * En este metodo privado vamos a generar las entidades y datos con los que trabajaremos a modo de base de datos
   */
  #preLoadStoreHouseData() {
    //BLOQUE GENERACION DE PRODUCTOS
   
    let cats;
    let clothes;
    let smartW;
    let perfume;
    let stores;

    $.ajax({
        url: "../../database/model/data.json",
        method: 'GET',
        async: false, //si true, hay que darle al boton inicio porque el ready event de jquery carga antes que la peticion
      }).done((data)=> {
        cats = data.categories;
        cats.forEach(elem => {
            let tmp = new Category(elem.title,elem.description);
            this.#storeHouseModel.addCategory(tmp);
        });

        stores = data.stores;
        stores.forEach(elem => {
            let tmp = new Store(elem.cif,elem.name,elem.address,elem.phone,new Coords(elem.latitude,elem.longitude),elem.img);
            this.#storeHouseModel.addShop(tmp);
        });

        clothes = data.products.clothes;
        clothes.forEach(elem =>{
          let tmp = new Clothes(elem.serialNumber,elem.name,elem.description,elem.price,
          elem.tax,elem.images,elem.size,elem.color,elem.gender);
            for (let i of this.#storeHouseModel.categories) {
              if(i.category.title === "Bottom-Clothing"){
                this.#storeHouseModel.addProduct(tmp,i.category)
                this.#storeHouseModel.addProductInShop(tmp,stores[2])
              }
            }
        })

        smartW = data.products.smartWatch;
        smartW.forEach(elem =>{
          let tmp = new SmartWatch(elem.serialNumber,elem.name,elem.description,elem.price,
          elem.tax,elem.images,elem.model,elem.sphere,elem.bandColor);
            for (let i of this.#storeHouseModel.categories) {
              if(i.category.title === "Props"){
                this.#storeHouseModel.addProduct(tmp,i.category)
                this.#storeHouseModel.addProductInShop(tmp,stores[0])
              }
            }
        })

        perfume = data.products.perfume;
        perfume.forEach(elem =>{
          let tmp = new Perfume(elem.serialNumber,elem.name,elem.description,elem.price,
          elem.tax,elem.images,elem.odor,elem.gender);
            for (let i of this.#storeHouseModel.categories) {
              if(i.category.title === "Perfume-and-Cologne"){
                this.#storeHouseModel.addProduct(tmp,i.category)
                this.#storeHouseModel.addProductInShop(tmp,stores[1])
              }
            }
        })
        
      }).fail(function(res){
          console.log(res)
      });
  }

  /**
   * Para el constructor del controlador le pasamos la referencia del modelo y de la vista que hemos generado en StoreHouseApp que es el punto de entrada
   * de nuestra app y el que tenemos colocado en index.html
   * @param {*} storeHouseModel
   * @param {*} storeHouseView
   */
  constructor(storeHouseModel, storeHouseView) {
    this.#storeHouseModel = storeHouseModel;
    this.#storeHouseView = storeHouseView;

    StoreHouseController.#user = "admin";
    StoreHouseController.#pass = "pass";

    this.onLoad();

    this.#storeHouseView.bindStores(this.handlerStores);
    this.#storeHouseView.bindProducts(this.handlerProducts);
    this.#storeHouseView.bindInfo(this.handlerInfo);
    this.#storeHouseView.bindCats(this.handlerCats);
    this.#storeHouseView.bindPop(this.handlerPop);
    this.#storeHouseView.bindClosePop(this.handlerClosePop);

    this.#storeHouseView.bindTypeAddProduct(this.handlerFormTypeProduct);
    //forms gen zone
    this.#storeHouseView.bindFormAddStore(this.handlerFormAddStore);
    this.#storeHouseView.bindFormRemoveStore(this.handlerRemoveStore);
    this.#storeHouseView.bindRemoveStore(this.handlerRemoveStoreNow);

    this.#storeHouseView.bindFormAddCategory(this.handlerFormAddCategory);
    this.#storeHouseView.bindFormRemoveCategory(this.handlerRemoveCat);
    this.#storeHouseView.bindRemoveCategory(this.handlerRemoveCatNow);

    this.#storeHouseView.bindFormAddProduct(this.handlerFormAddProduct);

    this.#storeHouseView.bindValidAddPerfume(this.handlerCheckAddPerfume);
    this.#storeHouseView.bindValidAddClothe(this.handlerCheckAddClothe);
    this.#storeHouseView.bindValidAddSmartWatch(this.handlerCheckAddSmartWatch);

    this.#storeHouseView.bindFormRemoveProduct(this.handlerRemoveProduct);
    this.#storeHouseView.bindRemoveProductBtn(this.handlerRemoveProductNow);
    //valid check zone
    this.#storeHouseView.bindValidAddStore(this.handlerCheckAddStore);
    this.#storeHouseView.bindValidAddCategory(this.handlerCheckAddCategory);

    this.#storeHouseView.bindValidLogIn(this.handlerLogIn);
    this.#storeHouseView.bindCloseSession(this.handlerCloseS);
  }

  /**
   * Con esto cargamos los datos en el momento en el que se inicializa la aplicacion
   */
  onLoad = () => {

    this.#preLoadStoreHouseData();
      
    let cName = getCookie("user");
    let cPass = getCookie("pass");

    if (cName == "admin" && cPass == "admin") {
      $("#bModalIni").css("display", "none");
      $("#bCloseS").css("display", "block");
      greetUser()
    } else {
      $("#bModalIni").css("display", "block");
      $("#bCloseS").css("display", "none");
    }
    
  };
  /**
   * Dado el titulo de la categoria encontramos la que corresponde y almacenamos la categoria completa,luego retornamos el generador que nos da acceso a los productos
   * dada cierta categoria
   * @param {} catTitle
   */
  handlerCats = (catTitle) => {
    let currentCat;
    for (let cat of this.#storeHouseModel.categories) {
      if (cat.category.title == catTitle) currentCat = cat.category;
    }
    console.log(currentCat);
    let data = {
      catProds: this.#storeHouseModel.getCategoryProducts(currentCat),
    };

    this.#storeHouseView.showCatProd(data);
  };
  /**
   * Retorna en un objeto literal tanto el iterador de tiendas como el de categorias
   */
  handlerStores = () => {
    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };
  /**
   * Este manejador obtiene el numero de serie de una tienda, dado ese cif obtenemos la tienda completa y generamos un mapa en el cual tendremos como clave
   * el titulo de la categoria y como valor un elemento html con valores dinamicos dependiendo de la categoria en cuestion,
   * retornamos un JSON con el generador que dada una tienda retorna los datos necesarios y el mapa que contiene los elementos html
   * @param {*} cifStore
   */
  handlerProducts = (cifStore) => {
    let currentShop;
    for (let st of this.#storeHouseModel.shops) {
      if (st.store.cif == cifStore) currentShop = st.store;
    }

    let mp = new Map();
    for (let cat of this.#storeHouseModel.getShopProducts(currentShop)) {
      console.log(cat);
      if (!mp.has(cat.category.title)) {
        mp.set(
          cat.category.title,
          `<fieldset class="border p-2">
                <legend class="w-auto" id="${cat.category.title}">
                ${cat.category.title}</legend>
                </legend>`
        );
      }
    }

    let data = {
      storeProds: this.#storeHouseModel.getShopProducts(currentShop),
      map: mp,
    };

    this.#storeHouseView.showProducts(data);
  };

  /**
   * Este manejador obtiene el numero de serie de un producto, luego dado ese serial number obtenemos el elemento producto completo y tambien el tipo de
   * producto que tenemos en nuestro negocio, retornando un a la vista un objeto literal como un JSON con el producto completo y su tipo
   * @param {*} serialNumber
   */
  handlerInfo = (serialNumber) => {
    let currentProd;
    for (let cat of this.#storeHouseModel.categories) {
      for (let prod of cat.products) {
        if (prod.product.serialNumber == serialNumber) {
          currentProd = prod;
        }
      }
    }
    let type;
    if (currentProd.product instanceof Clothes) {
      type = "Clothes";
    }
    if (currentProd.product instanceof Perfume) {
      type = "Perfume";
    }
    if (currentProd.product instanceof SmartWatch) {
      type = "SmartWatch";
    }

    let data = {
      fullProduct: currentProd,
      type: type,
    };

    this.#storeHouseView.showProdInfo(data);
  };
  /**
   * Tomando la misma funcionalidad que encontrabamos en el handler para mostrar la informacion de los productos de
   * manera unica dependiendo del tipo de producto ahora ademas añadimos la creacion de elementos window.
   * Haciendo uso del array activeWindows que se encuentra en la vista comprobamos si el pop up de un producto ya existe,
   * si es asi simplemente se pondra en primer plano y no se creara otro, en caso contrario se creara su pop up y se añadira al array
   * @param {*} serialNumber
   */
  handlerPop = (serialNumber) => {
    let currentProd;
    for (let cat of this.#storeHouseModel.categories) {
      for (let prod of cat.products) {
        if (prod.product.serialNumber == serialNumber) {
          currentProd = prod;
        }
      }
    }
    let type;
    if (currentProd.product instanceof Clothes) {
      type = "Clothes";
    }
    if (currentProd.product instanceof Perfume) {
      type = "Perfume";
    }
    if (currentProd.product instanceof SmartWatch) {
      type = "SmartWatch";
    }

    let data = {
      fullProduct: currentProd,
      type: type,
    };
    let nW;
    let i = this.#storeHouseView.activeWindows.findIndex((e) => {
      return e.name == serialNumber;
    });
    if (i == -1) {
      nW = window.open(
        "",
        `${serialNumber}`,
        "width=800,height=600,resizable,scrollbars,status"
      );
      this.#storeHouseView.activeWindows.push(nW);
    }
    i = this.#storeHouseView.activeWindows.findIndex((e) => {
      return e.name == serialNumber;
    });
    this.#storeHouseView.activeWindows[i].focus();
    this.#storeHouseView.showPop(data, nW);
  };
  //Recorremos el array de ventanas activas y usando el metodo close las cerramos, despues reiniciamos el array para
  //que vuelva a estar vacio y operativo
  handlerClosePop = () => {
    this.#storeHouseView.activeWindows.forEach((el) => {
      el.close();
    });

    this.#storeHouseView.activeWindows = [];
  };
  handlerFormTypeProduct = () => {
    this.#storeHouseView.showTypesProds();
  };
  handlerFormAddProduct = (type) => {
    let data = {
      categories: this.#storeHouseModel.categories,
    };
    this.#storeHouseView.showFormAddProduct(type, data);
  };
  handlerFormAddCategory = () => {
    this.#storeHouseView.showFormAddCategory();
  };
  handlerFormRemoveCategory = () => {};
  handlerFormAddStore = () => {
    this.#storeHouseView.showFormAddStore();
  };

  //HANDLERS STORE
  handlerCheckAddStore = (...formValues) => {
    let newStore = new Store(
      formValues[0],
      formValues[1],
      formValues[2],
      formValues[3],
      formValues[4],
      formValues[5]
    );
    this.#storeHouseModel.addShop(newStore);

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };
  handlerRemoveStore = () => {
    let data = {
      stores: this.#storeHouseModel.shops,
    };

    this.#storeHouseView.showFormRemoveStore(data);
  };
  handlerRemoveStoreNow = (cifStore) => {
    let currentShop;
    for (let st of this.#storeHouseModel.shops) {
      if (st.store.cif == cifStore) currentShop = st.store;
    }

    this.#storeHouseModel.removeShop(currentShop);

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };

  //HANDLERS PRODUCT
  handlerCheckAddPerfume = (...vals) => {
    let newPerfume = new Perfume(
      vals[0],
      vals[1],
      vals[2],
      vals[3],
      vals[4],
      vals[5],
      vals[6],
      vals[7]
    );

    vals[8].forEach((catName) => {
      for (let cat of this.#storeHouseModel.categories) {
        if (catName == cat.category.title) {
          let thisCat = cat.category;
          this.#storeHouseModel.addProduct(newPerfume, thisCat);
        }
      }
    });

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };
  handlerCheckAddClothe = (...vals) => {
    let newPerfume = new Clothes(
      vals[0],
      vals[1],
      vals[2],
      vals[3],
      vals[4],
      vals[5],
      vals[6],
      vals[7],
      vals[8]
    );
    vals[9].forEach((catName) => {
      for (let cat of this.#storeHouseModel.categories) {
        if (catName == cat.category.title) {
          let thisCat = cat.category;
          this.#storeHouseModel.addProduct(newPerfume, thisCat);
        }
      }
    });

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };
  handlerCheckAddSmartWatch = (...vals) => {
    let newPerfume = new SmartWatch(
      vals[0],
      vals[1],
      vals[2],
      vals[3],
      vals[4],
      vals[5],
      vals[6],
      vals[7],
      vals[8]
    );
    vals[9].forEach((catName) => {
      for (let cat of this.#storeHouseModel.categories) {
        if (catName == cat.category.title) {
          let thisCat = cat.category;
          this.#storeHouseModel.addProduct(newPerfume, thisCat);
        }
      }
    });

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };

  handlerRemoveProduct = () => {
    let data = {
      categories: this.#storeHouseModel.categories,
    };
    this.#storeHouseView.showFormRemoveProd(data);
  };

  //HANDLERS CAT
  handlerCheckAddCategory = (...dataCat) => {
    let newCat = new Category(dataCat[0], dataCat[1]);
    this.#storeHouseModel.addCategory(newCat);

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };

  handlerRemoveCat = () => {
    let data = {
      categories: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showFormRemoveCat(data);
  };

  handlerRemoveCatNow = (CatTitle) => {
    let currentCat;
    for (let cats of this.#storeHouseModel.categories) {
      if (cats.category.title == CatTitle) currentCat = cats.category;
    }
    this.#storeHouseModel.removeCategory(currentCat);

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };

  handlerRemoveProductNow = (serialNumber) => {
    let currentProd;
    for (let c of this.#storeHouseModel.categories) {
      for (let p of c.products) {
        if (p.product.serialNumber == serialNumber) currentProd = p.product;
      }
    }

    this.#storeHouseModel.removeProduct(currentProd);

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  };

  handlerLogIn = (username, password) => {
      

    if (username == "admin" && password == "admin") {
      setCookie("user","admin",1);
      setCookie("pass","admin",1);
      alert("Hola admin!");
      $("#loginMod").modal("hide");
      $("#bModalIni").css("display", "none");
      $("#bCloseS").css("display", "block");

    } else {
      alert("Pon la contraseña bien anda");
    }

    let data = {
      stores: this.#storeHouseModel.shops,
      cats: this.#storeHouseModel.categories,
    };

    this.#storeHouseView.showStores(data);
    this.#storeHouseView.showDrops(data);
  }
  handlerCloseS = () => {
    setCookie("user", '', 0);
    setCookie("pass", '', 0);
    location.reload();
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=./";
}

function getCookie(cname) {
  let re = new RegExp(
    "(?:(?:^|.*;\\s*)" + cname + "\\s*\\=\\s*([^;]*).*$)|^.*$"
  );
  return document.cookie.replace(re, "$1");
}

function greetUser() {
  let user = getCookie("user");
  if (user) {
    alert("Hola " + user);
  } else {
    user = prompt("Dime tu nombre:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 10);
    }
  }
}
