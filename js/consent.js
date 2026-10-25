// Cookie consent banner (CookieConsent v3 by Orest Bida).
// Google Analytics is loaded only after the visitor accepts analytics cookies,
// the LinkedIn Insight Tag only after they accept marketing cookies.
(function () {
    var GA_ID = 'G-MSQCJPZYLT';
    var LINKEDIN_PARTNER_ID = '11168665';
    // Conversion IDs from LinkedIn Campaign Manager (Data → Conversions); null = not set up yet
    var LINKEDIN_CONVERSIONS = {
        generate_lead: null,
        book_call: null,
        contact_click: null
    };
    var gaLoaded = false;
    var linkedinLoaded = false;

    function enableAnalytics() {
        gtag('consent', 'update', { 'analytics_storage': 'granted' });

        if (gaLoaded) return;
        gaLoaded = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);
    }

    function enableMarketing() {
        if (linkedinLoaded) return;
        linkedinLoaded = true;

        window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

        // LinkedIn's loader: queues lintrk() calls until insight.min.js has loaded
        window.lintrk = window.lintrk || function (a, b) { window.lintrk.q.push([a, b]); };
        window.lintrk.q = window.lintrk.q || [];

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        document.head.appendChild(script);
    }

    function applyConsent() {
        if (CookieConsent.acceptedCategory('analytics')) enableAnalytics();
        if (CookieConsent.acceptedCategory('marketing')) enableMarketing();
    }

    // Used by tracking.js and site.js: sends a lead to LinkedIn, only with marketing consent
    window.linkedinConversion = function (name) {
        var id = LINKEDIN_CONVERSIONS[name];
        if (id && linkedinLoaded) window.lintrk('track', { conversion_id: id });
    };

    CookieConsent.run({
        // Bumped when categories change, so visitors who chose before are asked again
        revision: 1,

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
            },
            marketing: {
                autoClear: {
                    cookies: [{ name: 'li_fat_id' }, { name: 'li_giant' }, { name: 'ln_or' }],
                    reloadPage: true
                }
            }
        },

        onConsent: applyConsent,
        onChange: applyConsent,

        language: {
            default: 'en',
            // Picks the translation from the page's <html lang>
            autoDetect: 'document',
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'We use analytics cookies to understand how visitors use this website, and marketing cookies to measure our LinkedIn ads. They are only set if you accept them. <a href="privacy.html">Privacy Policy</a>',
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
                                title: 'Marketing',
                                description: 'The LinkedIn Insight Tag tells us whether visitors came from our LinkedIn ads and whether they got in touch. LinkedIn can link your visit to your LinkedIn account and use it to show you ads.',
                                linkedCategory: 'marketing',
                                cookieTable: {
                                    headers: { name: 'Cookie', expiration: 'Expires', description: 'Purpose' },
                                    body: [
                                        { name: 'li_fat_id', expiration: '30 days', description: 'Links a visit to the LinkedIn ad that was clicked' },
                                        { name: 'li_giant', expiration: '7 days', description: 'Measures ad conversions' },
                                        { name: 'ln_or', expiration: '1 day', description: 'Checks whether the tag should run' },
                                        { name: 'bcookie, lidc, li_sugr, UserMatchHistory, AnalyticsSyncHistory', expiration: 'up to 1 year', description: 'Set by linkedin.com: identifies the browser and measures ads' }
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
                        description: 'Използваме аналитични бисквитки, за да разберем как посетителите използват сайта, и маркетингови бисквитки, за да измерваме рекламите си в LinkedIn. Те се записват само ако ги приемете. <a href="privacy.html">Политика за поверителност</a>',
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
                                    headers: { name: 'Бисквитка', expiration: 'Валидност', description: 'Цел' },
                                    body: [
                                        { name: '_ga', expiration: '2 години', description: 'Разграничава уникалните посетители' },
                                        { name: '_ga_*', expiration: '2 години', description: 'Пази състоянието на сесията' }
                                    ]
                                }
                            },
                            {
                                title: 'Маркетингови',
                                description: 'LinkedIn Insight Tag ни показва дали посетителите са дошли от рекламите ни в LinkedIn и дали са се свързали с нас. LinkedIn може да свърже посещението ви с профила ви в LinkedIn и да го използва, за да ви показва реклами.',
                                linkedCategory: 'marketing',
                                cookieTable: {
                                    headers: { name: 'Бисквитка', expiration: 'Валидност', description: 'Цел' },
                                    body: [
                                        { name: 'li_fat_id', expiration: '30 дни', description: 'Свързва посещението с рекламата в LinkedIn, върху която е кликнато' },
                                        { name: 'li_giant', expiration: '7 дни', description: 'Измерва резултатите от рекламите' },
                                        { name: 'ln_or', expiration: '1 ден', description: 'Проверява дали тагът трябва да се изпълни' },
                                        { name: 'bcookie, lidc, li_sugr, UserMatchHistory, AnalyticsSyncHistory', expiration: 'до 1 година', description: 'Записват се от linkedin.com: разпознават браузъра и измерват рекламите' }
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
