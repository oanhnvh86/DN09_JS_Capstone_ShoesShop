//! Scroll Top-----------------

function scrollTop() {
    var headerr = document.getElementById("scrollTopID");
    if (window.scrollY > 0) {
        headerr.classList.add("changeStyle");
    }
    else {
        headerr.classList.remove("changeStyle");
    }
}
window.addEventListener("scroll", scrollTop);

