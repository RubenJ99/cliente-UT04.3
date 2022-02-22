'use strict';
import {InvalidAccessConstructorException,EmptyValueException,
  InvalidValueException,AbstractClassException,
  InvalidInstanceException,IndexOutOfBoundsException,
  NonExistentMethodException,FullListException,InvalidRegexException,
  RepeatedArgumentException,NotFoundArgumentException} from "./ES6Errors.js";

/**
 * getters y setters de Categoria requeridos
 */
export default class Category{
  #title;
  #description;

  constructor(title,description){
    if(!title) throw new EmptyValueException('title');
    this.#title = title;
    this.#description = description;

  }

  get title(){
    return this.#title;
  }

  set title(title){
    if(!title) throw new EmptyValueException('title');
    this.#title = title;
  }

  get description(){
    return this.#description;
  }

  set description(description){
    this.#description = description;
  }
}