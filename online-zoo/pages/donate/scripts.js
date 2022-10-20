import donateDots from "../../assets/js/donateDots.js";
import formInput from "../../assets/js/form.js";
import burgerMenu from "../../assets/js/burgerMenu.js"

window.addEventListener('DOMContentLoaded', () => {
    formInput()
    donateDots()
    burgerMenu()
    const input = document.querySelector('.donate__form-input');
    // ограничивает количество символов в инпуте
    input.addEventListener('keydown', () => {
        if (input.value.length > 3) {
            input.value = input.value.slice(0, 3)
        }
    })

    //Активные ссылки меню 
    document.querySelectorAll('.header__link-active').forEach(item => {
        item.addEventListener('click', (e) => e.preventDefault())
    })

})

