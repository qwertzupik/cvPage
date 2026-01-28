function switchTab(tabId, clickedBtn) {
    const sections = document.querySelectorAll('.tabContent');
    const button = document.querySelectorAll('.button');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });

    button.forEach(btn => btn.classList.remove('active'));

    const active = document.getElementById(tabId);
    if (active) {
        active.style.display = 'block';

        if (clickedBtn){
            clickedBtn.classList.add('active');
        }

        const items = active.querySelectorAll('.timelineItem, .aboutContent, .edu');
        items.forEach((item, index) => {
            item.style.animationDelay = (index + 1) * 0.1 + "s";
        });

        const navElement = document.querySelector('nav');
        navElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}