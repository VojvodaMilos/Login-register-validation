const registerView = document.querySelector("#registerView");
const loginView = document.querySelector("#loginView");
const allInputsRegisterView = registerView.querySelectorAll("input, select");
const allInputsLoginView = loginView.querySelectorAll("input");
const btnRegisterView = registerView.querySelector("button");
const btnLoginView = loginView.querySelector("button");
const form = document.querySelector("#subForm")
const msgLogin = document.querySelector(".msgLogin")
const navLogin = document.querySelector(".login")
const navRegister = document.querySelector(".register")
let dataUser = {};
let loginUser = {}
let errorList = {};
let existsError = false

let userDB = []
/////////navigation////////////////////////////////////////////////////////
navRegister.addEventListener("click", () => changeView(loginView, registerView))
navLogin.addEventListener("click", () => changeView(registerView, loginView))

function changeView(a, b) {
    a.classList.remove("activeView")
    b.classList.add("activeView")

}



//////////register view ///////////////////////////////////////////////////
btnRegisterView.addEventListener("click", btnHandlerButton)

function btnHandlerButton(e) {
    e.preventDefault()
    allInputsRegisterView.forEach(input => {
        let kay = input.name;
        let val = input.value;

        dataUser[kay] = val;
    })
    dataUser.gender = registerView.querySelector("input[type='radio']:checked").value;
    if (validationForm()) {
        userDB.push(dataUser)
        dataUser = {}

        registerView.querySelectorAll(".clear").forEach(e => e.value = "")
        navRegister.classList.remove("activeView")
        navLogin.classList.add("activeView")

    }
}

function validationForm() {

    existsError = false

    if (!dataUser.firstName) {
        existsError = true;
        errorList.firstName = "First name is required"
    }
    if (!dataUser.lastName) {
        existsError = true;
        errorList.lastName = "Last name is required"
    }
    if (!dataUser.email.includes("@")) {
        existsError = true;
        errorList.email = "Email is not valid"
    }
    if (!dataUser.password) {
        existsError = true;
        errorList.password = "Password is required"
    }
    if (dataUser.password !== dataUser.repeatPassword) {
        existsError = true;
        errorList.repeatPassword = "RepeatPassword is not equal  with password"
    }

    if (existsError) {
        for (const key in errorList) {
            registerView.querySelector(`input[name='${key}']`).classList.add("errorInput")
        }
    } else {
        for (const key in errorList) {
            registerView.querySelector(`input[name='${key}']`).classList.remove("errorInput")

        }
        errorList = {}
    }
    return !existsError
}

// //////Login view //////////////////////////////////////////////////////////////
btnLoginView.addEventListener("click", btnLoginHandler)

function btnLoginHandler(e) {
    e.preventDefault()
    allInputsLoginView.forEach(login => {
        let loginKey = login.name;
        let loginValue = login.value;

        loginUser[loginKey] = loginValue

    })
    if (validationLogin()) {
        findUser()
        loginView.querySelectorAll(".clear").forEach(e => e.value = "")
    }

}

function findUser() {
    if (userDB.length !== 0) {
        for (const user of userDB) {
            if (user.email === loginUser.email && user.password === loginUser.password) {
                form.submit(btnLoginHandler);
            } else {
                msgLogin.innerText = "The email or password is incorrect";
            }
        }
    } else {
        msgLogin.innerText = "You must register"
    }

}

function validationLogin() {
    existsError = false


    loginView.querySelector(`input`).classList.remove("errorInput");


    if (!loginUser.email.includes("@")) {
        existsError = true;
        errorList.email = "Email is not valid"
    }

    if (!loginUser.password) {
        existsError = true;
        errorList.password = "Password is required"
    }
    if (existsError) {
        for (const key in errorList) {
            loginView.querySelector(`input[name='${key}']`).classList.add("errorInput");
        }

    } else {
        for (const key in errorList) {
            loginView.querySelector(`input[name='${key}']`).classList.remove("errorInput");
        }
        errorList = {}
    }

    return !existsError
}