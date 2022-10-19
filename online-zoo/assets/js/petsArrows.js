const petsArrows = () => {
    //Добавляет Active стрелкам в блоке Pets
    const arrows = document.querySelectorAll('.arrow')
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            arrow.classList.add('arrow-active')
            setTimeout(() => {
                arrow.classList.remove('arrow-active')
            }, 1000);
        })

    })

}

export default petsArrows