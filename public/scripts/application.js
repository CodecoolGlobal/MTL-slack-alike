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

function setChannelAsActive() {
    let activeChannel = document.getElementById("active-channel");
        if (activeChannel !== null) {
            activeChannel.removeAttribute("id");
            activeChannel.removeAttribute("style");
        }
    this.setAttribute("id", "active-channel");
        this.style.backgroundColor = "#ededed";
        this.style.color = "#2e3732";
}