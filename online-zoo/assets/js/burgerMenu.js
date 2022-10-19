const burgerMenu = () => {
    const burgerMenuBtn = document.querySelector('.burger__menu');
    const burgerCloseBtn = document.querySelector('.header__menu-close')
    const menuBackground = document.querySelector('.header__nav--burger');
    const menu = document.querySelector('.header__burger-box')
    function showMenu(){
        menu.style.transform = `translateY(0px)`;
        document.body.style.overflow = 'hidden';
        menuBackground.style.opacity = 1;
        menuBackground.style.visibility = 'visible';
    }
    function closeMenu(e) {
        if (e.target.classList.contains('header__nav--burger') || e.target === burgerCloseBtn) {
            menuBackground.style.visibility = 'hidden';
            menuBackground.style.opacity = 0;
            document.body.style.overflow = '';
            menu.style.transform = `translateY(-400px)`;
        }
     
    }
    burgerMenuBtn.addEventListener('click' , showMenu);
    menuBackground.addEventListener('click' , closeMenu)
}

export default burgerMenu;