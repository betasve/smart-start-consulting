// Contact forms and lead tracking, shared by all pages with a contact form.
// GA events wait in the dataLayer and are only sent if the visitor accepted analytics cookies.
document.addEventListener('DOMContentLoaded', function () {
    var page = location.pathname.split('/').pop() || 'index.html';

    // Contact forms: send in the background and show the result next to the form
    document.querySelectorAll('form[action^="https://formspree.io/"]').forEach(function (form) {
        var button = form.querySelector('button[type="submit"]');
        var status = document.createElement('p');
        status.className = 'form-status';
        status.setAttribute('role', 'status');
        status.hidden = true;
        form.appendChild(status);

        function showStatus(text, type) {
            status.textContent = text;
            status.className = 'form-status' + (type ? ' form-status-' + type : '');
            status.hidden = false;
        }

        function submitNormally() {
            var submitted = false;
            function submit() {
                if (submitted) return;
                submitted = true;
                form.submit();
            }

            // GA isn't loaded without analytics consent: nothing to wait for
            if (!window.google_tag_manager) return submit();

            // Leaving the page cancels pending requests, so wait until GA has sent the event
            gtag('event', 'generate_lead', {
                form_location: page,
                submit_method: 'formspree_page',
                event_callback: submit,
                event_timeout: 1000
            });
            setTimeout(submit, 1500);
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            button.disabled = true;
            showStatus('Sending...', '');

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (!response.ok) {
                    // Rejected (e.g. reCAPTCHA is on for the form): record the lead, then fall back
                    // to a normal submit, so Formspree can show its own page and the message isn't lost
                    submitNormally();
                    return;
                }
                form.reset();
                showStatus('Thank you! Your message was sent. I\'ll reply within 1 business day.', 'success');
                gtag('event', 'generate_lead', { form_location: page, submit_method: 'inline' });
                button.disabled = false;
            }).catch(function () {
                showStatus('Sorry, your message could not be sent. Please check your connection and try again, or write to me on WhatsApp or LinkedIn.', 'error');
                button.disabled = false;
            });
        });
    });

    // Clicks on WhatsApp, Viber and LinkedIn links
    document.addEventListener('click', function (event) {
        var link = event.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href');
        var method = null;
        if (href.indexOf('https://wa.me/') === 0) method = 'whatsapp';
        else if (href.indexOf('viber:') === 0) method = 'viber';
        else if (href.indexOf('linkedin.com/') !== -1) method = 'linkedin';

        if (method) gtag('event', 'contact_click', { method: method });
    });
});
