const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // remove the class when the element leaves view so it can animate again
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2 // trigger when 20% is visible
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
