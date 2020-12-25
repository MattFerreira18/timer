// verify internet access
const alertOnlineStatus = () => {

    const verifyInternet = navigator.onLine;

    if (verifyInternet === true) { return };
    if (verifyInternet === false) { window.alert(`Where's the internet???`) };

};

alertOnlineStatus();
