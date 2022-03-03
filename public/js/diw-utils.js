let provSel = $('#validationCustom07');
const PROVS = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];


$(document).ready(function(e){
    $('#pagoContainer').hide();
    $('#userlogo').hide();
    provSel.empty();
    provSel.append(`<option selected disabled value="">--PROVINCIAS--</option>`)
   for (let prov of PROVS) {
       provSel.append(`<option value="${prov}">${prov}</option>`);
   }
});

$('#inlineRadio1').click(function(){
    $('#pagoContainer').hide();
});

$('#inlineRadio2').click(function(){
    $('#pagoContainer').show();
});

$('#bRegister').click(function(){
    $('#bLoginForm').hide();
    $('#bRegisterForm').hide();
    $('#userlogo').show();
})
if($('#progressBar').val() == '100'){
    $('#bRegister').prop('disabled',false);
}


$('#progressBar').change(function(){
    
})

// $('#validationCustom01').change(function(){
//     let input = $('#validationCustom01').val();
//     if(!(input).match(/([A-Z]){1}([a-z]){2,}\w/g)){
//         $('#validationCustom01').css('border','2px solid green');

//     }else{
//         $('#validationCustom01').css('border','2px solid red');
//     }

// })


$('form').submit(function (evt) {
    evt.preventDefault(); //prevents the default action
  })
 

