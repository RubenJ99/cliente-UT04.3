'use strict';
import {InvalidAccessConstructorException,EmptyValueException,
    InvalidValueException,AbstractClassException,
    InvalidInstanceException,IndexOutOfBoundsException,
    NonExistentMethodException,FullListException,
    AbstractClassException,InvalidRegexException,
    RepeatedArgumentException,NotFoundArgumentException} from "./ES6Errors";

export default class Category{
    #title;
    #description;

    constructor(title,description){
        if(!title) throw new EmptyValueException('title');
        this.#title = title;
        this.#description = description;

    }

    get getTitle(){
        return this.#title;
    }

    set setTitle(title){
        if(!title) throw new EmptyValueException('title');
        this.#title = title;
    }

    get getDescription(){
        return this.#description;
    }

    set setDescription(description){
        this.#description = description;
    }
}