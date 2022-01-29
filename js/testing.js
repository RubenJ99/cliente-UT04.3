'use strict';
import StoreHouse from "./StoreHouse.js";
import Category from "./Category.js";

let sh = new StoreHouse('Valdemoro');
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