//RUBEN JUAREZ PEREZ 2DAW
"use strict";
/**
 * Clase padre principal, de esta heredara la clase ObjectList.
 * Esta Clase admite cualquier tipo de valor dentro de si, sin restricciones de tipo y de forma no ordenada
 * @param {*} capacity Maximo de valores a la lista
 * @param {*} stg Array en el que se basa el almacenamiento de la lista, no es necesario insertarlo al instanciar la clase,
 * existe para poder relizar correctamente la herencia del campo privado _storage
 */
function List(capacity=100,stg = []) {
  if (!(this instanceof List)) throw new InvalidAccessConstructorException();
  if(!capacity) throw new EmptyValueException('capacity');
  this.capacity = capacity;
  let _storage = stg;

  Object.defineProperty(this,'storage',{
    get: () => {return _storage}, //solo pongo el getter porque no tiene mucho sentido tener un campo privado como el array con un setter
  });
  /**
   * Comprueba si la longitud del array es 0 en cuyo caso esta vacio
   * @returns Boolean
   */
  this.isEmpty = function () {
    return _storage.length === 0;
  }
  /**
   * Comprueba si la longitud del array es igual al maximo, en cuyo caso esta lleno
   * @returns Boolean
   */
  this.isFull = function () {
    return _storage.length === this.capacity;
  }
  /**
   * Retorna el tamaño del array simplemente
   * @returns Number
   */
  this.size = function () {
    return _storage.length;
  }
  /**
   * En la funcion añadir lo que hacemos previamente es comprobar que no este ya la lista llena y que se nos ha pasado un elemento,
   * luego como no nos importa el tipo lo que hacemos es insertarlo, retornamos la nueva length
   * @param {*} elem Nuevo elemento a insertar en la lista
   * @returns Number
   */
  this.add = function (elem) {
    if(this.isFull()) throw new FullListException();
    if(!elem) throw new EmptyValueException('elem');
    _storage.push(elem);
    return _storage.length;
  }
  /**
   * En esta funcion despues de comprobar que el elemento no esta vacio y que la posicion pasada es correcta, no esta fuera de limites
   * realizamos un splice para insertar en esa posicion
   * @param {*} elem Nuevo elemento a insertar
   * @param {*} index Posicion en la que insertar
   * @returns Number
   */
  this.addAt = function (elem,index) {
    if(this.isFull()) throw new FullListException();
    if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
    _storage.splice(index,0,elem);
    return _storage.length;
  }
  /**
   * Comprobamos que la posicion no este fuera de rango y que tengamos un valor en esa posicion que extraer
   * @param {*} index Posicion de la cual extraemos el elemento o valor requerido
   * @returns Any
   */
  this.get = function (index) {
    if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
    let dat = _storage[index];
    if(!dat) throw new IndexOutOfBoundsException();
    return JSON.stringify(dat);
  }
  /**
   * Recorremos la lista entera, y dependiendo de si es un objeto o no tratamos los datos de una manera u otra para
   * poder visualizarlo en modo string
   * @returns String
   */
  this.toString = function () {
    let str = " ";
    _storage.forEach((elem)=>{
      if(typeof(elem) === 'object'){
        str += JSON.stringify(elem) + '-';
      }else{
        str += elem + '-';
      }
    });
    return str.trimStart();
  }
  /**
   * Dado un elemento pasado por parametro como no sabemos si es primitivo o un objeto usamos Arrays.prototype.indexOf
   * si es un objeto comparara si es el mismo punto de memoria
   * @param {*} elem elemento a buscar
   * @returns Number
   */
  this.indexOf = function (elem) {
    if(!elem) throw new EmptyValueException('elem')
    return _storage.findIndex((e)=>{
      return Object.entries(e).toString() === Object.entries(elem).toString()
    });
   
  }
  /**
   * Dado un elemento pasado por parametro como no sabemos si es primitivo o un objeto usamos Arrays.prototype.lastIndexOf
   * si es un objeto comparara si es el mismo punto de memoria
   * @param {*} elem elemento a buscar
   * @returns Number
   */
  this.lastIndexOf = function (elem) {
    if(!elem) throw new EmptyValueException('elem');
    return _storage.lastIndexOf(elem);
  }
  /**
   * Retorna el maximo declarado cuando se instancio
   * @returns Number
   */
  this.maxCapacity = function () {
    return this.capacity;
  }
  /**
   * Modificamos la longitud a 0 y asi se borra todo el contenido del array
   * @returns undefined
   */
  this.clear = function (){
    _storage.length = 0;
  }
  /**
   * Busca la primera posicion que contenga un dato dentro del array
   * @returns Any
   */
  this.firstElement = function () {
    return JSON.stringify(_storage.find((elem)=>{
      return elem != undefined;
    }));
  }
  /**
   * Dada una copia del array le damos la vuelta y buscamos la primera posicion del array con datos, retornamos esta
   * @returns Any
   */
  this.lastElement = function () {
    let _stgCopy = [..._storage];
    return JSON.stringify(_stgCopy.reverse().find((elem) => {
      return elem != undefined;
    }));
  }
  /**
   * Buscamos que el index sea valido y que tengamos un registro en esa posicion, si todo va correcto
   * borramos los datos de esa posicion
   * @param {*} index Valor de posicion
   * @returns any
   */
  this.remove = function (index) {
    if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
    let data = _storage[index];
    if(!data) throw new IndexOutOfBoundsException();
    _storage.splice(index,1);
    return JSON.stringify(data);
  }
  /**
   * Buscamos que el elemento, y si este es valido borramos la primera ocurrencia
   * @param {*} elem elemento a borrar
   * @returns any
   */
  this.removeElement = function (elem) {
    if(!elem) throw new EmptyValueException("elem");
    let indx = this.indexOf(elem);
    let old = _storage[indx];
    _storage.splice(indx,1);
    return JSON.stringify(old);
  }
  /**
   * Dado un elemento y una posicion comprobamos que ambos valores son validos e insertamos en una buena posicion
   * @param {*} elem elemento que queremos insertar
   * @param {*} index posicion en la que queremos insertar
   * @returns Any
   */
  this.set = function(elem,index){
    if(!elem) throw new EmptyValueException("elem");
    if(index == undefined) throw new EmptyValueException("index");
    if(index < 0 || index > this.capacity) throw new IndexOutOfBoundsException();
    let prev = _storage[index];
    _storage[index] = elem;
    return JSON.stringify(prev);
  }
}

List.prototype.constructor = List;
