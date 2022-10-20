const rewievCarousel = () => {
    const line = document.querySelector('.testimonials__range');
    const track = document.querySelector('.testimonials__box');
    const itemWidth = document.querySelector('.testimonials__item').clientWidth

    function moveTrack(e) {
        let range = e.currentTarget.value
        let itemWidth = document.querySelector('.testimonials__item').clientWidth
        if (window.innerWidth > 1000) {
            track.style.transform = `translateX(${(-itemWidth * range) - (38 * range)}px)`
            line.max = 7
        }
        if (window.innerWidth <= 1000) { 
            line.max = 8
            track.style.transform = `translateX(${(-itemWidth * range) - (22 * range)}px)`
        }
    }
    line.addEventListener('input', moveTrack)
}

export default rewievCarousel;