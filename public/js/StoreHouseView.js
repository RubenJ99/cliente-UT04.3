export default class StoreHouseView{
    constructor() {
        this.main = $('#main');
        this.dropSt = $('#storesDropUl');
        this.dropCa = $('#categoriesDropUl');
        
    }


   
    showStores(query){
        this.main.empty();
        for (let data of query.stores) {
            this.main.append(`<div class="card" id="${data.store.cif}" style="width: 18rem;">
            <img src="${data.store.img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.store.name}</h5>
              <p class="card-text">${data.store.address}</p>
              <a href="#" class="btn btn-primary bShowProds" value="${data.store.cif}">Productos</a>
            </div>
          </div>`);
        }
    }

    showDrops(query){
        this.dropCa.empty();
        this.dropSt.empty();
        for (let data of query.cats) {
            this.dropCa.append(`<li><a class="dropdown-item" href="" value="${data.category.title}">${data.category.title}</a></li>`);
        }
        for (let data of query.stores) {
            this.dropSt.append(`<li><a class="dropdown-item" href="" value="${data.store.cif}">${data.store.name}</a></li>`);
        }

    }

    showProducts(query){
        this.main.empty();
        for (let data of query.storeProds) {
            console.log(data);
            let img = data.product.images[0];
            console.log(img);
            console.log(data.product.serialNumber)
            this.main.append(`<div class="card" id="${data.product.serialNumber}" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.product.name}</h5>
              <p class="card-text">${data.product.description}</p>
              <a href="#" class="btn btn-primary bShowInfo" value="${data.product.serialNumber}">Info</a>
            </div>
          </div>`);
        }
    }
    

    

    bindStores(handler){
        $(document).ready((e) => {
            handler();
        })

        $('#bInicio').click((e)=>{
            handler();
        })
    }

    bindProducts(handler){
        //Delegacion de evento usando el on y los 3 parametros
        $(document).on('click','.bShowProds',function(e){
            handler($(this).attr('value'));
        })
        
    }

}