
document.addEventListener('DOMContentLoaded', evt => {
    /*
    var boxes = document.getElementsByClassName('feature_element');

    if (boxes) {
        Array.from(boxes).forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`element ${e} clicked`);
            });
        });
    }
    */
    // Get Current Year
    function getCurrentYear() {
        var d = new Date();
        var year = d.getFullYear();
        document.querySelector("#displayDateYear").innerText = year;
    }
    getCurrentYear()

    // Mobile menu: open/close with the menu button, close after picking a link
    var menuToggle = document.querySelector(".menu_toggle");
    var siteMenu = document.getElementById("site-menu");

    menuToggle.addEventListener("click", function() {
        var open = siteMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", open);
    });

    siteMenu.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            siteMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", false);
        }
    });

    var readMoreButton = document.getElementById("show-description");
    var consultationsDescription = document.getElementById("professional-description");

    readMoreButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        readMoreButton.setAttribute("class", "hidden");
        consultationsDescription.setAttribute("class", "");
    });

    document.getElementById('contact-me-button').addEventListener('click', function(event){
        gtag(
            'event',
            'button_click', 
            {
                'event_category': 'engagement',
                'event_label': 'Contact Me',
                'value': 1
            }
        )
    });

    document.getElementById('show-description').addEventListener('click', function(event){
        gtag(
            'event',
            'button_click', 
            {
                'event_category': 'engagement',
                'event_label': 'Read More',
                'value': 1
            }
        )
    });

    document.getElementById('free-consultation').addEventListener('click', function(event){
        // .value (not .textContent) so it also works after the visitor typed in the field
        var message = document.getElementById('textarea');
        if (!message.value) {
            message.value = "I would want to use my 2 hours of free consultation time to ask you about...";
        }

        gtag(
            'event',
            'button_click', 
            {
                'event_category': 'engagement',
                'event_label': 'Free Consultation Button',
                'value': 1
            }
        );
    });
});