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
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'We use analytics cookies to understand how visitors use this website, so we can improve it. They are only set if you accept them.',
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
                            }
                        ]
                    }
                }
            }
        }
    });
})();
