(() => {
    'use strict'

    const menuItem = window.location.pathname.includes('home') ? 'home' :
    window.location.pathname.includes('pending') ? 'pending' :
    window.location.pathname.includes('order') ? 'order' :
    window.location.pathname.includes('layout') ? 'layout' : "home";

    const menuSelected = (pathName = 'home') => {
        const navLinks = document.querySelectorAll('.nav-link');
        const item = {};

        navLinks.forEach(navLink => {
            item[navLink.name] = navLink;    
        });

        switch (pathName) {
            case 'home':
                item.home.classList.add('active');
            break;
            
            case 'pending':
                item.pending.classList.add('active');
            break;

            case 'order':
                item.order.classList.add('active');
            break;

            case 'layout':
                item.order.classList.add('active');
            break;

            default:
                item.home.classList.add('active');
            break;
        }
    }

    menuSelected(menuItem);
})();