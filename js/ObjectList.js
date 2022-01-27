//RUBEN JUAREZ PEREZ 2DAW
'use strict';
/**
 * Esta clase hereda de List, aqui solo se podran insertar datos del tipo especifcado cuando se instancia,
 * esta lista no es ordenada
 * @param {*} capacity Maximo de valores en la lista
 * @param {*} type tipo de objeto(instancia)
 * @param {*} stg Array en el que se basa el almacenamiento de la lista, no es necesario insertarlo al instanciar la clase,
 * existe para poder relizar correctamente la herencia del campo privado _storage
 */
function ObjectList(type,capacity=100,stg = []) {
    if (!(this instanceof ObjectList)) throw new InvalidAccessConstructorException();
    if(!type) throw new EmptyValueException('type');
    let _storage = stg;
    List.call(this,capacity,_storage);
    this.type = type;

    let _addObject = this.add;
    /**
     * Modificamos la funcion, primero guardamos la anterior en una variable y luego modificamos el add, 
     * probando todo lo necesario para asegurarnos de que es un objeto del tipo requerido y luego sobre
     * la varaible que habiamos usado para alamacenar lo que hacemos el usar el .call() pasando this para el ambito
     * y el elemento a introducir
     * @param {*} elem elemento a introducir
     */
    this.add = function (elem) {
        if(!(typeof(elem) === 'object' || 'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof this.type)) throw new InvalidInstanceException('elem',this.type);
        _addObject.call(this,elem);
        return _storage.length;
    }

    let _addAtObject = this.addAt;
    /**
     * Guardamos la funcion anterior en una variable y la modificamos; comprobamos que el valor es valido y 
     * usamos call() para llamar a la funcion original del padre
     * @param {*} elem elemento a introducir
     * @param {*} index posicion en la que introducir
     */
    this.addAt = function (elem,index) {
        if(!(typeof(elem) === 'object'||'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof this.type)) throw new InvalidInstanceException('elem',this.type);
        
        _addAtObject.call(this,elem,index);
        return _storage.length;
    }

    let _indexOfObject = this.indexOf;
    /**
     * Guardamos la funcion anterior en una variable y la modificamos; comprobamos que el valor es valido y 
     * usamos call() para llamar a la funcion original del padre
     * @param {*} elem Elemento a introducir
     */
    this.indexOf = function (elem) {
        if(!(typeof(elem) === 'object'||'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof(this.type))) throw new InvalidInstanceException('elem',this.type);

       return _indexOfObject.call(this,elem);
    }
    /**
     * Guardamos la funcion anterior en una variable y la modificamos; comprobamos que el valor es valido y 
     * usamos call() para llamar a la funcion original del padre
     * @param {*} elem Elemento a introducir
     */
    let _lastIndexOfObject = this.lastIndexOf;
    this.lastIndexOf = function (elem) {
        if(!(typeof(elem) === 'object'||'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof this.type)) throw new InvalidInstanceException('elem',this.type);

        return _lastIndexOfObject.call(this,elem);
    }
    /**
     * Guardamos la funcion anterior en una variable y la modificamos; comprobamos que el valor es valido y 
     * usamos call() para llamar a la funcion original del padre
     * @param {*} elem Elemento a introducir
     */
    let _removeElementObject = this.removeElement;
    this.removeElement = function (elem) {
        if(!(typeof(elem) === 'object'||'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof this.type)) throw new InvalidInstanceException('elem',this.type);

        return _removeElementObject.call(this,elem);
    }
    /**
     * Guardamos la funcion anterior en una variable y la modificamos; comprobamos que el valor es valido y 
     * usamos call() para llamar a la funcion original del padre
     * @param {*} elem Elemento a introducir
     */
    let _setObject = this.set;
    this.set = function (elem,index) {
        if(!(typeof(elem) === 'object'||'function')) throw new InvalidTypeException('elem',typeof(elem));
        //if(!(elem instanceof this.type)) throw new InvalidInstanceException('elem',this.type);

        return _setObject.call(this,elem,index);
    }
}
ObjectList.prototype = Object.create(List.prototype);
ObjectList.prototype.constructor = ObjectList;

