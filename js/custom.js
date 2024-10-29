
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

    var readMoreButton = document.getElementById("show-description");
    var consultationsDescription = document.getElementById("professional-description");

    readMoreButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        readMoreButton.setAttribute("class", "hidden");
        consultationsDescription.setAttribute("class", "");
    });

    document.getElementById('contact-me').addEventListener('click', function(event){
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
        document.getElementById('textarea').textContent = "I would want to use my 2 hours of free consultation time to ask you about...";

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