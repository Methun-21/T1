document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    // Flash message auto-hide
    setTimeout(() => {
        let flashMessages = document.querySelectorAll(".flash-message");
        flashMessages.forEach(msg => msg.style.display = "none");
    }, 3000);

    // Toggle sidebar on mobile
    let sidebarToggle = document.querySelector("#sidebarToggle");
    let sidebar = document.querySelector(".sidebar");

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", function () {
            sidebar.classList.toggle("active");
        });
    }
});
