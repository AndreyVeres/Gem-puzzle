const donateDots = () => {
    const input = document.querySelector('.donate__form-input')
    const scale = document.querySelector('.scale__container')

    function addMarker(price , circle){
        price.classList.add('scale__price--active')
        circle.classList.add('scale__circle-active')
    } 
    function clearDots(){
        const circles = document.querySelectorAll('.scale__circle');
        circles.forEach(item => {
            item.classList.remove('scale__circle-active')
            item.nextElementSibling.classList.remove('scale__price--active')
        })
    }
    function checkInput (){
        clearDots()
        const prices = document.querySelectorAll('.scale__item-price')
        prices.forEach(price => {
            if(price.textContent.slice(1) === input.value){
                clearDots()
                addMarker(price ,price.previousElementSibling)
            }
        })
    }
    function addMarkerOnClick (e){
        let target = e.target;
        if(target.classList.contains('scale__circle')){
            clearDots()
            console.dir(target)
            target.classList.add('scale__circle-active')
            target.nextElementSibling.classList.add('scale__price--active')
            input.value = target.nextElementSibling.textContent.slice(1)
        }
    }
    input.addEventListener('input' , checkInput)
    scale.addEventListener('click' , addMarkerOnClick)
}

export default donateDots;