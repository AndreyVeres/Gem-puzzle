const popup = (itemSelector, popupWrap, popupWindow, closeSelector) => {
    const items = document.querySelectorAll(itemSelector)
    const close = document.querySelector(closeSelector)
    const popupWrapper = document.querySelector(popupWrap)
    const popup = document.querySelector(popupWindow)
    
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.currentTarget === item) {
                openPopup(item)
            }
        })
    })
    function openPopup(item) {
        const cloneItem = item.cloneNode(true);
        cloneItem.classList.add('popup__item')

        popupWrapper.append(cloneItem)
        popup.style.visibility = 'visible'
        popup.style.opacity = '1'
    }
    function closePopup(e) {
        if (e.target === close || e.target === popup) {
            popup.style.visibility = 'hidden'
            popup.style.opacity = '0'
            removePopup()
        }
    }
    function removePopup() {
        document.querySelector('.popup__item').remove()
    }
    popup.addEventListener('click', closePopup)
}

export default popup;