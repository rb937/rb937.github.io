const particles = [];
let lastParticleTime = 0;

document.addEventListener('pointermove', e => {
    const now = Date.now();
    if (now - lastParticleTime > 10) {
        createTrailParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';

    const width = Math.random() * 2 + 1;
    const height = Math.random() * 8 + 4;
    particle.style.width = width + 'px';
    particle.style.height = height + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    particle.style.setProperty('--offset-x', offsetX + 'px');
    particle.style.setProperty('--offset-y', offsetY + 'px');
    particle.style.setProperty('--rotation', Math.random() * 360 + 'deg');

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 2000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const titles = [
    'Data Science',
    'Builder',
    'Game Developer',
    'CS Undergrad'
];

const container = document.getElementById('headline-container');
let currentIndex = 0;

/**
 * Function to simulate the typing effect
 * @param {string} text - The text to be typed out.
 * @param {function} callback - Function to execute when typing is finished.
 */
function typeWriter(text, callback) {
    let i = 0;
    container.innerHTML = '';

    function type() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            if (callback) {
                callback();
            }
        }
    }
    type();
}

function cycleTitles() {
    const currentTitle = titles[currentIndex];
    typeWriter(currentTitle, () => {
        setTimeout(() => {
            container.innerHTML = '';

            currentIndex = (currentIndex + 1) % titles.length;
            cycleTitles();
        }, 1600);
    });
}

window.onload = function () {
    cycleTitles();
};
