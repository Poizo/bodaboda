window.onload = () => {
    let isInvitedAllDay = false;
    let slug = window.location.pathname;
    let currentLang = 'en';
    const frTitle = "Invitation au mariage de Charlotte Desmaret et Felix Ryckebusch";
    const nlTitle = "Uitnodiging voor het huwelijk van Charlotte Desmaret en Felix Ryckebusch";
    const mainInvitation = document.querySelector('.main-invitation');    

    if (slug === '/' || (slug !== '/boda' && slug !== '/fiesta')) {
        slug = '/fiesta';
        //  Uncomment to put on prod
        // window.location.pathname = slug;
    }
    isInvitedAllDay = slug === '/boda';

    ///////////////////////////
    document.querySelector('.choose-language-button.-fr').addEventListener('click', () => {
        chooseLanguage('fr'); 
    });
    document.querySelector('.choose-language-button.-nl').addEventListener('click', () => {
        chooseLanguage('nl');
    });
    //////////////////////


    const switchLang = (lang) => {
        currentLang = lang;
        mainInvitation.classList.add(`-${lang}`);
        document.querySelectorAll(`.lang__${lang === 'nl' ? 'fr' : 'nl'}`).forEach(el => {
            el.classList.add('hidden');
        });
        const htmlPage = document.getElementsByTagName('html')[0];
        htmlPage.lang = currentLang;
        document.querySelector('head title').textContent = currentLang === 'fr' ? frTitle : nlTitle;
    }

    const chooseLanguage = lang => {
        switchLang(lang);
        document.querySelector('.language-selection-page').classList.add('-disappear');
        mainInvitation.classList.remove('-invisible');
        document.querySelector('.aside-menu').classList.remove('hidden');
    }

}
