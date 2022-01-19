'use strict';

export default class Category{
    #title;
    #description;
    constructor(title,description){
        if(!title) throw new Error('empty value');
        this.#title = title;
        this.#description = description;
    }

    get getTitle(){
        return this.#title;
    }

    set setTitle(title){
        if(!title) throw new Error('empty value');
        this.#title = title;
    }

    get getDescription(){
        return this.#description;
    }

    set setDescription(description){
        this.#description = description;
    }
}