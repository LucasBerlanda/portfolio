// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

class FormSubmit {
  
  constructor(){
    this.form =  document.getElementById("form-contato");
    this.formButton = document.getElementById("enviar");
    this.mensagem = document.getElementById("mensagem");
    this.mensagemSucesso = document.getElementById("msg-success");
    this.mensagemErro = document.getElementById("msg-error");
    this.btnVoltarForm = document.getElementById("btn-voltar-form");
    this.url = "https://api.staticforms.xyz/submit";
    this.init();
  }

  displaySuccess(){
    this.form.style.display = "none";
    this.mensagem.style.display = "block";
    this.mensagemSucesso.style.display = "block";
  }

  displayError(){
    this.form.style.display = "none";
    this.mensagem.style.display = "block";
    this.mensagemErro.style.display = "block";
  }

  backToForm(){
    this.form.style.display = "block";
    this.mensagem.style.display = "none";
    this.mensagemSucesso.style.display = "none";
    this.mensagemErro.style.display = "none";

    const fields = this.form.querySelectorAll('[name]');
    fields.forEach((campo) => {
      if(campo.getAttribute('name') != "accessKey"){
        campo.value = "";
      }
    });
    this.formButton.innerText = "Enviar";
  }

  getFormObject(){
    const formObject = {};
    const fields = this.form.querySelectorAll('[name]');
    fields.forEach((campo) => {
      formObject[campo.getAttribute('name')] = campo.value;
    });
    return formObject;
  }

  onSubmission(event){
    event.preventDefault();
    event.target.disable = true;
    event.target.innerText = "Enviando..."
  }

  isFormularioValido(){
    let dadosValidos = true;
    const fields = this.form.querySelectorAll('[name]');
    fields.forEach((campo) => {
      if(campo.value === ""){
        dadosValidos = false;
      }
    });
    return dadosValidos;
  }

  async sendForm(event){
    if(this.isFormularioValido()){
      try{
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject())
        });
        this.displaySuccess();
      }catch(error){
        this.displayError();
        console.log(error);
      } 
    } 
  }

  init(){
    this.formButton.addEventListener("click", (event) => this.sendForm(event));
    this.btnVoltarForm.addEventListener("click", () => this.backToForm()); 

  }

}

const formSubmit = new FormSubmit();