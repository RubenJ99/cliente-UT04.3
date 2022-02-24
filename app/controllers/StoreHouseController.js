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
class StoreHouseController{
    #modelStoreHouse;
    #viewStoreHouse;


    #preLoadStoreHouseData(){
        let clothingItem1 = new Clothes(111,'Blue Hoodie','A blue hoodie',30,21,[],'XL','Blue','M');
        let clothingItem2 = new Clothes(222,'Red Skirt','A red skirt',27,21,[],'S','Red','F');
        let clothingItem3 = new Clothes(333,'Black Trousers','A pair of black trousers',40,21,[],'M','Black','U');


        let perfumeItem1 = new Perfume(444,'CK One','Perfume from calvin klein',49.95,21,[],'flowers/citric','F');
        let perfumeItem2 = new Perfume(555,'Eau de Rochas','Perfume from Rochas',54.00,21,[],'citric','F');
        let perfumeItem3 = new Perfume(444,'Acqua di Gioia','Perfume from Giorgio Armani',53.90,21,[],'flowers/fresh','F');


        let smartWatchItem1 =
        let smartWatchItem2 =
        let smartWatchItem3 =


        let cat1 = 
        let cat2 = 
        let cat3 = 


        let store1 =
        let store2 =
        let store3 =
    }

    constructor(modelStoreHouse,viewStoreHouse) {
        this.#modelStoreHouse = modelStoreHouse;
        this.#viewStoreHouse = viewStoreHouse;

        this.onLoad();
        
    }

    onLoad = () => {
        this.#preLoadStoreHouseData();
    }
}