'use strict';
import StoreHouse from "./StoreHouse.js";

let sh = new StoreHouse('Valdemoro');
for (const item of sh.categories) {
    console.log(item);
}

for (const item of sh.shops) {
    console.log(item);
}