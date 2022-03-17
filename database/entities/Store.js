'use strict';
import {InvalidInstanceException, InvalidRegexException, InvalidValueException} from "../../public/js/ES6Errors.js";
import {Coords}  from "../entities/Coords.js";
/**
 * Clase Store con getter y setter basicos
 */
class Store{
  #cif;
  #name;
  #address;
  #phone;
  #coords;
  #img;
  constructor(cif,name,address,phone,coords,img) {
    if(!this.#checkCif(cif)) throw new InvalidRegexException();
    if(!name) throw new InvalidValueException('name',name);
    this.#cif = cif;
    this.#name = name;
    this.#address = address;
    this.#coords = coords;
    this.#phone = phone;
    this.#coords = coords;
    this.#img = "../../public/media/" +img;

  }
  #checkCif(cif){
    return /([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/g.test(cif);
  }
  get cif(){
    return this.#cif;
  }
  set cif(newCif){
    this.#cif = newCif;
  }

  get name(){
    return this.#name;
  }

  set name(name){
    if(!name) throw new InvalidValueException('name',name);
    this.#name = name;
  }

  get address(){
    return this.#address;
  }

  set address(address){
    if(!address) throw new InvalidValueException('address',address);
    this.#address = address;
  }

  get coords(){
    return this.#address;
  }

  set coords(coords){
    if(!coords) throw new InvalidValueException('coords',coords);
    if(!(coords instanceof Coords)) throw new InvalidInstanceException(coords,Coords);
    this.#coords = coords;
  }

  get phone(){
    return this.#phone;
  }

  set phone(phone){
    if(!phone) throw new InvalidValueException('phone',phone);
    this.#phone = phone;
  }

  get img(){
    return this.#img;
  }
}
export {Store};