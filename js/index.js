const form = document.getElementById('form')
const cardName = document.getElementById('card-name')
const cardNumber = document.getElementById('card-number')
const cardDateMM = document.getElementById('card-date__mm')
const cardDateYY = document.getElementById('card-date__yy')
const cardCvc = document.getElementById('card-cvc')
const submit = document.getElementById('submit')
//Los inputs y su casilla en la tarjeta respectivamente, la idea es tenerlos en el mismo orden
const inputForm = document.querySelectorAll('input:not([type="submit"])')
const infoCard = document.querySelectorAll('.card span')

//Cambio el orden en que estan los inputs para que esten igual en orden que con la tarjeta
const textCard = [...infoCard].sort( (a,b) => { return a.dataset.sort - b.dataset.sort })
const inputs = [...inputForm].sort( (a,b) => { return a.dataset.sort - b.dataset.sort })

const formCard = document.querySelector('.formcard')
const cardAdd = document.querySelector('.card-added')
const btnContinue = document.querySelector('.card-added__button')
//Para efectos de animacion del boton y carga
const spinner = document.querySelector('.spinner')
const check = document.querySelector('.check')
const confirm = document.querySelector('.confirm')


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const checkForm = {
        nameCard: checkName(form.cardname.value),
        numberCard: checkNumberCard(form.cardnumber.value),
        dateM:checkDateMM(form.datemm.value),
        dateY: checkDateYY(form.dateyy.value),
        cvcCard: checkDateCvc(form.cardcvc.value)
    }
    //Si el valor de cada key en el objeto es true
    if (Object.values(checkForm).every((value) => value === true)) {
        
        //Empieza la animacion
        if(!submit.classList.contains('loading')) {
            submit.classList.toggle('loading')
            confirm.style.display = 'none'
            spinner.style.display = 'block'
            //Termina la 'carga', vendria siendo el succes si los datos se validan en el backend
            setTimeout(() => {
                spinner.style.display = 'none'
                submit.classList.add('submit-success')
                check.classList.add('check-effect')
              }, 2000)

            //El boton submit vuelve a su tamaño, oculto el form y muestro tarjeta añadida
            setTimeout(() => submit.classList.toggle('loading'), 2500)
            setTimeout(() => {
                formCard.classList.add('hidden')
                cardAdd.classList.add('show')
            } , 3000)
            
        } else {
            submit.classList.toggle('loading')
            spinner.style.display = 'none'
        }
    }
})
//Todo vuelve como al principio
btnContinue.addEventListener('click', () => {
    formCard.classList.remove('hidden')
    cardAdd.classList.remove('show')
    submit.classList.remove('submit-success')
    confirm.style.display = 'block'
    check.classList.remove('check-effect')
    form.reset()
    inputForm.forEach((element, index) => element.className = "formcard__inputs")
    textCard[0].textContent = '0000 0000 0000 0000'
    textCard[1].textContent = 'JANE APPLESEED'
    textCard[2].textContent = '00'
    textCard[3].textContent = '00'
    textCard[4].textContent = '000'
})

window.addEventListener('load', () => showValuesInCards())
//Si esta vacio el valor del input
const checkEmpty = (input) => {
    return input.value != '' 
}
//Validamos con regex
const checkRegex = (regex, value) => {
    return regex.test(value)
}
//Recibe el input para buscar el elemento siguiente (span) para mostrarlo y poner un mensaje
const showError = (input, message) => {
    const formControl = input.nextElementSibling
    formControl.style.visibility = 'visible'
    formControl.textContent = message
    input.className = "formcard__inputs wrong"
}
//Lo mismo pero solamente resaltamos en verde
const showSuccess = (input) => {
    const formControl = input.nextElementSibling
    formControl.style.visibility = 'hidden'
    input.className = "formcard__inputs success"
}
/* --- Funciones para validar cada input --- */

const checkName = (inputValue) => {
    const cardNameValue = inputValue.trim()
    if (!checkEmpty(cardName)) {
        showError(cardName, 'Can´t be blank')
    } else if (!checkRegex(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, cardNameValue)) {
        showError(cardName, 'Wrong format, letters only')
    } else if (cardNameValue.length <= 5 || cardNameValue.length > 18) {
        showError(cardName, 'Wrong format, 8 characters minimum and 18 maximum')
    } else {
        showSuccess(cardName)
        return true
    }
}

const checkNumberCard = (inputValue) => {
    const cardNumberValue = inputValue.replace(/ /g,'')
    if (!checkEmpty(cardNumber)) {
        showError(cardNumber, 'Can´t be blank')
    } else if (!checkRegex(/^[0-9]+$/, cardNumberValue)) {
        showError(cardNumber, 'Wrong format, numbers only')
    } else if (cardNumberValue.length != 16) {
        showError(cardNumber, 'Wrong format, must be exactly 16 numbers')
    } else {
        showSuccess(cardNumber)
        return true
    }
}

const checkDateMM = (inputValue) => {
    const cardDatemmValue = inputValue.replace(/ /g,'')
    if (!checkEmpty(cardDateMM)) {
        showError(cardDateMM, 'Can´t be blank')
    } else if (!checkRegex(/^[0-9]+$/, cardDatemmValue)) {
        showError(cardDateMM, 'Wrong format, numbers only')
    } else if (cardDatemmValue.length != 2) {
        showError(cardDateMM, 'Wrong value')
    } else if (parseFloat(cardDatemmValue) < 0 || parseFloat(cardDatemmValue) > 12) {
        showError(cardDateMM, 'Wrong value')
    } else {
        showSuccess(cardDateMM)
        return true
    }
}

const checkDateYY = (inputValue) => {
    const cardDateyyValue = inputValue.replace(/ /g,'')
    if (!checkEmpty(cardDateYY)) {
        showError(cardDateYY, 'Can´t be blank')
    } else if (!checkRegex(/^[0-9]+$/, cardDateyyValue)) {
        showError(cardDateYY, 'Wrong format, numbers only')
    } else if (cardDateyyValue.length != 2) {
        showError(cardDateYY, 'Wrong value')
    } else if (parseFloat(cardDateyyValue) < 22 || parseFloat(cardDateyyValue) > 30) {
        showError(cardDateYY, 'Wrong value')
    } else {
        showSuccess(cardDateYY)
        return true
    }
}

const checkDateCvc = (inputValue) => {
    const cardCvcValue = inputValue.replace(/ /g,'')
    if (!checkEmpty(cardCvc)) {
        showError(cardCvc, 'Can´t be blank')
    } else if (!checkRegex(/^[0-9]+$/, cardCvcValue)) {
        showError(cardCvc, 'Wrong format, numbers only')
    } else if (cardCvcValue.length != 3) {
        showError(cardCvc, 'Wrong value')
    } else {
        showSuccess(cardCvc)
        return true
    }
}
/* --- Mostrar texto de los inputs en las tarjetas --- */
const showValuesInCards = () => {
    inputs.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            element.value != '' ?
                textCard[index].textContent = e.target.value
            :
            index === 0 ? textCard[index].textContent = '0000 0000 0000 0000':
            index === 1 ? textCard[index].textContent = 'JANE APPLESEED':
            index === 2 ? textCard[index].textContent = '00':
            index === 3 ? textCard[index].textContent = '00':
            index === 4 ? textCard[index].textContent = '000': ""
    
        })
    })
}

