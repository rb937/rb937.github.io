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