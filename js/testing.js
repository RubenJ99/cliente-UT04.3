'use strict';
import StoreHouseSingle from "./StoreHouse.js";
import Category from "./Category.js";
import Store from "./Store.js";
import Coords from "./Coords.js";

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