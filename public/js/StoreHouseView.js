import {Clothes} from "../../database/entities/Clothes.js";

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
        this.main.append(`    <div class="container" style="color: white;">
        <form action="" id="formAddStore">
            <div class="input-control col-md-4">
                <label for="cifForm">Cif: </label>
                <input class ="form-control" type="text" name="cifForm" id="cifForm">
                <div class="error"></div>
            </div>
            <button type="submit" class="btn btn-primary">Add</button> 
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
    bindFormAddStore(handler){
        $('#bFormAddS').click(function(event){
            handler();
        })
    }
    
}


/**
 * <form name="fValidation" role="form">
				<!-- Requiered -->
				<div class="form-row">
					<div class="col-md-4 mb-3">
						<label for="vfName">Nombre *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="namePrepend"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" class="form-control" id="vfName" name="vfName" placeholder="Nombre"
								aria-describedby="namePrepend" value="" required>
							<div class="invalid-feedback">El nombre es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfSurname1">Primer apellido *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="surname1Prepend"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" class="form-control" id="vfSurname1" name="vfSurname1"
								placeholder="Segundo apellido" aria-describedby="surname1Prepend" value="" required>
							<div class="invalid-feedback">El primer apellido es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfSurname2">Segundo apellido</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="surname2Prepend"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" class="form-control" id="vfSurname2" name="vfSurname2"
								placeholder="Segundo apellido" aria-describedby="surname2Prepend" value="">
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>
				<!-- Tipos de datos -->
				<div class="form-row">
					<div class="col-md-3 mb-3">
						<label for="vfBirth">Fecha de nacimiento *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="birthPrepend"><i class="fas fa-calendar-alt"></i></span>
							</div>
							<input type="date" class="form-control" id="vfBirth" name="vfBirth"
								aria-describedby="birthPrepend" value="" required>
							<div class="invalid-feedback">La fecha de nacimiento es incorrecta.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-3 mb-3">
						<label for="vfEmail">Correo electrónico *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="emailPrepend"><i
										class="fas fa-envelope-open-text"></i></span>
							</div>
							<input type="email" class="form-control" id="vfEmail" name="vfEmail" placeholder="test@test.es"
								aria-describedby="emailPrepend" value="" required>
							<div class="invalid-feedback">El formato del correo electrónico no es correcto.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-3 mb-3">
						<label for="vfUrl">URL *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="urlPrepend"><i
										class="fas fa-envelope-open-text"></i></span>
							</div>
							<input type="url" class="form-control" id="vfUrl" name="vfUrl" placeholder="http://www.test.es"
								aria-describedby="urlPrepend" value="" required>
							<div class="invalid-feedback">La URL no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-3 mb-3">
						<label for="vfNumber">Número entre 1 y 10. *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="numberPrepend"><i
										class="fas fa-sort-numeric-up-alt"></i></span>
							</div>
							<input type="number" class="form-control" id="vfNumber" name="vfNumber"
								aria-describedby="numberPrepend" value="" required min="1" max="10">
							<div class="invalid-feedback">El número debe ser positivo entre 1 y 10.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>
				<!-- Patrones -->
				<div class="form-row">
					<div class="col-md-4 mb-3">
						<label for="vfDni">DNI *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="dniPrepend"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" class="form-control" id="vfDni" name="vfDni" placeholder="12345678A"
								aria-describedby="dniPrepend" value="" required maxlength="9" pattern="^[0-9]{8}[A-Z]$">
							<div class="invalid-feedback">El DNI debe estar formado por 8 digitos y una letra.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfPhone">Teléfono *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="phonePrepend"><i class="fas fa-phone"></i></span>
							</div>
							<input type="text" class="form-control" id="vfPhone" name="vfPhone" placeholder="(6-9)XXXXXXXX"
								aria-describedby="phonePrepend" value="" required maxlength="9" pattern="^[96][0-9]{8}$">
							<div class="invalid-feedback">El número de teléfono debe ser un móvil o un fijo.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfCreditCard">Tarjeta de crédito *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="cardPrepend"><i class="fas fa-phone"></i></span>
							</div>
							<input type="text" class="form-control" id="vfCreditCard" name="vfCreditCard"
								placeholder="XXXX XXXX XXXX XXXX" aria-describedby="cardPrepend" value="" required maxlength="19"
								pattern="^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$">
							<div class="invalid-feedback">La tarjeta de crédito no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>
				<!-- Contraseñas -->
				<div class="form-row">
					<div class="col-md-6 mb-3">
						<label for="vfPwd">Contraseña *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="pwdPrepend"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" class="form-control" id="vfPwd" name="vfPwd"
								aria-describedby="pwdPrepend" value="" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" required>
							<div class="invalid-feedback">La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="vfConfirm">Confirmación de contraseña *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="confirmPrepend"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" class="form-control" id="vfConfirm" name="vfConfirm"
								aria-describedby="confirmPrepend" value="" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" required>
							<div class="invalid-feedback">La contraseña y la confirmación deben ser iguales.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>
				<!-- Otros tipos de datos -->
				<div class="form-group">
					<label for="vfFile">Adjunta imagen con extenxión jpg, png o gif. *</label>
					<div class="custom-file">
						<input type="file" class="custom-file-input" id="vfFile" name="vfFile" required>
						<label class="custom-file-label" for="file">Elige archivo</label>
						<div class="invalid-feedback">Debe seleccionar un archivo con extensión jpg, png o gif.</div>
						<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="form-group">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="" id="vfTerms" name="vfTerms" required>
						<label class="form-check-label" for="vfTerms">
							Acepta los términos de uso.
						</label>
						<div class="invalid-feedback">Debe aceptar los términos de uso.</div>
						<div class="valid-feedback">Correcto.</div>
					</div>
				</div>

				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</form>
 */