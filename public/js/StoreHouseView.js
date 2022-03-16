export default class StoreHouseView{
    constructor() {
        this.main = $('#main');
    }


    showStores(query){
        this.main.empty();
        for (let data of query.stores) {
            this.main.append(`<div class="card" id="${data.store.cif}" style="width: 18rem;">
            <img src="${data.store.img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.store.name}</h5>
              <p class="card-text">${data.store.address}</p>
              <a href="#" class="btn btn-primary bProds">Productos</a>
            </div>
          </div>`);
        }
    }

    showDiwCarousel(){
        this.main.empty();
        this.main.append(`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../../public/media/exprimidor.jpg" class="d-block w-100" alt="item1">
          </div>
          <div class="carousel-item">
            <img src="../../public/media/iphone13.jpg" class="d-block w-100" alt="item2">
          </div>
          <div class="carousel-item">
            <img src="../../public/media/xps.jpg" class="d-block w-100" alt="item3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`);
    }

    showWebMap(){
      this.main.empty();
      this.main.append(`<section style="color:white; ">
      <ul style="list-style-type: none;">
          <li id="bInicio">Tiendas
            <ul style="list-style-type: none;">
              <li class="bProds">Productos en tienda</li>
            </ul>
          </li>
          <li >Categorias
            <ul style="list-style-type: none;">
              <li class="bProds">Productos en categoria </li>
            </ul>
          </li>
          <li id="bAbout"> About us </li>
          <li id="bWebMap"> Site map </li>
          <li id="bMaps"> Google maps </li>
      </ul>
  </section>`);
    }

    showGoogleMaps(){
      this.main.empty();
      this.main.append(`<iframe style="margin-left: 10vw;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24810.25042811446!2d-3.9444975433919707!3d38.98607579993743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6bdcb33d97174d%3A0xefaf23e8b1e79c2b!2sCiudad%20Real%2C%20Cdad.%20Real!5e0!3m2!1ses!2ses!4v1647463584819!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
    }

    bindStores(handler){
        $(document).ready((e) => {
            handler();
        })

        $('#bInicio').click((e)=>{
            handler();
        })

        $(document).on('click','#bInicio',(e)=>{
          handler();
      })
    }

    diwBindCarousel(handler){
        $('#main').on('click','.bProds',function(){
            handler();
        })
    }

    bindWebMap(handler){
      // $(document).click('click','#bWebMap',(e)=>{
      //   handler();
      // })
      $('#bWebMap').click((e)=>{
        handler();
      })
    }

    bindGoogleMaps(handler){
      // $(document).on('click','#bMaps',(e)=>{
      //   handler();
      // });

      $('#bMaps').click((e)=>{
        handler();
      })
    }
}