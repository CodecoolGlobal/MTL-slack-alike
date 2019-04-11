"use strict";

window.onload = function() {
    loadEventListenerForChangeLogoColor();
};

function loadEventListenerForChangeLogoColor() {
    let logo = document.getElementById("logo");
    logo.addEventListener("mouseover", changeImageOnHover);
    logo.addEventListener("mouseout", changeImageOnMouseOut);
}

function changeImageOnHover() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "assets/images/logo/logo_mini-colored.png")
}

function changeImageOnMouseOut() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "assets/images/logo/logo_mini.png")
}