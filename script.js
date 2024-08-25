document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 1);
    
    const movieContainers = document.querySelectorAll('.movies-container');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');

    for (let i = 0; i < movieContainers.length; i++) {
        const moviesContainer = movieContainers[i];
        const prevBtn = prevBtns[i];
        const nextBtn = nextBtns[i];

        let scrollPosition = 0;

        moviesContainer.addEventListener('scroll', function() {
            scrollPosition = moviesContainer.scrollLeft;
            updateButtonVisibility(moviesContainer, prevBtn, nextBtn);
        });

        prevBtn.addEventListener('click', function() {
            const viewportWidth = window.innerWidth;
            const scrollAmount = viewportWidth * 0.9;
        
            scrollPosition = Math.max(scrollPosition - scrollAmount, 0);
            
            updateScrollPosition(moviesContainer, scrollPosition);
            updateButtonVisibility(moviesContainer, prevBtn, nextBtn);
        });
        
        nextBtn.addEventListener('click', function() {
            const viewportWidth = window.innerWidth;
            const scrollAmount = viewportWidth * 0.9;
        
            const remainingSpace = moviesContainer.scrollWidth - (scrollPosition + moviesContainer.clientWidth);
            scrollPosition += Math.min(remainingSpace, scrollAmount);
            
            updateScrollPosition(moviesContainer, scrollPosition);
            updateButtonVisibility(moviesContainer, prevBtn, nextBtn);
        });
    }

    function updateScrollPosition(container, position) {
        container.scrollLeft = position;
    }

    function updateButtonVisibility(container, prevBtn, nextBtn) {
        prevBtn.style.display = container.scrollLeft === 0 ? 'none' : 'block';
        nextBtn.style.display = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1 ? 'none' : 'block';
    }

    window.addEventListener('scroll', function() {
        const coverPhoto = document.querySelector('.cover-photo');
        const marvelLogo = document.querySelector('.marvel-logo');
        const logoContainer = document.querySelector('.logo-container');

        const scrollPosition = window.scrollY;

        const thresholds = [0, 50, 100, 150, 200, 250, 300, 350, 400];
        const brightnessLevels = [100, 90, 80, 70, 60, 50, 40, 30, 20];
        const opacityLevels = [100, 90, 80, 70, 60, 50, 40, 30, 20];
        const scaleLevels = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6];

        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (scrollPosition >= thresholds[i]) {
                coverPhoto.style.filter = `brightness(${brightnessLevels[i]}%)`;
                marvelLogo.style.filter = `opacity(${opacityLevels[i]}%)`;
                logoContainer.style.transform = `scale(${scaleLevels[i]})`;
                break;
            }
        }
    }); 
});
