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