$('.clients-carousel').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 450,
    margin: 30,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        991: {
            items: 2
        },
        1200: {
            items: 2
        },
        1920: {
            items: 2
        }
    }
});


/* API FORMULÁRIO */
const password = document.getElementById('senha'); //olhinho
const icon = document.getElementById('icon');  //olhinho
const confirmpassword = document.getElementById('confirmesenha'); //olhinho
const icon2 = document.getElementById('icon2'); //olhinho

//api cep

const addressForm = document.querySelector('#address-form');
const cepInput = document.querySelector('#cep');
const addressInput = document.querySelector('#address');
const cityInput = document.querySelector('#city');
const neighborhoodInput = document.querySelector('#neighborhood');
const regionInput = document.querySelector('#region');
const formInputs = document.querySelectorAll('[data-input]');

const closeButton = document.querySelector('#close-message');

const fadeElement = document.querySelector("#fade");

//validação de CEP no input

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);

    // permitir apenas números
    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

//ativar o evento do endereço

cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    //verificamos se está correto
    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});

//obter o endereço pelo API

const getAddress = async (cep) => {
    toggleLoader();
    
    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    //verificar se o cep está errado

    if(data.erro === "true"){
        if(!adrressInput.hasAttribute("disabled")){
            toggleDisabled();
        }
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente.");
        return;
    }

    if(addressInput.value === ""){
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

const toggleDisabled = () =>{
    if(regionInput.hasAttribute("disabled")){
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        })
    }else{
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        })
    }
}

//ocultar ou exibir o loader

const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

//exibir a mensagem

const toggleMessage = (msg) =>{
    const messageElement = document.querySelector("#message");

    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;
    
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
}

closeButton.addEventListener("click", () => toggleMessage());

addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    toggleLoader();

    setTimeout(() => {

        toggleLoader();

        toggleMessage("Cadastro realizado com sucesso!");

        addressForm.reset();

        toggleDisabled();

    }, 1500);
});



/*olhinho*/

function showHide(){
    if(password.type === 'password'){
        password.setAttribute('type','text');
        icon.classList.add('fechado')
    }
    else{
        password.setAttribute('type', 'password');
        icon.classList.remove('fechado')
    }
}

function showHide2(){
    if(confirmpassword.type === 'password'){
        confirmpassword.setAttribute('type','text');
        icon2.classList.add('fechado2')
    }
    else{
        confirmpassword.setAttribute('type', 'password');
        icon2.classList.remove('fechado2')
    }
}




