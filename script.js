/* ================================================
   Samuel Kokoška – CV Page  |  script.js
   ================================================ */

/* ─── Init ──────────────────────────────────────── */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initScrollProgress();
    initBackToTop();
    initRipple();
    initTilt();
    startTypewriter();
    // Open About tab by default
    const defaultBtn = document.querySelector('.button');
    if (defaultBtn) switchTab('about', defaultBtn);
});

/* ─── Scroll progress + topDiv shadow ──────────── */
function initScrollProgress() {
    const bar    = document.getElementById('scrollProgress');
    const topDiv = document.querySelector('.topDiv');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total    = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
        if (topDiv) topDiv.classList.toggle('scrolled', scrolled > 10);
    }, { passive: true });
}

/* ─── Back to top ───────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ─── Button ripple ─────────────────────────────── */
function initRipple() {
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect   = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top  = (e.clientY - rect.top)  + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

/* ─── 3-D tilt on certificate cards ─────────────── */
function initTilt() {
    document.querySelectorAll('.certificateItem').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform =
                'perspective(600px) translateY(-8px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ─── Typewriter effect ─────────────────────────── */
function startTypewriter() {
    const span = document.getElementById('typewriterSpan');
    if (!span) return;

    const fullText = span.textContent;
    span.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.textContent = '|';
    span.after(cursor);

    let i = 0;
    setTimeout(() => {
        const timer = setInterval(() => {
            span.textContent += fullText[i++];
            if (i >= fullText.length) {
                clearInterval(timer);
                setTimeout(() => cursor.remove(), 2800);
            }
        }, 75);
    }, 350);
}

/* ─── Skill bars ────────────────────────────────── */
function animateSkillBars() {
    document.querySelectorAll('.skillFill').forEach((fill, i) => {
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = fill.dataset.level + '%';
        }, 150 + i * 60);
    });
}

function resetSkillBars() {
    document.querySelectorAll('.skillFill').forEach(fill => {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                fill.style.transition = '';
            });
        });
    });
}

/* ─── Staggered item animations ─────────────────── */
function animateItems(section) {
    const items = section.querySelectorAll(
        '.timelineItem, .aboutContent, .edu, .certificateItem'
    );
    items.forEach((item, i) => {
        item.classList.remove('item-anim');
        void item.offsetWidth;
        item.style.animationDelay = (i * 0.07) + 's';
        item.classList.add('item-anim');
    });
}

/* ─── Tab switch ────────────────────────────────── */
function switchTab(tabId, clickedBtn) {
    document.querySelectorAll('.tabContent').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.button').forEach(b => b.classList.remove('active'));

    const active = document.getElementById(tabId);
    if (!active) return;

    active.classList.add('active');
    if (clickedBtn) clickedBtn.classList.add('active');

    animateItems(active);

    active.querySelectorAll('.timeline').forEach(tl => {
        tl.classList.remove('drawn');
        void tl.offsetWidth;
        setTimeout(() => tl.classList.add('drawn'), 200);
    });

    if (tabId === 'about') {
        resetSkillBars();
        setTimeout(animateSkillBars, 350);
    }

    const nav = document.querySelector('nav');
    if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
