//RUBEN JUAREZ PEREZ 2DAW
'use strict';
/**
 * Esta clase hereda de List, aqui solo se podran insertar datos del tipo especifcado cuando se instancia y ademas mantenemos
 * la lista ordenada mediante una funcion de ordenacion que se especificara en el momento que instanciamos el objeto
 * @param {*} capacity Maximo de valores en la lista
 * @param {*} type tipo de objeto(instancia)
 * @param {*} order funcion de ordenacion para esta lista de objetos
 */
function OrderedObjectList(type,order,capacity=100) {
    if (!(this instanceof OrderedObjectList)) throw new InvalidAccessConstructorException();
    if(!order) throw new EmptyValueException('order');
    let _storage = [];
    ObjectList.call(this,capacity,type,_storage);
    this.order = order;
    
    let addOrdObjList = this.add;
    /**
     * Modificamos la funcion, primero guardamos la anterior en una variable y luego modificamos el add, 
     * de forma que cuando se añada un objeto la lista use la funcion sort la cual tiene un callback custom
     * @param {*} elem elemento a añadir
     */
    this.add = function (elem) {
        addOrdObjList.call(this,elem);
        _storage.sort(this.order);
        return _storage.length;
    }
    
    this.addAt = () => {
        throw new NonExistentMethodException();
    }
    this.lastIndexOf = () => {
        throw new NonExistentMethodException();
    }
    this.set = () => {
        throw new NonExistentMethodException();
    }

}
OrderedObjectList.prototype = Object.create(ObjectList.prototype);
OrderedObjectList.prototype.constructor = OrderedObjectList;
