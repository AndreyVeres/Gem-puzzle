const petsGallery = () => {
    let itemsToRender = [];
    let allitems = document.querySelectorAll('.pets__gallery-item');
    const leftArrow = document.querySelector('.arrow__left')
    const rightArrow = document.querySelector('.arrow__right')
    const gallery = document.querySelector('.pets__gallery')

    let maxItemsInRow = null;
    checkResolution()
    init()

    function checkResolution() {
        if (window.innerWidth >=709) {
            maxItemsInRow = 6
        } else if (window.innerWidth <= 708) {
            maxItemsInRow = 4;
        }
    }

    function calculateGap(itemWidth) {
        let gap = 0
        if (maxItemsInRow === 6) gap = (document.querySelector('.pets__gallery-box').clientWidth - (itemWidth * (maxItemsInRow / 2))) / 2
        else gap = (document.querySelector('.pets__gallery-box').clientWidth - (itemWidth * (maxItemsInRow / 2)))
        return gap
    }

    function renderStartedItems() {
        for (let i = 0; i < maxItemsInRow; i++) {
            initialRender()
        }
    }

    function initialRender() {
        const item = itemsToRender.splice(
            randomInteger(0, itemsToRender.length - 1), 1)
        gallery.append(item[0])
    }

    function init() {
        allitems.forEach(item => {
            itemsToRender.push(item)
            item.remove()
        })
        renderStartedItems()
    }

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    function toggleBtns(bool) {
        rightArrow.disabled = bool
        leftArrow.disabled = bool
    }

    function renderAdditionItems(side) {
        for (let i = 0; i < maxItemsInRow; i++) {
            let newItem = itemsToRender.splice(
                randomInteger(0, itemsToRender.length - 1), 1)
            gallery[side](newItem[0])
        }
    }

    function finishMoving(elements){
        toggleBtns(false)
        elements.forEach(item => item.remove())
        gallery.style.transition = 'none'
        gallery.style.transform = ``
    }

    function moveRight() {
        const itemWidth = document.querySelector('.pets__gallery-item').clientWidth;
        toggleBtns(true)
        renderAdditionItems('append')
        gallery.style.transition = '1s'
        gallery.style.transform += `translateX(-${itemWidth * (maxItemsInRow / 2) + (calculateGap(itemWidth) * (maxItemsInRow / 2))}px)`
        let oldElements = Array.from(document.querySelectorAll('.pets__gallery-item')).splice(0, maxItemsInRow)

        itemsToRender.push(...oldElements)
        setTimeout(() => {
            finishMoving(oldElements)
        }, 1000);

    }

    function moveLeft() {
        gallery.transition = 'none'
        const itemWidth = document.querySelector('.pets__gallery-item').clientWidth;
        toggleBtns(true)
        gallery.style.transform = `translateX(-${itemWidth * (maxItemsInRow / 2) + (calculateGap(itemWidth) * (maxItemsInRow / 2))}px)`
        renderAdditionItems('prepend')
        setTimeout(() => {
            gallery.style.transition = '1s'
            gallery.style.transform = ``
        }, 0);

        let oldElements = Array.from(document.querySelectorAll('.pets__gallery-item')).slice(maxItemsInRow)

        itemsToRender.push(...oldElements)
        setTimeout(() => {
            finishMoving(oldElements)
        }, 1000);
    }
    leftArrow.addEventListener('click', moveLeft);
    rightArrow.addEventListener('click', moveRight);
}

export default petsGallery;