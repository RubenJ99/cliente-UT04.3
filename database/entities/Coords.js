'use strict';
import {InvalidAccessConstructorException,EmptyValueException,
  InvalidValueException,AbstractClassException,
  InvalidInstanceException,IndexOutOfBoundsException,
  NonExistentMethodException,FullListException,InvalidRegexException,
  RepeatedArgumentException,NotFoundArgumentException} from "../../public/js/ES6Errors.js";
/**
 * Clase Coords con sus getter y setter segun se requiere
 */
export default class Coords{
  #latitude;
  #longitude;
  constructor(latitude,longitude) {
    this.#latitude = latitude;
    this.#longitude = longitude;
  }


  get latitude() {
    return this.#latitude;
  }

  set latitude(latitude) {
    this.#latitude = latitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(longitude) {
    this.#longitude = longitude;
  }
}