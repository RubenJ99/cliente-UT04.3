'use strict';

import Product from "../entities/Product.js";
import {EmptyValueException, InvalidValueException} from "../../public/js/ES6Errors.js";

/**
 * Clase que hereda de Product con unos getter y setter
 */
export default class SmartWatch extends Product{
  #model;
  #sphere;
  #bandColor;
  constructor(serialNumber,name,description,price,tax,images,model,sphere,bandColor) {
    super(serialNumber,name,description,price,tax,images);
    if(!model || !sphere || !bandColor) throw new EmptyValueException();
    this.#model = model;
    this.#sphere = sphere;
    this.#bandColor = bandColor;
  }

  get model(){
    return this.#model;
  }

  set model(model){
    this.#model = model;
  }

  get sphere(){
    return this.#sphere;
  }

  set sphere(sphere){
    this.#sphere = sphere;
  }
}