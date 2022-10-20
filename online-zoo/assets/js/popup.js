const popup = (itemSelector, popupWrap, popupWindow, closeSelector) => {
    const items = document.querySelectorAll(itemSelector)
    const close = document.querySelector(closeSelector)
    const popupWrapper = document.querySelector(popupWrap)
    const popup = document.querySelector(popupWindow)
    let scroll = calculateScroll()
    function calculateScroll() {
        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

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
       cloneItem.lastElementChild.classList.add('popup__text')
        popupWrapper.append(cloneItem)
        popup.style.visibility = 'visible'
        popup.style.opacity = '1'

        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }
    function closePopup(e) {
        if (e.target === close || e.target === popup) {
            popup.style.visibility = 'hidden'
            popup.style.opacity = '0'
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
            removePopup()
        }
    }
    function removePopup() {
        document.querySelector('.popup__item').remove()
    }
    popup.addEventListener('click', closePopup)
}

export default popup;