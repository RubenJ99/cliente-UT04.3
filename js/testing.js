'use strict';
import StoreHouseSingle from "./StoreHouse.js";
import Category from "./Category.js";
import Store from "./Store.js";
import Coords from "./Coords.js";
import SmartWatch from "./SmartWatch.js";
import Perfume from "./Perfume.js";
import Clothes from "./Clothes.js";




let sh = new StoreHouseSingle.getInstance('Valdemoro');
sh.addCategory(new Category('Jumpers','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
sh.addCategory(new Category('Denim','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
sh.addCategory(new Category('Trucker Jacket','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
for (const item of sh.categories) {
  console.log(item);
}
console.log('---------------------------------')
sh.removeCategory((new Category('Jumpers','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')));
for (const item of sh.categories) {
  console.log(item);
}
for (const item of sh.shops) {
  console.log(item);
}
console.log('-------------------------');
sh.addShop(new Store('H92482892','DefStore','RandomAddress','123456789',new Coords('1','1')));
console.log(sh.removeShop());
console.log('------------------------- generator');
let sw = new SmartWatch(11111,'smartwatch','',100,'21%','','apple','Big','Brown');
let pf = new Perfume(22222,'pefume','',20,'21%','','Rose','F');
let ct = new Clothes(33333,'tshirt','',30,'21%','','L','Grey','M');
sh.addProduct(new Category('Denim','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),sw);
sh.addProduct(new Category('Denim','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),ct);
let gen = sh.getCategoryProducts((new Category('Denim','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')));
for (const genElement of gen) {
  console.log(genElement);
}
sh.addProduct(new Category('Jumpers','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),ct);
let gen2 = sh.getCategoryProducts(new Category('Jumpers','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
for (const gen2Element of gen2) {
  console.log(gen2Element);
}

console.log('----------------------------------')
for (const item2 of sh.categories) {
  console.log(item2);
}























