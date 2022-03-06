import {Clothes} from "../../database/entities/Clothes.js";

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
            this.dropSt.append(`<li><a class="dropdown-item bShowProds" value="${data.store.cif}">${data.store.name}</a></li>`);
        }

    }

    showProducts(query){
        this.main.empty();
        for (let data of query.storeProds) {
            let img = data.product.images[0];
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
    
    showProdInfo(data){
        this.main.empty();
        this.main.css({'background-color':'white',
                            'align-items':'center',
                            'justify-content':'center'});
        if(data.type === 'Clothes'){
            
            this.main.append(`<form>
            <div class="row">
            <div class="mb-3">
              <input type="text" class="form-control" id="prodId" value="${data.fullProduct.product.serialNumber}" hidden>
            </div>
            <div class="mb-3">
            <label for="prodName">Name: </label>
                <input type="text" class="form-control" id="prodName" value="${data.fullProduct.product.name}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Price: </label>
                <input type="text" class="form-control" id="prodPrice" value="${data.fullProduct.product.price}$" disabled>
            </div>
            </div>
            <div class="row">
            <div class="mb-3">
            <label for="prodName">Tax: </label>
                <input type="text" class="form-control" id="prodTax" value="${data.fullProduct.product.tax}%" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Size: </label>
                <input type="text" class="form-control" id="prodSize" value="${data.fullProduct.product.size}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Color: </label>
                <input type="text" class="form-control" id="prodColor" value="${data.fullProduct.product.color}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Gender: </label>
                <input type="text" class="form-control" id="prodGender" value="${data.fullProduct.product.gender}" disabled>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Comprar</button>
          </form>`)
        }

        if(data.type === 'Perfume'){
            
            this.main.append(`<form>
            <div class="row">
            <div class="mb-3">
              <input type="text" class="form-control" id="prodId" value="${data.fullProduct.product.serialNumber}" hidden>
            </div>
            <div class="mb-3">
            <label for="prodName">Name: </label>
                <input type="text" class="form-control" id="prodName" value="${data.fullProduct.product.name}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Price: </label>
                <input type="text" class="form-control" id="prodPrice" value="${data.fullProduct.product.price}$" disabled>
            </div>
            </div>
            <div class="row">
            <div class="mb-3">
            <label for="prodName">Tax: </label>
                <input type="text" class="form-control" id="prodTax" value="${data.fullProduct.product.tax}%" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Color: </label>
                <input type="text" class="form-control" id="prodOdor" value="${data.fullProduct.product.odor}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Gender: </label>
                <input type="text" class="form-control" id="prodGender" value="${data.fullProduct.product.gender}" disabled>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Comprar</button>
          </form>`)
        }

        if(data.type === 'SmartWatch'){
            
            this.main.append(`<form>
            <div class="row">
            <div class="mb-3">
              <input type="text" class="form-control" id="prodId" value="${data.fullProduct.product.serialNumber}" hidden>
            </div>
            <div class="mb-3">
            <label for="prodName">Name: </label>
                <input type="text" class="form-control" id="prodName" value="${data.fullProduct.product.name}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Price: </label>
                <input type="text" class="form-control" id="prodPrice" value="${data.fullProduct.product.price}$" disabled>
            </div>
            </div>
            <div class="row">
            <div class="mb-3">
            <label for="prodName">Tax: </label>
                <input type="text" class="form-control" id="prodTax" value="${data.fullProduct.product.tax}%" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Color: </label>
                <input type="text" class="form-control" id="prodModel" value="${data.fullProduct.product.model}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Gender: </label>
                <input type="text" class="form-control" id="prodSphere" value="${data.fullProduct.product.sphere}" disabled>
            </div>
            <div class="mb-3">
            <label for="prodName">Size: </label>
                <input type="text" class="form-control" id="prodBandColor" value="${data.fullProduct.product.bandColor}" disabled>
            </div>
            </div>
            <div class="mb-3">
            <button type="submit" class="btn btn-primary">Comprar</button>
          </form>`)
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

    bindInfo(handler){
        $(document).on('click','.bShowInfo',function(e){
            handler($(this).attr('value'));
        })
    }

}