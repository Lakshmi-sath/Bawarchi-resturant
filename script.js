"use strict";

// End preload after the document is loaded

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
	preloader.classList.add("loaded");
	document.body.classList.add("loaded");
});

// Add event listener on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
	for (let i = 0, len = elements.length; i < len; i++) {
		elements[i].addEventListener(eventType, callback);
	}
};
// Navbar

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglerNavbar = function () {
	navbar.classList.toggle("active");
	overlay.classList.toggle("active");
	document.body.classList.toggle("nav-active");
};

addEventOnElements(navToggler, "click", togglerNavbar);

// Header & Back to Top

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]")

let lastScrollPos = 0;

const hideHeader = function () {
	const isScrollBottom = lastScrollPos < window.scrollY;
	if (isScrollBottom) {
		header.classList.add("hide");
	} else {
		header.classList.remove("hide");
	}
	lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
	if (window.scrollY >= 50) {
		header.classList.add("active");
		backTopBtn.classList.add("active");
		hideHeader();
	} else {
		header.classList.remove("active");
		backTopBtn.classList.remove("active");
	}
});

// HERO SLIDER

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPreBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
	lastActiveSliderItem.classList.remove("active");
	heroSliderItems[currentSliderPos].classList.add("active");
	lastActiveSliderItem = heroSliderItems[currentSliderPos];
};

const slideNext = function () {
	if (currentSliderPos >= heroSliderItems.length - 1) {
		currentSliderPos = 0;
	} else {
		currentSliderPos++;
	}
	updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
	if (currentSliderPos <= 0) {
		currentSliderPos = heroSliderItems.length - 1;
	} else {
		currentSliderPos--;
	}

	updateSliderPos();
};

heroSliderPreBtn.addEventListener("click", slidePrev);

// Auto Slide

let autoSlideInterval;

const autoSlide = function () {
	autoSlideInterval = setInterval(function () {
		slideNext();
	}, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPreBtn], "mouseover", function () {
	clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPreBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


// Parrallax Effect

const parrallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

	x = (event.clientX / window.innerWidth * 10) - 5;
	y = (event.clientY / window.innerWidth * 10) - 5;

	x = x - (x * 2);
	y = y - (y * 2);

	for (let i = 0, len = parrallaxItems.length; i < len; i++) {
		x = x * Number(parrallaxItems[i].dataset.parallaxSpeed);
		y = y * Number(parrallaxItems[i].dataset.parallaxSpeed);
		parrallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
	}
})