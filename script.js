document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 1);
    const moviesContainer = document.querySelector('.movies-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let scrollPosition = 0;

    moviesContainer.addEventListener('scroll', function() {
        scrollPosition = moviesContainer.scrollLeft;
        updateButtonVisibility();
    });

    prevBtn.addEventListener('click', function()  {
        scrollPosition = Math.max(scrollPosition - 300, 0);
        updateScrollPosition();
        updateButtonVisibility();
    });

    nextBtn.addEventListener('click', function() {
        const remainingSpace = moviesContainer.scrollWidth - (scrollPosition + moviesContainer.clientWidth);
        scrollPosition += Math.min(remainingSpace, 300);
        updateScrollPosition();
        updateButtonVisibility();
    });

    function updateScrollPosition() {
        moviesContainer.scrollLeft = scrollPosition;
    }

    function updateButtonVisibility() {
        prevBtn.style.display = scrollPosition === 0 ? 'none' : 'block';
        nextBtn.style.display = scrollPosition >= moviesContainer.scrollWidth - moviesContainer.clientWidth - 1 ? 'none' : 'block';
    }

    window.addEventListener('scroll', function() {
        const coverPhoto = document.querySelector('.cover-photo');
        const marvelLogo = document.querySelector('.marvel-logo');

        const scrollPosition = window.scrollY;

        const thresholds = [0, 200, 250, 300, 350, 400, 450, 500];
        const brightnessLevels = [100, 100, 85, 70, 55, 40, 30, 20];
        const opacityLevels = [100, 100, 90, 80, 70, 60, 50, 40];
        const scaleLevels = [1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (scrollPosition >= thresholds[i]) {
                coverPhoto.style.filter = `brightness(${brightnessLevels[i]}%)`;
                marvelLogo.style.filter = `opacity(${opacityLevels[i]}%)`;
                marvelLogo.style.transform = `translateX(-50%) scale(${scaleLevels[i]})`;
                break;
            }
        }
    }); 
});
