// Index page: mobile menu, footer year, Cal.com booking pop-up and quote requests.
document.addEventListener('DOMContentLoaded', function () {
    var CAL_LINK = 'svetoslav-beta-sve-blyahov-kjixr4/free-consultation-meeting';

    document.getElementById('displayDateYear').textContent = new Date().getFullYear();

    // Mobile menu: open/close with the menu button, close after picking a link
    var menuToggle = document.querySelector('.menu-toggle');
    var siteMenu = document.getElementById('site-menu');

    menuToggle.addEventListener('click', function () {
        var open = siteMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open);
        menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    siteMenu.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            siteMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', false);
            menuToggle.setAttribute('aria-label', 'Open menu');
        }
    });

    // Cal.com is loaded only when a visitor clicks a booking button, so nothing
    // from Cal.com runs before that. Without JavaScript the link opens the Cal.com page.
    function loadCal() {
        if (window.Cal) return;

        // Cal.com's embed loader: queues calls until embed.js has loaded
        (function (C, A, L) {
            var p = function (a, ar) { a.q.push(ar); };
            var d = C.document;
            C.Cal = C.Cal || function () {
                var cal = C.Cal;
                var ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement('script')).src = A;
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    var api = function () { p(api, arguments); };
                    var namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === 'string') {
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ['initNamespace', namespace]);
                    } else {
                        p(cal, ar);
                    }
                    return;
                }
                p(cal, ar);
            };
        })(window, 'https://app.cal.com/embed/embed.js', 'init');

        Cal('init', { origin: 'https://cal.com' });

        var booked = false;
        function onBooked() {
            if (booked) return;
            booked = true;
            gtag('event', 'book_call', { button_location: lastBookingButton });
        }
        Cal('on', { action: 'bookingSuccessfulV2', callback: onBooked });
        Cal('on', { action: 'bookingSuccessful', callback: onBooked });
    }

    var lastBookingButton = null;
    document.querySelectorAll('[data-book-call]').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            lastBookingButton = button.getAttribute('data-book-call');
            loadCal();
            Cal('modal', { calLink: CAL_LINK, config: { layout: 'month_view' } });
            gtag('event', 'book_call_click', { button_location: lastBookingButton });
        });
    });

    // "Get a quote" buttons: start the message with the service the visitor picked
    var message = document.getElementById('contact-message');
    document.querySelectorAll('[data-quote]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (!message.value) {
                message.value = 'Hi Svetoslav, I\'d like a quote for: ' + link.getAttribute('data-quote') + '.\n\n';
            }
            gtag('event', 'quote_click', { service: link.getAttribute('data-quote') });
        });
    });
});
