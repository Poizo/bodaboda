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
        //TODO: Uncomment to put on prod
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
        asideMenu.classList.add(`-${lang}`);
        asideMenu.classList.remove(`-${otherLang}`);
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
        mainInvitation.classList.remove('-invisible', 'out-of-flow');
        document.querySelector('.aside-menu').classList.remove('hidden');
    }


    
    /////////////////////////// Safari Alert

    checkSafariBrowser();

    /////////////////////////// Listeners
    document.querySelector('.choose-language-button.-fr').addEventListener('click', () => {
        chooseLanguage('fr');
        asideMenu.classList.remove('out-of-flow');
        menuOverlay.classList.remove('out-of-flow');
        menuOpener.classList.remove('out-of-flow');
        makeCounter();
    });
    document.querySelector('.choose-language-button.-nl').addEventListener('click', () => {
        chooseLanguage('nl');
        asideMenu.classList.remove('out-of-flow');
        menuOverlay.classList.remove('out-of-flow');
        menuOpener.classList.remove('out-of-flow');
        makeCounter();
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

    document.querySelectorAll('.aside-menu__content-links a').forEach(a => {
        a.addEventListener('click', () => {
            setTimeout(() => {
                menuOverlay.dispatchEvent(new Event('click'));
            }, 150);
        })
    });

    ////////////////////// Check Is Invite All Day
    if (!isInvitedAllDay) {
        // document.querySelectorAll('[data-isAllDay]').forEach(el => el.remove());
    }

    function makeCounter() {
        const weddingDate = new Date('June 17, 2023 12:00:00');
        const restSecond = Math.floor(weddingDate.getTime() / 1000 - new Date().getTime() / 1000);
        const restMinutes = restSecond / 60;
        const resthours = restMinutes / 60;
        const restDays = resthours / 24;

        let countDay = Math.floor(restDays);
        let countHours = Math.floor(resthours - countDay * 24);
        let countMinutes = Math.floor(restMinutes - Math.floor(resthours) * 60);
        let countSeconds = Math.floor(((restSecond - countDay *24*60*60) - countHours * 60 * 60) - countMinutes * 60);

        const counterDays = document.querySelector('.uncounter .count-days');
        const counterhours = document.querySelector('.uncounter .count-hours');
        const counterMinutes = document.querySelector('.uncounter .count-minutes');
        const counterSeconds = document.querySelector('.uncounter .count-seconds');
        
        counterDays.textContent = countDay;
        counterhours.textContent = countHours;
        counterMinutes.textContent = countMinutes;
        counterSeconds.textContent = countSeconds;

        if (countSeconds < 0) {
            countSeconds = 0;
        }

        const interval = setInterval(() => {
            countSeconds--;
            if (countSeconds <= 0 && (countHours > 0 || countDay > 0 || countMinutes > 0)) {
                countSeconds = 59;

                if (countMinutes > 0) {
                    countMinutes--;
                } else {
                    if (countHours > 0 || countDay > 0) {
                        countMinutes = 59;

                        if (countHours > 0) {
                            countHours--;
                        } else {
                            countDay--;
                            countHours = 23;
                        }
                    }
                }

            } else {
                if (countDay <= 0 &&
                    countHours <= 0 &&
                    countMinutes <= 0 &&
                    countSeconds <= 0
                    ) {
                    counterSeconds.textContent = 0;
                    console.log('WEDDING!');
                    clearInterval(interval);
                }
            }
            counterDays.textContent = countDay;
            counterhours.textContent = countHours;
            counterMinutes.textContent = countMinutes;
            counterSeconds.textContent = countSeconds;
        }, 1000);
    }
}
