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
  import {Clothes} from "../../database/entities/Clothes.js";
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
            clothingItem1 = new Clothes(111,'Blue Hoodie','A blue hoodie',30,21,[],'XL','Blue','M');
            clothingItem2 = new Clothes(222,'Red Skirt','A red skirt',27,21,[],'S','Red','F');
            clothingItem3 = new Clothes(333,'Black Trousers','A pair of black trousers',40,21,[],'M','Black','U');
        } catch (error) {
            console.error(error);
        }
        
        let perfumeItem1;
        let perfumeItem2;
        let perfumeItem3;

        try {
            perfumeItem1 = new Perfume(444,'CK One','Perfume from calvin klein',49.95,21,[],'flowers/citric','F');
            perfumeItem2 = new Perfume(555,'Eau de Rochas','Perfume from Rochas',54.00,21,[],'citric','F');
            perfumeItem3 = new Perfume(444,'Acqua di Gioia','Perfume from Giorgio Armani',53.90,21,[],'flowers/fresh','F');
        } catch (error) {
            console.error(error);
        }

        let smartWatchItem1;
        let smartWatchItem2;
        let smartWatchItem3;
        
        try {
            smartWatchItem1 = new SmartWatch(666,'Apple Watch','New apple watch model 12',800,21,[],'AW-12','Square','White');
            smartWatchItem2 = new SmartWatch(777,'Samsung Watch','New samsung watch s8',650,21,[],'SMGW-S8','Round','White');
            smartWatchItem3 = new SmartWatch(888,'Xiaomi Mi band 7','New mi band 7',30,21,[],'XMI7','Stretched','Black');
        } catch (error) {
            console.error(error);
        }
        

        //BLOQUE GENERACION DE CATEGORIAS
        let cat1;
        let cat2;
        let cat3;
        try {
            cat1 = new Category('Bottom Clothing','Clothes that fit under the waist');
            cat2 = new Category('Props','');
            cat3 = new Category('Perfume and Cologne','');
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
        
    }

    onLoad = () => {
        this.#preLoadStoreHouseData();
    }

    handlerStores = () => {
        this.#storeHouseModel.test();
        let data = {
            stores: this.#storeHouseModel.shops,
        }

        this.#storeHouseView.showStores(data);
    }
}