'use strict';
//https://www.youtube.com/watch?v=CYlNJpltjMM el como validar lo he sacado de aqui
//ya que estaba teniendo mucho lio con las validaciones realizadas en clase

// const formAddStore = document.getElementById('formAddStore');
// const cifForm = document.getElementById('cifForm');

$(document).on('submit','#formAddStore',(event)=>{
    const cifForm = document.getElementById('cifForm');
    const nameForm = document.getElementById('nameForm');
    const addressForm = document.getElementById('addressForm');
    const phoneForm = document.getElementById('phoneForm');
    const coordsForm = document.getElementById('coordsForm');
    const imgForm = document.getElementById('imgForm');
    const validCif = false;
    const validName = false;
    const validAddress = false;
    const validPhone = false;
    const validImg = false;
    const validCoords = false;
    if(!validCif || !validName || !validAddress 
    || !validPhone || !validImg || !validCoords){
        event.preventDefault();
        event.stopPropagation();
    }else{
        
    }
    validateInputsAddStore();
})
// formAddStore.addEventListener('submit',(event) => {
   
// })

function setError(element,message){
    let inputControl = element.parentElement;
    let error = inputControl.querySelector('.error');

    error.innerText = message;
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
}

function setSuccess(element){
    let inputControl = element.parentElement;
    let error = inputControl.querySelector('.error');

    error.innerText = '';
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
}


function validateInputsAddStore(){
    const cifValue = cifForm.value;
    const nameValue = nameForm.value;
    const addressValue = addressForm.value;
    const phoneValue = phoneForm.value;
    const coordsValue = coordsForm.value;
    const imgValue = imgForm.value;

    
    if(cifValue === ''){
        setError(cifForm,'Cif is required');
    }else if(!(/([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/g.test(cifValue))){
        setError(cifForm,'Invalid cif format');
    }else{
        setSuccess(cifForm);
        validCif = true;
    }

    if(nameValue === " "){
        setError(nameForm,"Name is required");
    }else if(nameValue.legth < 2 || nameValue.legth > 20){
        setError(nameForm,"Invalid length");
    }else{
        setSuccess(nameForm);
        validName = true;
    }

    if(addressValue === " "){
        setError(addressForm,"Address is required");
    }else if(addressValue.length < 2 || addressValue.legth > 50){
        setError(addressForm,"Invalid length");
    }else{
        setSuccess(addressForm);
        validAddress = true;
    }

    if(phoneValue === " "){
        setError(phoneForm,"Phone is required");
    }else if(!(/^[679]{1}[0-9]{8}$/.test(phoneValue))){
        setError(phoneForm,"Phone is not valid");
    }else{
        setSuccess(phoneForm);
        validPhone = true;
    }

    if(coordsValue === " "){
        setError(coordsForm,"Coord is required");
    }else{
        setSuccess(coordsForm);
        validCoords = true;
    }


    if(!(/(\.jpg|\.jpeg|\.png)$/i).test(imgValue)){
        setError(imgForm,"Image is not valid");
    }else{
        setSuccess(imgForm);
        validImg = true;
    }

}