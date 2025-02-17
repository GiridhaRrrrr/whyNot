// Toggle menu for a specific answer card
function toggleMenu(event) {
    let menu = event.currentTarget.nextElementSibling; // Get the menu specific to the clicked icon
    menu.style.display = menu.style.display === "block" ? "none" : "block";

    // Close other menus
    document.querySelectorAll(".answer-menu-options").forEach(m => {
        if (m !== menu) m.style.display = "none";
    });

    event.stopPropagation(); // Prevent document click from closing it immediately
}

// Toggle upvote for the clicked button
function toggleUpVote(button) {
    let upIcon = button.querySelector('.up');
    let downIcon = button.parentElement.querySelector('.down'); // Get the downvote icon in the same card

    upIcon.classList.toggle('red');
    
    if (downIcon && downIcon.classList.contains('red')) {
        downIcon.classList.remove("red");
    }
}

// Toggle downvote for the clicked button
function toggleDownVote(button) {
    let downIcon = button.querySelector('.down');
    let upIcon = button.parentElement.querySelector('.up'); // Get the upvote icon in the same card

    downIcon.classList.toggle('red');
    
    if (upIcon && upIcon.classList.contains('red')) {
        upIcon.classList.remove("red");
    }
}

// Close menus when clicking outside
document.addEventListener("click", function(event) {
    document.querySelectorAll(".answer-menu-options").forEach(menu => {
        if (!menu.contains(event.target) && !menu.previousElementSibling.contains(event.target)) {
            menu.style.display = "none";
        }
    });
});

// Attach event listeners to all menu icons
document.querySelectorAll(".menu-icon").forEach(icon => {
    icon.addEventListener("click", toggleMenu);
});
