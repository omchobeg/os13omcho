// Dohvati dugme
let mybutton = document.getElementById("scrollTopBtn");

// Prikaži dugme kada se scrolla više od 200px
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// Kad se klikne, vrati na vrh
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dodaj funkcionalnost na klik
mybutton.addEventListener("click", scrollToTop);

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.logo-wrapper');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    
    // PARAMETRI ZA KRETANJE
    const scrollAmount = 300; // Koliko piksela da se skroluje po kliku/intervalu
    const autoScrollInterval = 3000; // Interval automatskog skrolovanja (u milisekundama, 3 sekunde)
    let scrollTimer; // Promenljiva za čuvanje ID-a setIntervala
    
    // --- FUNKCIJE KARUSELA ---

    // 1. Ručno skrolovanje (klik na strelicu)
    const scrollCarousel = (direction) => {
        const currentScroll = carousel.scrollLeft;
        const newScroll = currentScroll + (direction * scrollAmount);
        
        carousel.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    };

    if (leftArrow) {
        leftArrow.addEventListener('click', () => scrollCarousel(-1));
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', () => scrollCarousel(1));
    }


    // 2. Automatsko skrolovanje (pokreće se timerom)
    const startAutoScroll = () => {
        // Prethodni timer se čisti pre novog pokretanja (ako postoji)
        clearInterval(scrollTimer); 
        
        scrollTimer = setInterval(() => {
            // Ako smo došli do kraja, vratimo se na početak (seamless loop)
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5) {
                carousel.scrollTo({ left: 0, behavior: 'auto' }); // Brzo resetovanje na početak
            }
            
            // Skroluj za jedan korak napred
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, autoScrollInterval);
    };
    
    // 3. Kontrola vidljivosti strelica (opcionalno, može se izbrisati ako nije potrebno)
    const updateArrowVisibility = () => {
        // Logika za vidljivost strelica (trenutno isključena/komentarisana u CSS-u)
    };

    // 4. Pauziranje pri hoveru
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(scrollTimer));
        carousel.addEventListener('mouseleave', startAutoScroll);

        // --- POKRETANJE ---
        startAutoScroll();
        carousel.addEventListener('scroll', updateArrowVisibility);
    }
    
    updateArrowVisibility(); // Inicijalno postavljanje
});

