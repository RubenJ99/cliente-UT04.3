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
            store1 = new Store('S2447905G','Tienda Madrid','C/ Mayor 12',967899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'../../public/media/mmStore.jpg');
            store2 = new Store('H50463439','Tienda Ciudad Real','C/ Menor 21',957899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'../../public/media/primorStore.jpg');
            store3 = new Store('P0636988H','Tienda Barcelona','C/ Ramblas 2',997899011,new Coords('50.4536','30.5164 50° 27′ 13″ North, 30° 30′ 59″ East'),'../../public/media/zaraStore.png',);
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
            this.#storeHouseModel.addProduct(cat1,clothingItem2);
            this.#storeHouseModel.addProduct(cat1,clothingItem3);

            this.#storeHouseModel.addProduct(cat2,smartWatchItem1);
            this.#storeHouseModel.addProduct(cat2,smartWatchItem2);
            this.#storeHouseModel.addProduct(cat2,smartWatchItem3);

            this.#storeHouseModel.addProduct(cat3,perfumeItem1);
            this.#storeHouseModel.addProduct(cat3,perfumeItem2);
            this.#storeHouseModel.addProduct(cat3,perfumeItem3);
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
    }

    constructor(storeHouseModel,storeHouseView) {
        this.#storeHouseModel = storeHouseModel;
        this.#storeHouseView = storeHouseView;

        this.onLoad();

        
        this.#storeHouseView.bindStores(this.handlerStores);
        this.#storeHouseView.bindProducts(this.handlerProducts);
        this.#storeHouseView.bindInfo(this.handlerInfo);
        
    }

    onLoad = () => {
        this.#preLoadStoreHouseData();
    }

    handlerStores = () => {
        let data = {
            stores: this.#storeHouseModel.shops,
            cats: this.#storeHouseModel.categories,
        }

        this.#storeHouseView.showStores(data);
        this.#storeHouseView.showDrops(data);
        
    }

    handlerProducts = (cifStore) => {
        let currentShop;
        for (let st of this.#storeHouseModel.shops) {
            if(st.store.cif == cifStore) currentShop = st.store;
        }
        let mp = new Map();
        for (let cat of this.#storeHouseModel.getShopProducts(currentShop)) {
            if(!(mp.has(cat.category.title))){
                mp.set(cat.category.title,(`<fieldset class="border p-2">
                <legend class="w-auto" id="${cat.category.title}">
                ${cat.category.title}</legend>
                </legend>`));
            }
        }
        for (const a of this.#storeHouseModel.categories) {
            console.log(a)
        }
        let data = {
            storeProds: this.#storeHouseModel.getShopProducts(currentShop),
            map: mp,
        }
        this.#storeHouseView.showProducts(data);
    }

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
}