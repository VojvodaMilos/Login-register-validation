const registerView = document.querySelector("#registerView");
const allInputs = registerView.querySelectorAll("input, select");
const btn = registerView.querySelector("button");
const dataUser =  {};
const errorList = {};
let existsError = false

btn.addEventListener("click", btnHandlerButton)


function btnHandlerButton(e){
    e.preventDefault()
    allInputs.forEach(input=>{
        let kay = input.name;
        let val = input.value;        
        
        dataUser[kay]= val;
    })   
    dataUser.gender = registerView.querySelector("input[type='radio']:checked").value;
    validationForm()
}

function validationForm(){
    if(!dataUser.firstName){
        existsError = true;
        errorList.firstName = "First name is required"
    }
}