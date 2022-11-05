window.onload = () => {
    let isInvitedAllDay = false;
    let slug = window.location.pathname;
    let currentLang = 'en';
    const frTitle = "Invitation au mariage de Charlotte Desmaret et Felix Ryckebusch";
    const nlTitle = "Uitnodiging voor het huwelijk van Charlotte Desmaret en Felix Ryckebusch";
    const mainInvitation = document.querySelector('.main-invitation');  
    const asideMenu = document.querySelector('.aside-menu');
    const menuOpener = document.querySelector('.aside-menu__opener');
    const menuOverlay = document.querySelector('.aside-menu__overlay');

    if (slug === '/' || (slug !== '/boda' && slug !== '/fiesta')) {
        slug = '/fiesta';
        //  Uncomment to put on prod
        // window.location.pathname = slug;
    }
    isInvitedAllDay = slug === '/boda';



    const checkSafariBrowser = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/.*safari.*/.test(userAgent) && !/.*chrome.*/.test(userAgent)) {
            alert(`
                It looks like you're using Safari Browser, we invite you to switch to another browser like 'Google Chrome' for example. It will provide you a better experience, because Safari doesn't fully support every feature of this web application.

                Il semblerait que vous utilisiez le navigateur Safari, nous vous invitons à passer sur un autre navigateur comme 'Google Chrome' par exemple. Cela vous offrira une meilleure expérience, car Safari ne prend pas entièrement en charge toutes les fonctionnalités de cette application Web.

                Het lijkt erop dat je de Safari browser gebruikt, wij schakelen liever over naar een andere browser zoals bijvoorbeeld 'Google Chrome'. Dit geeft u een betere ervaring, aangezien Safari niet alle functies van deze webtoepassing volledig ondersteunt.
            `);
        }
    }

    const switchLang = (lang) => {
        currentLang = lang;
        const otherLang = lang === 'fr' ? 'nl' : 'fr';
        mainInvitation.classList.add(`-${lang}`);
        mainInvitation.classList.remove(`-${otherLang}`);
        menuOpener.classList.add(`-${lang}`);
        menuOpener.classList.remove(`-${otherLang}`);
        document.querySelector(`[data-lang="${lang}"]`).classList.add('-active');
        document.querySelector(`[data-lang="${otherLang}"]`).classList.remove('-active');
        document.querySelectorAll(`.lang__${otherLang}`).forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll(`.lang__${lang}`).forEach(el => {
            el.classList.remove('hidden');
        });
        const htmlPage = document.getElementsByTagName('html')[0];
        htmlPage.lang = currentLang;
        document.querySelector('head title').textContent = currentLang === 'fr' ? frTitle : nlTitle;
    }

    const chooseLanguage = (lang) => {
        switchLang(lang);
        document.querySelector('.language-selection-page').classList.add('-disappear');
        mainInvitation.classList.remove('-invisible');
        document.querySelector('.aside-menu').classList.remove('hidden');
    }


    
    ///////////////////////////

    checkSafariBrowser();

    ///////////////////////////
    document.querySelector('.choose-language-button.-fr').addEventListener('click', () => {
        chooseLanguage('fr');
        asideMenu.classList.remove('out-of-flow');
        menuOverlay.classList.remove('out-of-flow');
        menuOpener.classList.remove('out-of-flow');
    });
    document.querySelector('.choose-language-button.-nl').addEventListener('click', () => {
        chooseLanguage('nl');
        asideMenu.classList.remove('out-of-flow');
        menuOverlay.classList.remove('out-of-flow');
        menuOpener.classList.remove('out-of-flow');
    });
    
    menuOpener.addEventListener('click', () => {
        menuOpener.classList.toggle('-open');
        menuOverlay.classList.toggle('-open');
        asideMenu.classList.toggle('-open');
        mainInvitation.classList.toggle('-blurred');
    });
    
    menuOverlay.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('aside-menu__overlay')) {
            menuOpener.classList.remove('-open');
            menuOverlay.classList.remove('-open');
            asideMenu.classList.remove('-open');
            mainInvitation.classList.remove('-blurred');
        }
    });

    document.querySelectorAll('button.language-button').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLang(btn.dataset.lang);
        });
    });

    //////////////////////

}
