window.onload = () => {
    let isInvitedAllDay = false;
    let slug = window.location.pathname;
    if (slug === '/' || (slug !== '/boda' && slug !== '/fiesta')) {
        slug = '/fiesta';
        //  Uncomment to put on prod
        // window.location.pathname = slug;
    }
    isInvitedAllDay = slug === '/boda';
    mainInvitation = document.querySelector('.main-invitation');


    document.querySelector('.choose-language-button.-fr').addEventListener('click', () => {
        document.querySelector('.language-selection-page').classList.add('-disappear');
        document.querySelectorAll('.lang__nl').forEach(el => {
            el.classList.add('hidden');
        });
        mainInvitation.classList.remove('-invisible');
        mainInvitation.classList.add('-fr');
    });
    
    document.querySelector('.choose-language-button.-nl').addEventListener('click', () => {
        document.querySelector('.language-selection-page').classList.add('-disappear');
        document.querySelectorAll('.lang__fr').forEach(el => {
            el.classList.add('hidden');
        });
        mainInvitation.classList.remove('-invisible');
        mainInvitation.classList.add('-nl');
    });


}
