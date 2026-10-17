// Cookie consent banner (CookieConsent v3 by Orest Bida).
// Google Analytics is loaded only after the visitor accepts analytics cookies.
(function () {
    var GA_ID = 'G-MSQCJPZYLT';
    var gaLoaded = false;

    function enableAnalytics() {
        gtag('consent', 'update', { 'analytics_storage': 'granted' });

        if (gaLoaded) return;
        gaLoaded = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);
    }

    CookieConsent.run({
        guiOptions: {
            consentModal: { layout: 'box', position: 'bottom right' },
            preferencesModal: { layout: 'box' }
        },

        categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: {
                autoClear: {
                    cookies: [{ name: /^_ga/ }],
                    // Reload so the already loaded GA script stops running
                    reloadPage: true
                }
            }
        },

        onConsent: function () {
            if (CookieConsent.acceptedCategory('analytics')) enableAnalytics();
        },

        onChange: function () {
            if (CookieConsent.acceptedCategory('analytics')) enableAnalytics();
        },

        language: {
            default: 'en',
            // Picks the translation from the page's <html lang>
            autoDetect: 'document',
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'We use analytics cookies to understand how visitors use this website, so we can improve it. They are only set if you accept them. <a href="privacy.html">Privacy Policy</a>',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        showPreferencesBtn: 'Manage preferences'
                    },
                    preferencesModal: {
                        title: 'Cookie preferences',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        savePreferencesBtn: 'Save preferences',
                        closeIconLabel: 'Close',
                        sections: [
                            {
                                title: 'Strictly necessary',
                                description: 'Required for the website to work, for example to remember your cookie choice. These cannot be turned off.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analytics',
                                description: 'Google Analytics cookies help us understand which pages are visited and how visitors find this website. The data is aggregated and not used to identify you.',
                                linkedCategory: 'analytics',
                                cookieTable: {
                                    headers: { name: 'Cookie', expiration: 'Expires', description: 'Purpose' },
                                    body: [
                                        { name: '_ga', expiration: '2 years', description: 'Distinguishes unique visitors' },
                                        { name: '_ga_*', expiration: '2 years', description: 'Keeps the session state' }
                                    ]
                                }
                            },
                            {
                                title: 'More information',
                                description: 'Read the <a href="privacy.html">Privacy Policy</a> for details on how your data is handled and how to contact us.'
                            }
                        ]
                    }
                },
                bg: {
                    consentModal: {
                        title: 'Използваме бисквитки',
                        description: 'Използваме аналитични бисквитки, за да разберем как посетителите използват сайта и да го подобряваме. Те се записват само ако ги приемете. <a href="privacy.html">Политика за поверителност</a>',
                        acceptAllBtn: 'Приемам всички',
                        acceptNecessaryBtn: 'Отказвам всички',
                        showPreferencesBtn: 'Настройки'
                    },
                    preferencesModal: {
                        title: 'Настройки за бисквитки',
                        acceptAllBtn: 'Приемам всички',
                        acceptNecessaryBtn: 'Отказвам всички',
                        savePreferencesBtn: 'Запазване на настройките',
                        closeIconLabel: 'Затваряне',
                        sections: [
                            {
                                title: 'Задължителни',
                                description: 'Нужни са, за да работи сайтът, например за да запомни избора ви за бисквитките. Не могат да бъдат изключени.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Аналитични',
                                description: 'Бисквитките на Google Analytics ни помагат да разберем кои страници се посещават и как посетителите намират сайта. Данните са обобщени и не се използват, за да ви идентифицират.',
                                linkedCategory: 'analytics',
                                cookieTable: {
                                    headers: { name: 'Бисквитка', expiration: 'Валидност', description: 'Предназначение' },
                                    body: [
                                        { name: '_ga', expiration: '2 години', description: 'Разграничава уникалните посетители' },
                                        { name: '_ga_*', expiration: '2 години', description: 'Пази състоянието на сесията' }
                                    ]
                                }
                            },
                            {
                                title: 'Повече информация',
                                description: 'В <a href="privacy.html">Политиката за поверителност</a> ще намерите подробности за това как се обработват данните ви и как да се свържете с нас.'
                            }
                        ]
                    }
                }
            }
        }
    });
})();
