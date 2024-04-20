{
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Load courses dynamically
    function loadCourses() {
        fetch('path-to-courses-api')
            .then(response => response.json())
            .then(courses => {
                const coursesContainer = document.querySelector('.course-menu');
                courses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.textContent = course.name; // example property
                    coursesContainer.appendChild(courseElement);
                });
            });
    }
    loadCourses();

    // Sticky Navbar functionality
    var navbar = document.querySelector('header');
    var sticky = navbar.offsetTop;

    function handleScroll() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }
    window.onscroll = handleScroll;

    // Carousel functionality
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prev = carousel.querySelector('.carousel-prev');
        const next = carousel.querySelector('.carousel-next');

        next.addEventListener('click', () => {
            const trackWidth = track.offsetWidth;
            track.style.transform = `translateX(-${trackWidth}px)`;
        });

        prev.addEventListener('click', () => {
            track.style.transform = 'translateX(0px)';
        });
    });
});

// Handling the chat feature for profile images
document.addEventListener('DOMContentLoaded', function() {
    const partnerImages = document.querySelectorAll('.partner-profile img');

    partnerImages.forEach(img => {
        img.addEventListener('click', function() {
            partnerImages.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Toggle search visibility
function toggleSearch() {
    var searchBox = document.getElementById('search-box');
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'block'; // Shows the search box
    } else {
        searchBox.style.display = 'none'; // Hides the search box
    }
}


// Handle search functionality
function searchContent(event) {
    if (event.key === 'Enter') {
        var input = document.getElementById('search-input');
        var filter = input.value.toLowerCase();
        var nodes = document.querySelectorAll('.searchable-content'); // Elements that contain the content to search.

        nodes.forEach(node => {
            node.style.display = node.textContent.toLowerCase().includes(filter) ? 'block' : 'none';
        });
    }
}
