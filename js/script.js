//Nav menu
let isMenuOpen = false;

function toggleNav() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (isMenuOpen && document.body.classList.contains('no-scroll')) {
    isMenuOpen = false;
  } else if (!isMenuOpen && !document.body.classList.contains('no-scroll')) {
    isMenuOpen = true;
  }

  handleScrolling();
}

function handleScrolling() {
  const body = document.body;

  if (isMenuOpen) {
    body.classList.add('no-scroll');
  } else if (!isMenuOpen) {
    body.classList.remove('no-scroll');
  }
}


// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links .link, .nav-links .contact').forEach(link => {
    link.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.querySelector('.hamburger');

        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        isMenuOpen = false;
        handleScrolling();
    });
});

// Close mobile menu when clicking outside

document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (e.target.closest('.hamburger') || e.target.closest('.nav-menu')) {
      return
    }

    navMenu.classList.remove('active');
    hamburger.classList.remove('active');

    isMenuOpen = false;
    handleScrolling();
});