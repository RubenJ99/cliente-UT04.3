import StoreHouse from '../../database/model/StoreHouseModel.js';
import {
    DuplicatedProductException,
    EmptyValueException,
    IndexOutOfBoundsException,
    InvalidInstanceException,
    InvalidValueException,
    RepeatedArgumentException,
  } from "../../public/js/ES6Errors.js";
  import {Category} from "../../database/entities/Category.js";
  import {Store} from "../../database/entities/Store.js";
  import {Coords} from "../../database/entities/Coords.js";
  import {Product} from "../../database/entities/Product.js";
  import {Clothes} from "../../database/model/StoreHouseModel.js";
  import {Perfume} from "../../database/entities/Perfume.js";
  import {SmartWatch} from "../../database/entities/SmartWatch.js";
export default class StoreHouseController{
    #storeHouseModel;
    #storeHouseView;

/**
 * En este metodo privado vamos a generar las entidades y datos con los que trabajaremos a modo de base de datos
 */
    #preLoadStoreHouseData(){
        //BLOQUE GENERACION DE PRODUCTOS
        let clothingItem1;
        let clothingItem2;
        let clothingItem3;


        try {
            clothingItem1 = new Clothes(111,'Blue Hoodie','A blue hoodie',30,21,['../../public/media/bluehoodie.jpg'],'XL','Blue','M');
            clothingItem2 = new Clothes(222,'Red Skirt','A red skirt',27,21,['../../public/media/redskirt.jpg'],'S','Red','F');
            clothingItem3 = new Clothes(333,'Black Trousers','A pair of black trousers',40,21,['../../public/media/blacktrousers.jpg'],'M','Black','U');
        } catch (error) {
            console.error(error);
        }
        
        let perfumeItem1;
        let perfumeItem2;
        let perfumeItem3;

        try {
            perfumeItem1 = new Perfume(444,'CK One','Perfume from calvin klein',49.95,21,['../../public/media/ckone.jpg'],'flowers/citric','F');
            perfumeItem2 = new Perfume(555,'Eau de Rochas','Perfume from Rochas',54.00,21,['../../public/media/eaurochas.png'],'citric','F');
            perfumeItem3 = new Perfume(444,'Acqua di Gioia','Perfume from Giorgio Armani',53.90,21,['../../public/media/acquadigioia.jpg'],'flowers/fresh','F');
        } catch (error) {
            console.error(error);
        }

        let smartWatchItem1;
        let smartWatchItem2;
        let smartWatchItem3;
        
        try {
            smartWatchItem1 = new SmartWatch(666,'Apple Watch','New apple watch model 12',800,21,['../../public/media/applewatch.jpg'],'AW-12','Square','White');
            smartWatchItem2 = new SmartWatch(777,'Samsung Watch','New samsung watch s8',650,21,['../../public/media/samsungwatch.jpg'],'SMGW-S8','Round','White');
            smartWatchItem3 = new SmartWatch(888,'Xiaomi Mi band 7','New mi band 7',30,21,['../../public/media/miband.png'],'XMI7','Stretched','Black');
        } catch (error) {
            console.error(error);
        }
        

        //BLOQUE GENERACION DE CATEGORIAS
        let cat1;
        let cat2;
        let cat3;
        try {
            cat1 = new Category('Bottom-Clothing','Clothes that fit under the waist');
            cat2 = new Category('Props','');
            cat3 = new Category('Perfume-and-Cologne','');
        } catch (error) {
           console.error(error);
        }
        

        //BLOQUE GENERACION DE TIENDAS
        let store1;
        let store2;
        let store3;
        try {
            store1 = new Store('S2447905G','Tienda Madrid','C/ Mayor 12',967899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'mmStore.jpg');
            store2 = new Store('H50463439','Tienda Ciudad Real','C/ Menor 21',957899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'primorStore.jpg');
            store3 = new Store('P0636988H','Tienda Barcelona','C/ Ramblas 2',997899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'zaraStore.png',);
        } catch (error) {
            console.error(error);
        }
        
    

        try {
            this.#storeHouseModel.addCategory(cat1);
            this.#storeHouseModel.addCategory(cat2);
            this.#storeHouseModel.addCategory(cat3);
        } catch (error) {
            console.error(error);
        }

        try {
            this.#storeHouseModel.addProduct(clothingItem2,cat1);
            this.#storeHouseModel.addProduct(clothingItem3,cat1);

            this.#storeHouseModel.addProduct(smartWatchItem1,cat2);
            this.#storeHouseModel.addProduct(smartWatchItem2,cat2);
            this.#storeHouseModel.addProduct(smartWatchItem3,cat2);

            this.#storeHouseModel.addProduct(perfumeItem1,cat3);
            this.#storeHouseModel.addProduct(perfumeItem2,cat3);
            this.#storeHouseModel.addProduct(perfumeItem3,cat3);
        } catch (error) {
            console.error(error);
        }

        try {
            this.#storeHouseModel.addShop(store1);
            this.#storeHouseModel.addShop(store2);
            this.#storeHouseModel.addShop(store3);
        } catch (error) {
            console.error(error);
        }

        try {
            this.#storeHouseModel.addProductInShop(clothingItem2,store1);
            this.#storeHouseModel.addProductInShop(clothingItem3,store1);

            this.#storeHouseModel.addProductInShop(perfumeItem1,store2);

            this.#storeHouseModel.addProductInShop(perfumeItem2,store3);
            this.#storeHouseModel.addProductInShop(smartWatchItem1,store3);
            this.#storeHouseModel.addProductInShop(smartWatchItem2,store3);
        } catch (error) {
            console.error(error);
        }


        //TODO esto peta porque fatatas, error en el modelo
        // try {
        //     this.#storeHouseModel.addProductInShop(clothingItem1,store1,3);
        //     this.#storeHouseModel.addQuantityProductInShop(clothingItem3,store1,20);

        //     this.#storeHouseModel.addProductInShop(smartWatchItem1,store3,400);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    /**
     * Para el constructor del controlador le pasamos la referencia del modelo y de la vista que hemos generado en StoreHouseApp que es el punto de entrada
     * de nuestra app y el que tenemos colocado en index.html
     * @param {*} storeHouseModel 
     * @param {*} storeHouseView 
     */
    constructor(storeHouseModel,storeHouseView) {
        this.#storeHouseModel = storeHouseModel;
        this.#storeHouseView = storeHouseView;

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


        
    }

    /**
     * Con esto cargamos los datos en el momento en el que se inicializa la aplicacion
     */
    onLoad = () => {
        this.#preLoadStoreHouseData();
    }
    /**
     * Dado el titulo de la categoria encontramos la que corresponde y almacenamos la categoria completa,luego retornamos el generador que nos da acceso a los productos
     * dada cierta categoria
     * @param {} catTitle 
     */
    handlerCats = (catTitle) => {
        let currentCat;
        for (let cat of this.#storeHouseModel.categories) {
            if(cat.category.title == catTitle) currentCat = cat.category;
        }
        console.log(currentCat)
        let data = {
            catProds: this.#storeHouseModel.getCategoryProducts(currentCat),
        }
    
        this.#storeHouseView.showCatProd(data);

    }
    /**
     * Retorna en un objeto literal tanto el iterador de tiendas como el de categorias
     */
    handlerStores = () => {
        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
        
    }
    /**
     * Este manejador obtiene el numero de serie de una tienda, dado ese cif obtenemos la tienda completa y generamos un mapa en el cual tendremos como clave
     * el titulo de la categoria y como valor un elemento html con valores dinamicos dependiendo de la categoria en cuestion,
     * retornamos un JSON con el generador que dada una tienda retorna los datos necesarios y el mapa que contiene los elementos html
     * @param {*} cifStore 
     */
    handlerProducts = (cifStore) => {
        let currentShop;
        for (let st of this.#storeHouseModel.shops) {
            if(st.store.cif == cifStore) currentShop = st.store;
        }
        
        let mp = new Map();
        for (let cat of this.#storeHouseModel.getShopProducts(currentShop)) {
            console.log(cat);
            if(!(mp.has(cat.category.title))){
                mp.set(cat.category.title,(`<fieldset class="border p-2">
                <legend class="w-auto" id="${cat.category.title}">
                ${cat.category.title}</legend>
                </legend>`));
            }
        }
        
        let data = {
            storeProds: this.#storeHouseModel.getShopProducts(currentShop),
            map: mp,
        }
        
        this.#storeHouseView.showProducts(data);
    }


    /**
     * Este manejador obtiene el numero de serie de un producto, luego dado ese serial number obtenemos el elemento producto completo y tambien el tipo de 
     * producto que tenemos en nuestro negocio, retornando un a la vista un objeto literal como un JSON con el producto completo y su tipo
     * @param {*} serialNumber 
     */
    handlerInfo = (serialNumber)=>{
        let currentProd;
        for (let cat of this.#storeHouseModel.categories) {
            for (let prod of cat.products) {
                if(prod.product.serialNumber == serialNumber){
                    currentProd = prod;
                }
            }
        }
        let type;
        if(currentProd.product instanceof Clothes){
            type = 'Clothes';
        }
        if(currentProd.product instanceof Perfume){
            type = 'Perfume';
        }
        if(currentProd.product instanceof SmartWatch){
            type = 'SmartWatch';
        }
        
        let data = {
            fullProduct: currentProd,
            'type' : type,
        }
        
        this.#storeHouseView.showProdInfo(data);
    }
    /**
     * Tomando la misma funcionalidad que encontrabamos en el handler para mostrar la informacion de los productos de 
     * manera unica dependiendo del tipo de producto ahora ademas añadimos la creacion de elementos window.
     * Haciendo uso del array activeWindows que se encuentra en la vista comprobamos si el pop up de un producto ya existe,
     * si es asi simplemente se pondra en primer plano y no se creara otro, en caso contrario se creara su pop up y se añadira al array
     * @param {*} serialNumber 
     */
    handlerPop = (serialNumber) =>{
        let currentProd;
        for (let cat of this.#storeHouseModel.categories) {
            for (let prod of cat.products) {
                if(prod.product.serialNumber == serialNumber){
                    currentProd = prod;
                }
            }
        }
        let type;
        if(currentProd.product instanceof Clothes){
            type = 'Clothes';
        }
        if(currentProd.product instanceof Perfume){
            type = 'Perfume';
        }
        if(currentProd.product instanceof SmartWatch){
            type = 'SmartWatch';
        }
        
        let data = {
            fullProduct: currentProd,
            'type' : type,
        }
        let nW;
        let i = this.#storeHouseView.activeWindows.findIndex((e) => {return e.name == serialNumber})
        if(i == -1){
            nW = window.open("",`${serialNumber}`, "width=800,height=600,resizable,scrollbars,status");
            this.#storeHouseView.activeWindows.push(nW);
        }
        i = this.#storeHouseView.activeWindows.findIndex((e) => {return e.name == serialNumber})
        this.#storeHouseView.activeWindows[i].focus();
        this.#storeHouseView.showPop(data,nW);
      
        
    }
    //Recorremos el array de ventanas activas y usando el metodo close las cerramos, despues reiniciamos el array para
    //que vuelva a estar vacio y operativo
    handlerClosePop = () => {
        this.#storeHouseView.activeWindows.forEach((el) => {
            el.close();
        });

        this.#storeHouseView.activeWindows = [];
    }
    handlerFormTypeProduct = () =>{
        this.#storeHouseView.showTypesProds();
    }
    handlerFormAddProduct = (type) => {
        let data = {
            categories : this.#storeHouseModel.categories
        }
        this.#storeHouseView.showFormAddProduct(type,data);
    }
    handlerFormAddCategory = () => {
        this.#storeHouseView.showFormAddCategory();
    }
    handlerFormRemoveCategory = () => {
        
    }
    handlerFormAddStore = () => {
        this.#storeHouseView.showFormAddStore();
    }

    //HANDLERS STORE
    handlerCheckAddStore = (...formValues) => {
        let newStore = new Store(formValues[0],formValues[1],
            formValues[2],formValues[3],formValues[4],formValues[5]);
        this.#storeHouseModel.addShop(newStore);
        
        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
        
    }
    handlerRemoveStore = ()=>{
      
        let data = {
            stores: this.#storeHouseModel.shops,
        }
        
        this.#storeHouseView.showFormRemoveStore(data);
    }
    handlerRemoveStoreNow = (cifStore)=>{
        let currentShop;
        for (let st of this.#storeHouseModel.shops) {
            if(st.store.cif == cifStore) currentShop = st.store;
        }

        this.#storeHouseModel.removeShop(currentShop);

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);

    }

    //HANDLERS PRODUCT
    handlerCheckAddPerfume = (...vals) => {
        
        let newPerfume = new Perfume(vals[0],vals[1],vals[2],vals[3],vals[4],vals[5],vals[6],vals[7]);
        
      
       vals[8].forEach((catName)=>{
        for (let cat of this.#storeHouseModel.categories) {
            if(catName == cat.category.title){
                let thisCat = cat.category;
                this.#storeHouseModel.addProduct(newPerfume,thisCat);
            }
        }
       })
        

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        
        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }
    handlerCheckAddClothe = (...vals) => {
        let newPerfume = new Clothes(vals[0],vals[1],vals[2],vals[3],vals[4],vals[5],vals[6],vals[7],vals[8]);
        vals[9].forEach((catName)=>{
            for (let cat of this.#storeHouseModel.categories) {
                if(catName == cat.category.title){
                    let thisCat = cat.category;
                    this.#storeHouseModel.addProduct(newPerfume,thisCat);
                }
            }
        });

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }
    handlerCheckAddSmartWatch = (...vals) => {
        let newPerfume = new SmartWatch(vals[0],vals[1],vals[2],vals[3],vals[4],vals[5],vals[6],vals[7],vals[8]);
        vals[9].forEach((catName)=>{
            for (let cat of this.#storeHouseModel.categories) {
                if(catName == cat.category.title){
                    let thisCat = cat.category;
                    this.#storeHouseModel.addProduct(newPerfume,thisCat);
                }
            }
        });

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }
    


    handlerRemoveProduct = () => {
        let data = {
            categories : this.#storeHouseModel.categories
        }
        this.#storeHouseView.showFormRemoveProd(data);
    }

    //HANDLERS CAT
    handlerCheckAddCategory = (...dataCat) =>{
        let newCat = new Category(dataCat[0],dataCat[1]);
        this.#storeHouseModel.addCategory(newCat);

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }

    handlerRemoveCat = ()=>{

        let data = {
            categories: this.#storeHouseModel.categories
        }

        this.#storeHouseView.showFormRemoveCat(data);
    }

    handlerRemoveCatNow = (CatTitle) => {
        let currentCat;
        for (let cats of this.#storeHouseModel.categories) {
            if(cats.category.title == CatTitle) currentCat = cats.category;
        }
        this.#storeHouseModel.removeCategory(currentCat);

        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }

    handlerRemoveProductNow = (serialNumber)=>{
        let currentProd;
        for (let c of this.#storeHouseModel.categories) {
            for (let p of c.products) {
                if(p.product.serialNumber == serialNumber)currentProd = p.product;
                
            }
        }

        this.#storeHouseModel.removeProduct(currentProd);
        
        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
    }
}