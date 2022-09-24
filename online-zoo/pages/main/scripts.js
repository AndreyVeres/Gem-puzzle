const formInput = document.querySelector('.footer__form-email__input')
const label = document.querySelector('.footer__form-email__label');
const form = document.querySelector('.footer__form')
formInput.addEventListener('click', (e) => {
    label.classList.remove('footer__form-email__label-inactive')
    label.classList.add('footer__form-email__label-focused')
    label.style.position = 'relative'
})

formInput.addEventListener('blur', () => {
    label.classList.add('footer__form-email__label-inactive')
    label.classList.remove('footer__form-email__label-focused')
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = document.querySelector('.footer__form-btn');
    btn.classList.add('footer__form-btn-default')
    btn.classList.remove('footer__form-btn')
})



//Активные ссылки меню 
document.querySelectorAll('.header__link-active').forEach(item => {
    item.addEventListener('click', (e) => e.preventDefault())
})






// Максимально количество символов в инпуте 
try{
    const input = document.querySelector('.donate__form-input');
    input.addEventListener('keydown', () => {
        if (input.value.length > 3) {
            input.value = input.value.slice(0, 3)
        }
    })
}catch{}


const arrows = document.querySelectorAll('.arrow')
arrows.forEach(arrow => {
    arrow.addEventListener('click' , () => {
        arrow.classList.add('arrow-active')
        setTimeout(() => {
            arrow.classList.remove('arrow-active')
        }, 1000);
})

})