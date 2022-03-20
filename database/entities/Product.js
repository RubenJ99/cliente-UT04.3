"use strict";
import {
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
  InvalidInstanceException,
  IndexOutOfBoundsException,
  NonExistentMethodException,
  FullListException,
  InvalidRegexException,
  RepeatedArgumentException,
  NotFoundArgumentException,
} from "../../public/js/ES6Errors.js";

/**
 * Clase abstracta la cual usaremos para crear 3 productos
 */
class Product {
  #serialNumber;
  #name;
  #description;
  #price;
  #tax;
  #images;
  constructor(serialNumber, name, description, price, tax, images) {
    if (new.target === Product) throw new AbstractClassException("Product"); //Abstract check
    if (!serialNumber)
      throw new InvalidValueException("serialNumber", serialNumber);
    if (!name) throw new InvalidValueException("name", name);
    if (!price) throw new InvalidValueException("price", price);
    this.#serialNumber = serialNumber;
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#tax = tax;
    this.#images = images;
  }

  get serialNumber() {
    return this.#serialNumber;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    if (!description)
      throw new InvalidValueException("description", description);
    this.#description = description;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    if (!price) throw new InvalidValueException("price", price);
    this.#price = price;
  }

  get tax() {
    return this.#tax;
  }

  set tax(tax) {
    if (!tax) throw new InvalidValueException("tax", tax);
    this.#tax = tax;
  }

  get images() {
    return this.#images;
  }

  set images(image) {
    if (!image) throw new InvalidValueException("images", image);
    this.#images = image;
  }
}

export {Product};