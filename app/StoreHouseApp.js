import StoreHouse from "../database/model/StoreHouseModel.js";
import {
    DuplicatedProductException,
    EmptyValueException,
    IndexOutOfBoundsException,
    InvalidInstanceException,
    InvalidValueException,
    RepeatedArgumentException,
  } from "../public/js/ES6Errors.js";
import {Product,Clothes,Perfume,SmartWatch,Coords,Category,Store} from '../database/model/StoreHouseModel.js';
import StoreHouseController from '../app/controllers/StoreHouseController.js';
import StoreHouseView from '../public/js/StoreHouseView.js';



$(function(){
    const StoreHouseApp = new StoreHouseController(
        StoreHouse.getInstance(), new StoreHouseView()
    );
});