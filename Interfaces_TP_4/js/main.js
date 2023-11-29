//MasAmigos
let sectionMasAmigos = document.querySelector('#masAmigosMasDiversionContent');
let coords = sectionMasAmigos.getBoundingClientRect();
let masAmigosImagen1 = document.querySelector('#masAmigosImg1');
let masAmigosImagen2 = document.querySelector('#masAmigosImg2');
let masAmigosImagen3 = document.querySelector('#masAmigosImg3');
let masAmigosImagen4 = document.querySelector('#masAmigosImg4');
let masAmigosContent1 = document.querySelector('#masAmigosContent1');
let masAmigosContent2 = document.querySelector('#masAmigosContent2');
let masAmigosContent3 = document.querySelector('#masAmigosContent3');
let masAmigosContent4 = document.querySelector('#masAmigosContent4');

document.addEventListener("scroll", (e)=>{
 
    if (window.scrollY < 3500) {
        masAmigosImagen1.style.opacity = 0;
        masAmigosContent1.style.opacity = 0;
    }
    else if (window.scrollY > 3500 && window.scrollY < 4300) {
        masAmigosImagen1.style.opacity = 1;
        masAmigosContent1.style.opacity = 1;
        masAmigosImagen2.style.opacity = 0;
        masAmigosContent2.style.opacity = 0;
    }
    else if (window.scrollY > 4300 && window.scrollY < 5100) {
        masAmigosImagen1.style.opacity = 0;
        masAmigosContent1.style.opacity = 0;
        masAmigosImagen2.style.opacity = 1;
        masAmigosContent2.style.opacity = 1;
        masAmigosImagen3.style.opacity = 0;
        masAmigosContent3.style.opacity = 0;
    }
    else if (window.scrollY > 5100 && window.scrollY < 5900) {
        masAmigosImagen2.style.opacity = 0;
        masAmigosContent2.style.opacity = 0;
        masAmigosImagen3.style.opacity = 1;
        masAmigosContent3.style.opacity = 1;
        masAmigosImagen4.style.opacity = 0;
        masAmigosContent4.style.opacity = 0;
    }
    else if (window.scrollY > 5900 && window.scrollY < 6700) {
        masAmigosImagen3.style.opacity = 0;
        masAmigosContent3.style.opacity = 0;
        masAmigosImagen4.style.opacity = 1;
        masAmigosContent4.style.opacity = 1;
    } 
    else {
        masAmigosImagen4.style.opacity = 0;
        masAmigosContent4.style.opacity = 0;
    }
})


document.addEventListener("DOMContentLoaded", function () {
    //Hero
    const container = document.querySelector('.container-parallax-spideys');
    const layers = document.querySelectorAll('.layer');
    const backgroundViolet = document.querySelector('.background_violet');
    //Logo
    let layer6 = document.querySelector('.layer-6');
    const layer6img = document.querySelector('#layer-6-img');
    let logo = document.querySelector('.container-logo');
    //Orco
    const orco = document.querySelector('.container-conoceSpidey-right');
    //Cards
    const cards = []
    const card1 = document.querySelector('.gs-card-1');
    const card2 = document.querySelector('.gs-card-2');
    const card3 = document.querySelector('.gs-card-3');
    let card1img = document.querySelector('#gs-card1');
    let card2img = document.querySelector('#gs-card2');
    let card3img = document.querySelector('#gs-card3');
    const cardsImg = [card1img, card2img, card3img];
    cards.push(card1);
    cards.push(card2);
    cards.push(card3);
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', function () {
        //Logo Spidey
        let coordenadas = layer6.getBoundingClientRect();       
        if (coordenadas.top <= 0) {
            logo.style.opacity = 1;
        }
        else{
            logo.style.opacity = 0;
        }
        const scrollY = window.scrollY || document.documentElement.scrollTop;
                const newScale = Math.max(1 - scrollY / 500, 0.5); 

                layer6img.style.transform = `translateY(-10%) scale(${newScale})`;

        //Parallax orco
        if (isElementPartiallyInViewport(orco)) {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const translateY = scrollY * -0.15;
            orco.style.transform = `translateY(${translateY}px)`;
        }

        //Cards

        cards.forEach(card => {
            if (isElementPartiallyInViewport(card)) {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const translateY = scrollY * 0.08; 
                card.style.transform = `translateY(${translateY}px)`;
            }
        })
        cardsImg.forEach(card =>{
            card.addEventListener('mouseover', () =>{
                card.classList.add('skew');
                // card.style.transform = `skewX(20deg)`;
            })
        })

        cardsImg.forEach(card =>{
            card.addEventListener('mouseout', () =>{
                card.classList.remove('skew');
            })
        })

        //Parallax spidey

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const speed = parseFloat(backgroundViolet.getAttribute('data-speed'));
        const yPos = -scrollTop * speed;
        backgroundViolet.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const yPos = -scrollTop * speed;
            layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        });
    });

    //cards
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    
    function handleFadeIn(card) {
        if (isElementInViewport(card)) {
            card.classList.add("show-card");
        } else {
            // card.classList.remove("show-card");
        }
    }

    function handleScroll() {
        var cards = document.querySelectorAll(".spidey-card");
        cards.forEach(function (card) {
            handleFadeIn(card);
        });
    }

    // Llama a la función al cargar la página y en el evento de desplazamiento
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    
});