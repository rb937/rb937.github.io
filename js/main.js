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

const particles = new Set();
let lastParticleTime = 0;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('pointermove', e => {
    const now = Date.now();
    if (now - lastParticleTime > 10 && !reducedMotionQuery.matches) {
        createTrailParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

const headlineContainer = document.getElementById('headline-container');
const headlineWords = ['Software', 'AI / ML', 'Data Science'];
let headlineIndex = 0;

function typeHeadline(word) {
    if (!headlineContainer) return;
    headlineContainer.textContent = '';
    let characterIndex = 0;

    const typeNextCharacter = () => {
        if (characterIndex < word.length) {
            headlineContainer.textContent += word[characterIndex];
            characterIndex += 1;
            window.setTimeout(typeNextCharacter, 55);
        } else {
            window.setTimeout(() => eraseHeadline(word), 1300);
        }
    };

    typeNextCharacter();
}

function eraseHeadline(word) {
    if (!headlineContainer) return;
    if (headlineContainer.textContent.length > 0) {
        headlineContainer.textContent = headlineContainer.textContent.slice(0, -1);
        window.setTimeout(() => eraseHeadline(word), 30);
    } else {
        headlineIndex = (headlineIndex + 1) % headlineWords.length;
        typeHeadline(headlineWords[headlineIndex]);
    }
}

typeHeadline(headlineWords[headlineIndex]);

function createTrailParticle(x, y) {
    if (particles.size >= 120) {
        const oldestParticle = particles.values().next().value;
        oldestParticle.remove();
        particles.delete(oldestParticle);
    }

    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.width = Math.random() * 2 + 1 + 'px';
    particle.style.height = Math.random() * 8 + 4 + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--offset-x', (Math.random() - 0.5) * 60 + 'px');
    particle.style.setProperty('--offset-y', (Math.random() - 0.5) * 60 + 'px');
    particle.style.setProperty('--rotation', Math.random() * 360 + 'deg');
    document.body.appendChild(particle);
    particles.add(particle);
    setTimeout(() => {
        particles.delete(particle);
        particle.remove();
    }, 1600);
}

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const trackedSections = sectionLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const navigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sectionLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

trackedSections.forEach(section => navigationObserver.observe(section));
