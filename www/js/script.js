window.onload = () => {
    let isInvitedAllDay = false;
    let slug = window.location.pathname;
    if (slug === '/' || (slug !== '/boda' && slug !== '/fiesta')) {
        slug = '/fiesta';
        //  Uncomment to put on prod
        // window.location.pathname = slug;
    }
    isInvitedAllDay = slug === '/boda';

    if (isInvitedAllDay) {
        console.log('YOU ARE INVITED ALL DAY');
    } else {
        console.log('YOU SUCK');
    }


}