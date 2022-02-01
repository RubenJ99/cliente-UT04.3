'use strict';
import StoreHouseSingle from "./StoreHouse.js";
import Category from "./Category.js";
import Store from "./Store.js";
import Coords from "./Coords.js";
import SmartWatch from "./SmartWatch.js";
import Perfume from "./Perfume.js";
import Clothes from "./Clothes.js";




let sh = new StoreHouseSingle.getInstance('MadridPrincipal');
let sw = new SmartWatch(11111,'smartwatch','',100,'21%','','apple','Big','Brown');
let sw2 = new SmartWatch(22222,'smartwatch','',100,'21%','','apple','Big','Brown');
let sw3 = new SmartWatch(33333,'smartwatch','',100,'21%','','apple','Big','Brown');
let pf = new Perfume(22222,'pefume','',20,'21%','','Rose','F');
let ct = new Clothes(33333,'tshirt','',30,'21%','','L','Grey','M');

console.log('-TEST NAME-');
console.log('Expected: MadridPrincipal / Got: ' + sh.name);


console.log('-TEST ADD CATEGORY-');
console.log('Añadimos 3 categorias');
sh.addCategory(new Category('Sudaderas'));
sh.addCategory(new Category('Electronica'));
sh.addCategory(new Category('Accesorios'));
console.log('usando el iterador de categories comprobamos que se han añadido')
for (const item of sh.categories) {
  console.log(item);
}
console.log('-TEST REMOVE CATEGORY-')
sh.removeCategory(new Category('Sudaderas'));
console.log('Eliminamos la categoria sudaderas, ahora comprobamos con el iterador')
for (const item2 of sh.categories) {
  console.log(item2);
}

console.log('-TESTING ADD PRODUCT-')
sh.addProduct(new Category('Electronica'),sw);
console.log('Añadimos un smartwatch a la categoria de electronica con addProduct');
for (const item3 of sh.categories) {
  if(item3.category.title === 'Electronica') console.log(item3);
}

console.log('-TESTING REMOVE PRODUCT-')
sh.removeProduct(sw);
console.log('Eliminamos el producto smartWatch de todas las categorias a las que pertenezca, en este caso Electronica');
for (const item4 of sh.categories) {
  console.log(item4);
}

console.log('-TESTING ADD SHOP-');
sh.addShop(new Store('76654768T','Xanadu','Calle piruleta','1111111',new Coords('1','1')));
console.log('Mostramos que se ha añadido correctamente la tienda al array con su iterador')
for (const shop of sh.shops) {
  console.log(shop);
}
try {
  console.log('-TESTING ADD PRODUCT IN SHOP-')
  sh.addProductInShop(sw, new Store('76654768T', 'Xanadu', 'Calle piruleta', '1111111', new Coords('1', '1')), 20);

  for (const prods of sh.getShopProducts(new Store('76654768T', 'Xanadu', 'Calle piruleta', '1111111', new Coords('1', '1')))) {
    console.log(prods);
  }
}catch (error){console.error(error.message)}

try{
  console.log('-TESTING ADD QUANTITY PRODUCT IN SHOP-');
  sh.addQuantityProductInShop(sw,new Store('76654768T', 'Xanadu', 'Calle piruleta', '1111111', new Coords('1', '1')),2000);
}catch (error){
  console.error(error.message);
  console.log('Este error salta porque addProductInShop no funciona correctamente pero este si');
}

console.log('-TEST REMOVE SHOP-')
sh.removeShop(new Store('76654768T', 'Xanadu', 'Calle piruleta', '1111111', new Coords('1', '1')));
console.log('Comprobamos que la tienda Xanadu ha desaparecido, el iterador no deberia devolver nada');
for (const shop1 of sh.shops) {
  console.log(shop1);
}
console.log('TESTING GENERADOR getCategoryProducts')
sh.addProduct(new Category('Electronica'),sw);
sh.addProduct(new Category('Electronica'),sw2);
sh.addProduct(new Category('Electronica'),sw3);
for (const catP of sh.getCategoryProducts(new Category('Electronica'),'')) {
  console.log(catP);
}

console.log('TESTING GENERADOR getShopProducts')
for (const prodsInShop of sh.getShopProducts(new Store('76654768T', 'Xanadu', 'Calle piruleta', '1111111', new Coords('1', '1')),'')) {
  console.log(prodsInShop);
}

























