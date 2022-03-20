import {Clothes} from "../../database/entities/Clothes.js";
//https://www.youtube.com/watch?v=CYlNJpltjMM el como validar lo he sacado de aqui
//ya que estaba teniendo mucho lio con las validaciones realizadas en clase
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

        //* VARS ADD CAT
        let validTitle = false;
        let validDesc = false;
        let titleValue;
        let descValue;

        //* VARS ADD PERFUME

        let validProdSN = false;
        let validProdName = false;
        let validProdDesc = false;
        let validProdPrice = false;
        let validProdTax = false;
        let validProdImg = false;
        let validProdOdor = false;
        let validProdGender = false;
        let serialNumberValue;
        let nameProdValue;
        let descProdValue;
        let priceValue;
        let taxValue;
        let imgProdValue;
        let odorValue;
        let genderValue;
        let validChecks;


        //* VARS ADD CLOTHE
        let validProdSize = false;
        let validProdColor = false;
        let sizeValue;
        let colorValue;

        //* VARS ADD SMARTWATCH
        let validModel = false;
        let validSphere = false;
        let validBand = false;
        let modelValue;
        let sphereValue;
        let bandValue;


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
              <!--<a class="btn btn-danger bRemStore" data-store="${data.store.cif}" >Eliminar Tienda</a>-->
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
              <a class="btn btn-danger bRemProd" value="${data.product.serialNumber}">Eliminar</a>
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
        <form action="" id="formAddStore" method="POST" enctype=multipart/form-data>
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

    showFormRemoveStore(query){
        this.main.empty();
        this.main.append(`<div id="a" class="container">
            <select id="StoreToDelete">`);
            for (let shop of query.stores) {
                if(!(shop.store.cif === "H92482892")){
                    $('#StoreToDelete').append(`<option class="optDelStore" value="${shop.store.cif}">${shop.store.name}</option>`);
                }
              
            }
            this.main.append(`</select>
        </div>`);
        $('#a').append(` <button class="btn btn-danger" type="button" id="bDeleteStore">Borrar</button>`)
    }

    showFormAddCategory(){
        this.main.empty();
        this.main.append(`<div class="container" style="color: white;">
        <form action="" id="formAddCategory" method="POST" enctype=multipart/form-data>
            <div class="input-control col-md-4">
                <label for="titleForm">Title: </label>
                <input class ="form-control" type="text" name="titleForm" id="titleForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="descForm">Description: </label>
                <input class ="form-control" type="text" name="descForm" id="descForm">
                <div class="error"></div>
            </div>

            <button type="submit" class="btn btn-success">Add</button> <span>Keep trying until everthing is valid 😅</span>
        </form>
    </div>`);
    }
    
    showFormAddProduct(type,data){
        this.main.empty();
        if(type == "Perfume"){
            this.main.append(`<div class="container" style="color: white;">
        <form action="" id="formAddPerfume" method="POST" enctype=multipart/form-data>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="serialNumberForm">Serial Number: </label>
                <input class ="form-control" type="text" name="titleForm" id="serialNumberForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="nameProdForm">Nombre: </label>
                <input class ="form-control" type="text" name="descForm" id="nameProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="descProdForm">Description: </label>
                <input class ="form-control" type="text" name="descForm" id="descProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="priceForm">Price: </label>
                <input class ="form-control" type="number" name="descForm" id="priceForm">
                <div class="error"></div>
            </div>
            </div>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="taxForm">Tax: </label>
                <input class ="form-control" type="number" name="descForm" id="taxForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="imgProdForm">Img: </label>
                <input class ="form-control" type="file" name="imgForm" id="imgProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="odorForm">Odor: </label>
                <input class ="form-control" type="text" name="descForm" id="odorForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="genderForm">Gender: </label>
                <input class ="form-control" type="text" name="descForm" id="genderForm">
                <div class="error"></div>
            </div>
            </div>
            
            <div id="checksId" class="input-control col-md-4 checks">
            
            </div>
            
            <button type="submit" class="btn btn-success bAddProd">Add</button> <span>Keep trying until everthing is valid 😅</span>
        </form>
    </div>`);

    for (let cat of data.categories) {
        $('#checksId').append(`<input type="checkbox" class="form-check-input catToAdd" name="catToAdd" value="${cat.category.title}" />${cat.category.title}<br><br>`)
    
    }
        }
        if(type == "Clothes"){
            this.main.append(`<div class="container" style="color: white;">
        <form action="" id="formAddClothes" method="POST" enctype=multipart/form-data>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="serialNumberForm">Serial Number: </label>
                <input class ="form-control" type="text" name="titleForm" id="serialNumberForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="nameProdForm">Nombre: </label>
                <input class ="form-control" type="text" name="descForm" id="nameProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="descProdForm">Description: </label>
                <input class ="form-control" type="text" name="descForm" id="descProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="priceForm">Price: </label>
                <input class ="form-control" type="number" name="descForm" id="priceForm">
                <div class="error"></div>
            </div>
            </div>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="taxForm">Tax: </label>
                <input class ="form-control" type="number" name="descForm" id="taxForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="imgProdForm">Img: </label>
                <input class ="form-control" type="file" name="imgForm" id="imgProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="sizeForm">Size: </label>
                <input class ="form-control" type="text" name="descForm" id="sizeForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="colorForm">Color: </label>
                <input class ="form-control" type="text" name="descForm" id="colorForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="genderForm">Gender: </label>
                <input class ="form-control" type="text" name="descForm" id="genderForm">
                <div class="error"></div>
            </div>
            </div>
            <div class="row">
            <div id="checksId" class="input-control col-md-4 checks">`);
            for (let cat of data.categories) {
                $('#checksId').append(`<input type="checkbox" class="form-check-input catToAdd" name="catToAdd" value="${cat.category.title}" />${cat.category.title}<br><br>`)
            }
           $('#formAddClothes').append(`</div>
            </div>
            <button type="submit" class="btn btn-success bAddProd">Add</button> <span>Keep trying until everthing is valid 😅</span>
        </form>
    </div>`);

        }
        if(type == "SmartWatch"){
            this.main.append(`<div class="container" style="color: white;">
        <form action="" id="formAddSmartWatch" method="POST" enctype=multipart/form-data>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="serialNumberForm">Serial Number: </label>
                <input class ="form-control" type="text" name="titleForm" id="serialNumberForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="nameProdForm">Nombre: </label>
                <input class ="form-control" type="text" name="descForm" id="nameProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="descProdForm">Description: </label>
                <input class ="form-control" type="text" name="descForm" id="descProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="priceForm">Price: </label>
                <input class ="form-control" type="number" name="descForm" id="priceForm">
                <div class="error"></div>
            </div>
            </div>
            <div class="row">
            <div class="input-control col-md-4">
                <label for="taxForm">Tax: </label>
                <input class ="form-control" type="number" name="descForm" id="taxForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="imgProdForm">Img: </label>
                <input class ="form-control" type="file" name="imgForm" id="imgProdForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="modelForm">Model: </label>
                <input class ="form-control" type="text" name="descForm" id="modelForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="sphereForm">Sphere: </label>
                <input class ="form-control" type="text" name="descForm" id="sphereForm">
                <div class="error"></div>
            </div>

            <div class="input-control col-md-4">
                <label for="bandForm">Band: </label>
                <input class ="form-control" type="text" name="descForm" id="bandForm">
                <div class="error"></div>
            </div>
            </div>
            <div class="row">
            <div id="checksId" class="input-control col-md-4 checks">`);
            for (let cat of data.categories) {
                $('#checksId').append(`<input type="checkbox" class="form-check-input catToAdd" name="catToAdd" value="${cat.category.title}" />${cat.category.title}<br><br>`)
            }
           $('#formAddSmartWatch').append(`</div>
            </div>
            <button type="submit" class="btn btn-success bAddProd">Add</button> <span>Keep trying until everthing is valid 😅</span>
        </form>
    </div>`);
        }
        
    }

    showTypesProds(){
        this.main.empty();
        this.main.append(`<div class="container">
            <select id="TypeProdS">
                <option class="bFormAddP" value="Perfume">Perfume</option>
                <option class="bFormAddP" value="Clothes">Clothe</option>
                <option class="bFormAddP" value="SmartWatch">SmartWatch</option>
            </select>
        </div>`);
    }

    showFormRemoveCat(data){
        this.main.empty();
        this.main.append(`<div id="b" class="container">
            <select id="CategoryToDelete">`);
            for (let cat of data.categories) {
                if(!(cat.category.title === "Def")){
                    $('#CategoryToDelete').append(`<option class="optCat" value="${cat.category.title}">${cat.category.title}</option>`);
                }
              
            }
            this.main.append(`</select>
        </div>`);
        $('#b').append(` <button class="btn btn-danger" type="button" id="bDeleteCategory">Borrar</button>`)
    }
    showFormRemoveProd(data){
        this.main.empty();
        this.main.append(`<div class="container" id="aa">
        <select id="selectProdsDel">`);
        for (let c of data.categories) {
            for (let p of c.products) {
                $('#selectProdsDel').append(`<option value="${p.product.serialNumber}">${c.category.title} --> ${p.product.name}</option>`)
            }
        }
        this.main.append(`</select></div>`);
        $('#aa').append(`<button type="button" class="btn btn-danger" id="bRemoveProd">Delete</button>`)
    }

    //! DONE
    bindTypeAddProduct(handler){
        $('#bTypeAddP').click(function(event){
            handler();
        })
    }

    //! DONE
    bindFormAddProduct(handler){
        $(document).on('click','.bFormAddP',function(event){
            handler($(this).attr("value"));
        })
    }

    bindFormRemoveProduct(handler){
       $('#bFormRemP').click(function(e){
           handler();
       })
    }
    bindRemoveProductBtn(handler){
        $(document).on('click','#bRemoveProd',function(event){
            handler($('#selectProdsDel').val());
        })
    }
    //! DONE
    bindFormAddCategory(handler){
        $('#bFormAddC').click(function(event){
            handler();
        })
    }
    //? MAIL PAB
    bindFormRemoveCategory(handler){
        $('#bFormRemC').click(function(event){
            handler();
        })
    }
    bindRemoveCategory(handler){
        $(document).on('click','#bDeleteCategory',function(){
            handler($('#CategoryToDelete').val())
        })
    }
    //STORE //! DONE
    bindFormAddStore(handler){
        $('#bFormAddS').click(function(event){
            handler();
        })
    }
    //? MAIL PAB
    bindFormRemoveStore(handler){
        $(document).on('click','#bFormRemS',(e)=>{
            //$(e.target).closest($('#bFormRemS')).get(0).dataset.store
            handler();
        })
    }
    bindRemoveStore(handler){
        $(document).on('click','#bDeleteStore',(e)=>{

        handler($('#StoreToDelete').val())
        });
    }

    //*VALIDACION
    bindValidAddPerfume(handler){
        $(document).on('submit','#formAddPerfume',(event)=>{
            var serialNumberForm = document.getElementById('serialNumberForm');
            var nameProdForm = document.getElementById('nameProdForm');
            var descProdForm = document.getElementById('descProdForm');
            var priceForm = document.getElementById('priceForm');
            var taxForm = document.getElementById('taxForm');
            var imgProdForm = document.getElementById('imgProdForm');
            var odorForm = document.getElementById('odorForm');
            var genderForm = document.getElementById('genderForm');

           

            
            event.preventDefault();
            event.stopPropagation();
            
            this.validateInputsAddPerfume();

            if(validProdSN && validProdName && validProdDesc 
            && validProdPrice && validProdTax && validProdImg
            && validProdOdor && validProdGender){
                

                let checks = document.querySelectorAll('div.checks input[name="catToAdd"]');
                let val = [];

               
                checks.forEach((e)=>{
                    if(e.checked) val.push(e.value);
                });
               
                setTimeout(
                    handler(serialNumberValue,nameProdValue,descProdValue,priceValue,
                        taxValue,imgProdValue,odorValue,genderValue,val),
                    3000
                );
            }
        });
    }
    bindValidAddClothe(handler){
        $(document).on('submit','#formAddClothes',(event)=>{
            var serialNumberForm = document.getElementById('serialNumberForm');
            var nameProdForm = document.getElementById('nameProdForm');
            var descProdForm = document.getElementById('descProdForm');
            var priceForm = document.getElementById('priceForm');
            var taxForm = document.getElementById('taxForm');
            var imgProdForm = document.getElementById('imgProdForm');
            var sizeForm = document.getElementById('sizeForm');
            var odorForm = document.getElementById('colorForm');
            var genderForm = document.getElementById('genderForm');

            event.preventDefault();
            event.stopPropagation();
            
            this.validateInputsAddClothe();

            if(validProdSN && validProdName && validProdDesc 
            && validProdPrice && validProdTax && validProdImg
            && validProdSize && validProdGender && validProdColor){
                
                
                let checks = document.querySelectorAll('div.checks input[name="catToAdd"]');
                let val = [];

               
                checks.forEach((e)=>{
                    if(e.checked) val.push(e.value);
                });

                setTimeout(
                    handler(serialNumberValue,nameProdValue,descProdValue,priceValue,
                        taxValue,imgProdValue,sizeValue,colorValue,genderValue,val),
                    3000
                );
            }
        });
    }

    bindValidAddSmartWatch(handler){
        $(document).on('submit','#formAddSmartWatch',(event)=>{
            var serialNumberForm = document.getElementById('serialNumberForm');
            var nameProdForm = document.getElementById('nameProdForm');
            var descProdForm = document.getElementById('descProdForm');
            var priceForm = document.getElementById('priceForm');
            var taxForm = document.getElementById('taxForm');
            var imgProdForm = document.getElementById('imgProdForm');
            var modelForm = document.getElementById('modelForm');
            var sphereForm = document.getElementById('sphereForm');
            var bandForm = document.getElementById('bandForm');

            event.preventDefault();
            event.stopPropagation();
            
            this.validateInputsAddSphere();

            if(validProdSN && validProdName && validProdDesc 
            && validProdPrice && validProdTax && validProdImg
            && validModel && validSphere && validBand){
                
                
                let checks = document.querySelectorAll('div.checks input[name="catToAdd"]');
                let val = [];

               
                checks.forEach((e)=>{
                    if(e.checked) val.push(e.value);
                });

                setTimeout(
                    handler(serialNumberValue,nameProdValue,descProdValue,priceValue,
                        taxValue,imgProdValue,modelValue,sphereValue,bandValue,val),
                    3000
                );
            }
        });
    }


    bindValidAddStore(handler){
        $(document).on('submit','#formAddStore',(event)=>{
            var cifForm = document.getElementById('cifForm');
            var nameForm = document.getElementById('nameForm');
            var addressForm = document.getElementById('addressForm');
            var phoneForm = document.getElementById('phoneForm');
            var coordsForm = document.getElementById('coordsForm');
            var imgForm = document.getElementById('imgForm');

            event.preventDefault();
            event.stopPropagation();

            this.validateInputsAddStore();
            if(validCif && validName && validAddress 
            && validPhone && validImg && validCoords){
               
                setTimeout(
                    handler(cifValue,nameValue,addressValue,
                        phoneValue,coordsValue,imgValue),
                    3000
                );
            }
        });
    }

    bindValidAddCategory(handler){
        $(document).on('submit','#formAddCategory',(event)=>{
            var titleForm = document.getElementById('titleForm');
            var descForm = document.getElementById('descForm');

            event.preventDefault();
            event.stopPropagation();

            this.validateInputsAddCategory();
            if(validTitle && validDesc){
                setTimeout(
                    handler(titleValue,descValue),
                    3000
                );
            }
        })
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
    //* VALIDACION INPUTS DE ADDSMARTWATCH
    validateInputsAddSphere(){
        serialNumberValue = serialNumberForm.value;
        nameProdValue = nameProdForm.value;
        descProdValue = descProdForm.value;
        priceValue = priceForm.value;
        taxValue = taxForm.value;
        modelValue = modelForm.value;
        sphereValue = sphereForm.value;
        bandValue = bandForm.value;

        
        if(imgProdForm.value != ""){
            imgProdValue = imgProdForm.files.item(0).name;
        }else{
            imgProdValue = "";
        }


        if(!serialNumberValue){
            this.setError(serialNumberForm,'SerialNumber can not be empty');

        }else{
            this.setSuccess(serialNumberForm);
            validProdSN = true;
        }

        if(!nameProdValue){
            this.setError(nameProdForm,'Name can not be empty');

        }else{
            this.setSuccess(nameProdForm);
            validProdName = true;
        }

        if(!descProdValue){
            this.setError(descProdForm,'Description can not be empty');

        }else{
            this.setSuccess(descProdForm);
            validProdDesc = true;
        }

        if(!priceValue){
            this.setError(priceForm,'Price can not be empty');

        }else if(Number.parseFloat(priceValue) <= 0){
            this.setError(priceForm,'Price must be bigger than 0');

        }else{
            this.setSuccess(priceForm);
            validProdPrice = true;
        }

        if(!taxValue){
            this.setError(taxForm,'Tax can not be empty');

        }else if(Number.parseInt(taxValue) <= 0){
            this.setError(taxForm,'Tax must be bigger than 0');

        }else{
            this.setSuccess(taxForm);
            validProdTax = true;
        }

        if(!modelValue){
            this.setError(modelForm,'Color can not be empty');
        }else{
            this.setSuccess(modelForm);
            validModel = true;
        }

        if(!sphereValue){
            this.setError(sphereForm,'Size can not be empty');

        }else{
            this.setSuccess(sphereForm);
            validSphere = true;
        }

        if(!bandValue){
            this.setError(bandForm,'Gender can not be empty');

        }else{
            this.setSuccess(bandForm);
            validBand = true;
        }

        if(!(/(\.jpg|\.jpeg|\.png|\.svg|\.jiff|\.gif)$/i).test(imgProdValue)){
            this.setError(imgProdForm,"Image is not valid");
        }else{
            this.setSuccess(imgProdForm);
            validProdImg = true;
        }
    }
    //* VALIDACION INPUTS DE ADDCLOTHE
    validateInputsAddClothe(){
        serialNumberValue = serialNumberForm.value;
        nameProdValue = nameProdForm.value;
        descProdValue = descProdForm.value;
        priceValue = priceForm.value;
        taxValue = taxForm.value;
        sizeValue = sizeForm.value;
        colorValue = colorForm.value;
        genderValue = genderForm.value;

        



        if(imgProdForm.value != ""){
            imgProdValue = imgProdForm.files.item(0).name;
        }else{
            imgProdValue = "";
        }


        if(!serialNumberValue){
            this.setError(serialNumberForm,'SerialNumber can not be empty');

        }else{
            this.setSuccess(serialNumberForm);
            validProdSN = true;
        }

        if(!nameProdValue){
            this.setError(nameProdForm,'Name can not be empty');

        }else{
            this.setSuccess(nameProdForm);
            validProdName = true;
        }

        if(!descProdValue){
            this.setError(descProdForm,'Description can not be empty');

        }else{
            this.setSuccess(descProdForm);
            validProdDesc = true;
        }

        if(!priceValue){
            this.setError(priceForm,'Price can not be empty');

        }else if(Number.parseFloat(priceValue) <= 0){
            this.setError(priceForm,'Price must be bigger than 0');

        }else{
            this.setSuccess(priceForm);
            validProdPrice = true;
        }

        if(!taxValue){
            this.setError(taxForm,'Tax can not be empty');

        }else if(Number.parseInt(taxValue) <= 0){
            this.setError(taxForm,'Tax must be bigger than 0');

        }else{
            this.setSuccess(taxForm);
            validProdTax = true;
        }

        if(!colorValue){
            this.setError(colorForm,'Color can not be empty');

        }else{
            this.setSuccess(colorForm);
            validProdColor = true;
        }
        if(!sizeValue){
            this.setError(sizeForm,'Size can not be empty');

        }else{
            this.setSuccess(sizeForm);
            validProdSize = true;
        }

        if(!genderValue){
            this.setError(genderForm,'Gender can not be empty');

        }else{
            this.setSuccess(genderForm);
            validProdGender = true;
        }

        if(!(/(\.jpg|\.jpeg|\.png|\.svg|\.jiff|\.gif)$/i).test(imgProdValue)){
            this.setError(imgProdForm,"Image is not valid");
        }else{
            this.setSuccess(imgProdForm);
            validProdImg = true;
        }

    }
    //* VALIDACION INPUTS DE ADDPERF
    validateInputsAddPerfume(){
        serialNumberValue = serialNumberForm.value;
        nameProdValue = nameProdForm.value;
        descProdValue = descProdForm.value;
        priceValue = priceForm.value;
        taxValue = taxForm.value;
        odorValue = odorForm.value;
        genderValue = genderForm.value;

        



        if(imgProdForm.value != ""){
            imgProdValue = imgProdForm.files.item(0).name;
        }else{
            imgProdValue = "";
        }


        if(!serialNumberValue){
            this.setError(serialNumberForm,'Serial Number can not be empty');

        }else{
            this.setSuccess(serialNumberForm);
            validProdSN = true;
        }

        if(!nameProdValue){
            this.setError(nameProdForm,'Name can not be empty');

        }else{
            this.setSuccess(nameProdForm);
            validProdName = true;
        }

        if(!descProdValue){
            this.setError(descProdForm,'Description can not be empty');

        }else{
            this.setSuccess(descProdForm);
            validProdDesc = true;
        }

        if(!priceValue){
            this.setError(priceForm,'Price can not be empty');

        }else if(Number.parseFloat(priceValue) <= 0){
            this.setError(priceForm,'Price must be bigger than 0');

        }else{
            this.setSuccess(priceForm);
            validProdPrice = true;
        }

        if(!taxValue){
            this.setError(taxForm,'Tax can not be empty');

        }else if(Number.parseInt(taxValue) <= 0){
            this.setError(taxForm,'Tax must be bigger than 0');

        }else{
            this.setSuccess(taxForm);
            validProdTax = true;
        }

        if(!odorValue){
            this.setError(odorForm,'Odor can not be empty');

        }else{
            this.setSuccess(odorForm);
            validProdOdor = true;
        }

        if(!genderValue){
            this.setError(genderForm,'Gender can not be empty');

        }else{
            this.setSuccess(genderForm);
            validProdGender = true;
        }

        if(!(/(\.jpg|\.jpeg|\.png|\.svg|\.jiff|\.gif)$/i).test(imgProdValue)){
            this.setError(imgProdForm,"Image is not valid");
        }else{
            this.setSuccess(imgProdForm);
            validProdImg = true;
        }

    }




    validateInputsAddCategory(){
        titleValue = titleForm.value;
        descValue = descForm.value;

        if(!titleValue){
            this.setError(titleForm,'Title can not be empty');
        }else if(titleValue.length < 2 || titleValue.length > 20){
            this.setError(titleForm,'Wrong length');
        }else{
            this.setSuccess(titleForm);
            validTitle = true;
        }

        if(descValue.length > 100){
            this.setError(descForm,'Max char length 100');
        }else{
            this.setSuccess(descForm);
            validDesc = true;
        }
    }


    //*VALIDACION INPUTS DE ADDSTORE

    validateInputsAddStore(){
        cifValue = cifForm.value;
        nameValue = nameForm.value;
        addressValue = addressForm.value;
        phoneValue = phoneForm.value;
        coordsValue = coordsForm.value;

        if(imgForm.value != ""){
            imgValue = imgForm.files.item(0).name;
        }else{
            imgValue = "";
        }
        
    
        
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
    
    
        if(!(/(\.jpg|\.jpeg|\.png|\.svg|\.jiff|\.gif)$/i).test(imgValue)){
            this.setError(imgForm,"Image is not valid");
        }else{
            this.setSuccess(imgForm);
            validImg = true;
        }
    }

    //fin view class
}