


// const formAddStore = document.getElementById('formAddStore');
// const cifForm = document.getElementById('cifForm');

$(document).on('submit','#formAddStore',(event)=>{
    event.preventDefault();
    const cifForm = document.getElementById('cifForm');
    validateInputs();

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


function validateInputs(){
    let cifValue = cifForm.value;
    
    if(cifValue === ''){
        setError(cifForm,'Cif es requerido');
    }else if(!(/([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/g.test(cifValue))){
        setError(cifForm,'Formato cif invalido');
    }else{
        setSuccess(cifForm);
    }
}