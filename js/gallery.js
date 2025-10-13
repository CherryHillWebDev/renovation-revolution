// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

const galleryGroups = [
    {
        id: 0,
        images: ['../img/gallery/bathroom1/bathroom1-1.webp', '../img/gallery/bathroom1/bathroom1-2.webp', '../img/gallery/bathroom1/bathroom1-3.webp', '../img/gallery/bathroom1/bathroom1-4.webp', '../img/gallery/bathroom1/bathroom1-5.webp'],
    },
    {
        id: 1,
        images: ['../img/gallery/deck1/deck1-1.webp', '../img/gallery/deck1/deck1-2.webp', '../img/gallery/deck1/deck1-3.webp']
    },
    {
        id: 2,
        images: ['../img/gallery/deck2/deck2-1.webp', '../img/gallery/deck2/deck2-2.webp', '../img/gallery/deck2/deck2-3.webp']
    }
]

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal functionality
const modalDiv = document.getElementById('modal');
const modalImage = modalDiv.querySelector('.modal-image');
let currentIndex = 0;
let currentGalleryItem = 0;

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modalDiv.classList.add('active');
        currentGalleryItem = item.id;

        const imageSourceArray = galleryGroups[currentGalleryItem].images;
        

        modalImage.src = imageSourceArray[currentIndex];
        
        document.addEventListener('keydown', handleKeyDown);
    });
});

function changeModalPicture(step) {
    currentIndex += step;
    const imageSourceArray = galleryGroups[currentGalleryItem].images;

    if(currentIndex < 0) currentIndex = imageSourceArray.length - 1;
    if(currentIndex > imageSourceArray.length - 1) currentIndex = 0;

    modalImage.src = imageSourceArray[currentIndex];
}

function handleKeyDown(e) {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
        changeModalPicture(-1);
    } else if (e.key === 'ArrowRight') {
        changeModalPicture(1);
    } else if (e.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.removeEventListener('keydown', handleKeyDown);
    currentIndex = 0;
}


// Touch Dragging functionality
let touchStartX = null;
let currentTranslate = 0;
let isDragging = false;

function handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        modalImage.style.transition = 'none';
    }
}

function handleTouchMove(e) {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const diffX = touchX - touchStartX;
    currentTranslate = diffX;
    modalImage.style.transform = `translateX(${diffX}px)`;
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    modalImage.style.transition = 'transform 0.3s';
    if (Math.abs(currentTranslate) > 50) {
        const direction = currentTranslate < 0 ? 1 : -1;
        // Slide out in the direction of the swipe
        modalImage.style.transform = `translateX(${direction * -window.innerWidth}px)`;
        setTimeout(() => {
            // Instantly move new image in from the opposite side
            changeModalPicture(direction);
            modalImage.style.transition = 'none';
            modalImage.style.transform = `translateX(${direction * window.innerWidth}px)`;
            setTimeout(() => {
                // Animate new image to center
                modalImage.style.transition = 'transform 0.3s';
                modalImage.style.transform = 'translateX(0)';
            }, 20);
        }, 300);
    } else {
        // Snap back
        modalImage.style.transform = 'translateX(0)';
    }
    currentTranslate = 0;
}


modal.addEventListener('touchstart', handleTouchStart);
modal.addEventListener('touchmove', handleTouchMove);
modal.addEventListener('touchend', handleTouchEnd);

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});