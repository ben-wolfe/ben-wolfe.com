var hamburgerBtn   = document.querySelector("#hamburger");
var hamburgerLines = document.querySelectorAll("#hamburger span");
var dropdownMenu   = document.querySelector(".main-menu");
var menuItems      = document.querySelectorAll(".main-menu .menu-item");
var pageLink       = document.querySelectorAll(".main-menu a");

hamburgerBtn.addEventListener("click", function() {
	toggleDropdown();
});

pageLink.forEach(function(el) {
	el.addEventListener("click", function() {
		toggleDropdown();
	});
});

function toggleDropdown() {
	hamburgerLines.forEach(function(el) {
		el.classList.toggle("active");
	});
	menuItems.forEach(function(el) {
		el.classList.toggle("show");
	});
	dropdownMenu.classList.toggle("show");
}