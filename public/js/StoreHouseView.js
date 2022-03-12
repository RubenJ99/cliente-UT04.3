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

    bindStores(handler){
        $(document).ready((e) => {
            handler();
        })

        $('#bInicio').click((e)=>{
            handler();
        })
    }

    diwBindCarousel(handler){
        $('#main').on('click','.bProds',function(){
            handler();
        })
    }

}