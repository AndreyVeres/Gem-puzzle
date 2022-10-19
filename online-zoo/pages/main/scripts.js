import popup from "../../assets/js/popup.js";
import rewievCarousel from "../../assets/js/rewievCarousel.js";
import formInput from "../../assets/js/form.js";
import petsArrows from "../../assets/js/petsArrows.js"
import petsGallery from "../../assets/js/petsGallery.js"
import burgerMenu from "../../assets/js/burgerMenu.js"
window.addEventListener('DOMContentLoaded', () => {
    burgerMenu()
    petsGallery()
    petsArrows()
    formInput()
    popup('.testimonials__item', '.popup__wrapper', '.popup', '.popup__close')
    rewievCarousel()

    //Активные ссылки меню 
    document.querySelectorAll('.header__link-active').forEach(item => {
        item.addEventListener('click', (e) => e.preventDefault())
    })


})



