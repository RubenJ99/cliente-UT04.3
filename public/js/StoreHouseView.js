import {Clothes} from "../../database/entities/Clothes.js";
        //* VARS ADD STORE
        let validCif = false;
        let validName = false;
        let validAddress = false;
        let validPhone = false;
        let validImg = false;
        let validCoords = false;
        let cifValue;
        let nameValue;
        let addressValue;
        let phoneValue;
        let coordsValue;
        let imgValue;
export default class StoreHouseView{
    //No entiendo por que no me funciona correctamente el metodo pushState, parece que no toma correctamente
    //los movimientos entre "paginas"
    
    // #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event){
	// 	handler(...handlerArguments);
	// 	$(scrollElement).get(0).scrollIntoView();
	// 	history.pushState(data, null, url);
	// 	event.preventDefault();
	// }

    constructor() {
        this.main = $('#main');
        this.dropSt = $('#storesDropUl');
        this.dropCa = $('#categoriesDropUl');
        this.activeWindows = [];

        
    }


   /**
    * Recorre el iterador de tiendas y genera unas cards de bootstrap en el contenedor main
    * @param {} query 
    */
    showStores(query){
        this.main.empty();
        for (let data of query.stores) {
          
           this.main.append(`<div class="card" id="${data.store.cif}" style="width: 18rem;">
            <img src="${data.store.img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.store.name}</h5>
              <p class="card-text">${data.store.address}</p>
              <a class="btn btn-primary bShowProds" data-store="${data.store.cif}" >Productos</a>
              <a class="btn btn-danger bRemStore" data-store="${data.store.cif}" >Eliminar Tienda</a>
            </div>
          </div>`);
        }
    }

    /**
     * Dados los iteradores de categorias y de tiendas genera en los dropdowns de categorias y tiendas los enlaces para poder acceder desde esos submenus
     * 
     * @param {*} query 
     */
    showDrops(query){
        this.dropCa.empty();
        this.dropSt.empty();
        for (let data of query.cats) {
            this.dropCa.append(`<li><a  class="dropdown-item bShowCats" value="${data.category.title}">${data.category.title}</a></li>`);
        }
        for (let data of query.stores) {
            this.dropSt.append(`<li><a class="dropdown-item bShowProds" data-store="${data.store.cif}">${data.store.name}</a></li>`);
        }

    }

    /**
     * Dado el objeto literal de la consulta al manejador teniendo el mapa con los contenedores por categoria y los productos primero asociamos 
     * al elemento main estos contenedores de manera dinamica de tal manera que no se queden categorias sueltas y luego recorriendo el generador de 
     * productos hacemos el append de estos sobre el contenedor de categorias en vez de directamente sobre main de tal forma que quedan clasificados
     * @param {*} query 
     */
    showProducts(query){
        this.main.empty();
        for (let [key,val] of query.map.entries()) {
            this.main.append(val);
        }

        
        for (let data of query.storeProds) {
             
            
            let img = data.product.images[0];

            $(`#${data.category.title}`).append(`<div class="card" id="${data.product.serialNumber}" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.product.name}</h5>
              <p class="card-text">${data.product.description}</p>
              <a class="btn btn-primary bShowInfo" value="${data.product.serialNumber}">Info</a>
              <a class="btn btn-warning bPopInfo" value="${data.product.serialNumber}">Pop up</a>
            </div>
          </div>`);
        }
    }
    
    /**
     * Dado el tipo de producto y el producto generamos 3 elementos html distintos y enviamos al main el que sea correcto
     * @param {} data 
     */
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

    /**
     * Dado el generador de la categoria en cuestion mostramos en el elemento main los productos de dicha categoria
     * @param {*} query 
     */
    showCatProd(query){
        this.main.empty();
        
        for (let data of query.catProds) {
            let img = data.product.images[0];

            this.main.append(`<div class="card" id="${data.product.serialNumber}" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.product.name}</h5>
              <p class="card-text">${data.product.description}</p>
              <a class="btn btn-primary bShowInfo" data-info="${data.product.serialNumber}">Info</a>
            </div>
          </div>`);
        }
    }

    showPop(data,newWindow){
        newWindow.document.write(`<link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />`);

        if(data.type === 'Clothes'){
            
            newWindow.document.write(`<form>
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
          </form>`)
        }

        if(data.type === 'Perfume'){
            
            newWindow.document.write(`<form>
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
          </form>`)
        }

        if(data.type === 'SmartWatch'){
            
           newWindow.document.write(`<form>
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
          </form>`);
        }

        newWindow.document.write(`<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>`);
    }

    
    bindStores(handler){
        $(document).ready((e) => {
            //this.#excecuteHandler(handler,[],'body',{action: 'init'},'#',e)
            handler();
        })

        $('#bInicio').click((e)=>{
            //this.#excecuteHandler(handler,[],'body',{action: 'init'},'#',e)
             handler();
        })
    }

    bindProducts(handler){
        //Delegacion de evento usando el on y los 3 parametros
        $(document).on('click','.bShowProds',(e)=>{
            // let cifStore =
            
            // this.#excecuteHandler(
            //     handler, [cifStore],
            //     this.main,
            //     {action: 'store-prods', cifStore: cifStore},
            //     '#prod-list-type', e
            // );
            handler($(e.target).closest($('.bShowProds')).get(0).dataset.store)
        })
        
    }

    bindCats(handler){
        $(document).on('click','.bShowCats',function(e){
            // let catTitle =
            // this.#excecuteHandler(
            //     handler, [catTitle],
            //     this.main,
            //     {action: 'cat-prods', catTitle: catTitle},
            //     '#prod-cat',e
            // )
            handler($(this).attr('value'));
        })
    }

    bindInfo(handler){
        $(document).on('click','.bShowInfo',function(e){
            handler($(this).attr('value'));
        })
    }

    bindPop(handler){
        $(document).on('click','.bPopInfo',function(e){
            handler($(this).attr('value'));
        })
    }

    bindClosePop(handler){
        $('#bBorrarPop').click(function(e){
            handler();
        })
    }

    //FORMS

    showFormAddStore(){
        this.main.empty();
        this.main.append(`   <div class="container" style="color: white;">
        <form action="" id="formAddStore" method="POST">
            <div class="input-control col-md-4">
                <label for="cifForm">Cif: </label>
                <input class ="form-control" type="text" name="cifForm" id="cifForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="nameForm">Name: </label>
                <input class ="form-control" type="text" name="nameForm" id="nameForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="addressForm">Address: </label>
                <input class ="form-control" type="text" name="addressForm" id="addressForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="phoneForm">Phone: </label>
                <input class ="form-control" type="text" name="phoneForm" id="phoneForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="coordsForm">Coords: </label>
                <input class ="form-control" type="text" name="coordsForm" id="coordsForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="imgForm">Img: </label>
                <input class ="form-control" type="file" name="imgForm" id="imgForm">
                <div class="error"></div>
            </div></br>
            <button type="submit" class="btn btn-success">Add</button> <span>Keep trying until everthing is valid 😅</span>
        </form>
    </div>`);
    }
    
    bindFormAddProduct(handler){
        $('#bFormAddP').click(function(event){
            handler();
        })
    }
    bindFormRemoveProduct(handler){
        $('#bFormRemP').click(function(event){
            handler();
        })
    }
    bindFormAddCategory(handler){
        $('#bFormAddC').click(function(event){
            handler();
        })
    }
    bindFormRemoveCategory(handler){
        $('#bFormRemC').click(function(event){
            handler();
        })
    }
    //STORE
    bindFormAddStore(handler){
        $('#bFormAddS').click(function(event){
            handler();
        })
    }
    bindFormRemoveStore(handler){
        $(document).on('click','.bRemStore',(e)=>{
            handler($(e.target).closest($('.bRemStore')).get(0).dataset.store);
        })
    }

    //*VALIDACION

    bindValidAddStore(handler){
        $(document).on('submit','#formAddStore',(event)=>{
            const cifForm = document.getElementById('cifForm');
            const nameForm = document.getElementById('nameForm');
            const addressForm = document.getElementById('addressForm');
            const phoneForm = document.getElementById('phoneForm');
            const coordsForm = document.getElementById('coordsForm');
            const imgForm = document.getElementById('imgForm');

            this.validateInputsAddStore();
            if(!validCif || !validName || !validAddress 
            || !validPhone || !validImg || !validCoords){
                event.preventDefault();
                event.stopPropagation();
            }else{
                event.preventDefault();
                event.stopPropagation();
                setTimeout(
                    handler(cifValue,nameValue,addressValue,
                        phoneValue,coordsValue,imgValue),
                    3000
                );
            }
        });
    }


    
    //*METODOS INTERNOS PARA VALIDACION

    setError(element,message){
        let inputControl = element.parentElement;
        let error = inputControl.querySelector('.error');
    
        error.innerText = message;
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
    
    setSuccess(element){
        let inputControl = element.parentElement;
        let error = inputControl.querySelector('.error');
    
        error.innerText = '';
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    
    //*VALIDACION INPUTS DE ADDSTORE

    validateInputsAddStore(){
        cifValue = cifForm.value;
        nameValue = nameForm.value;
        addressValue = addressForm.value;
        phoneValue = phoneForm.value;
        coordsValue = coordsForm.value;
        imgValue = imgForm.files.item(0).name;
    
        
        if(cifValue === ''){
            this.setError(cifForm,'Cif is required');
        }else if(!(/([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/g.test(cifValue))){
            this.setError(cifForm,'Invalid cif format');
        }else{
            this.setSuccess(cifForm);
            validCif = true;
        }
    
        if(nameValue === " "){
            this.setError(nameForm,"Name is required");
        }else if(nameValue.legth < 2 || nameValue.legth > 20){
            this.setError(nameForm,"Invalid length");
        }else{
            this.setSuccess(nameForm);
            validName = true;
        }
    
        if(addressValue === " "){
            this.setError(addressForm,"Address is required");
        }else if(addressValue.length < 2 || addressValue.legth > 50){
            this.setError(addressForm,"Invalid length");
        }else{
            this.setSuccess(addressForm);
            validAddress = true;
        }
    
        if(phoneValue === " "){
            this.setError(phoneForm,"Phone is required");
        }else if(!(/^[679]{1}[0-9]{8}$/.test(phoneValue))){
            this.setError(phoneForm,"Phone is not valid");
        }else{
            this.setSuccess(phoneForm);
            validPhone = true;
        }
    
        if(coordsValue === " "){
            this.setError(coordsForm,"Coord is required");
        }else{
            this.setSuccess(coordsForm);
            validCoords = true;
        }
    
    
        if(!(/(\.jpg|\.jpeg|\.png)$/i).test(imgValue)){
            this.setError(imgForm,"Image is not valid");
        }else{
            this.setSuccess(imgForm);
            validImg = true;
        }
    }

    //fin view class
}