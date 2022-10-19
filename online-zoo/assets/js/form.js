const formInput = () => {
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

}

export default formInput