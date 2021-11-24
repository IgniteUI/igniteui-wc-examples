import '@webcomponents/custom-elements/custom-elements.min';
import '@webcomponents/custom-elements/src/native-shim.js';
import "./assets/css/Scrollbars.css";

import { Router } from './router';

const BrowserInfo = require("./BrowserInfo.json"); // auto-generated
// logging versions of IG packages
for (const item of BrowserInfo) {
    console.log('SB uses v' + item.ver + ' ' + item.name);
}

Router.instance.connect(document.getElementById("router-target"));

document.querySelectorAll(".nav-link").forEach(nav => {
    let anchor = nav as HTMLAnchorElement;
    anchor.innerHTML = "&#9899;   " + anchor.innerText;
    anchor.onclick = (ev) => {
        let navPath = anchor.getAttribute("data-nav") as string;
        Router.instance.navigateTo(navPath);

        return false;
    }
});

document.querySelectorAll(".nav-component").forEach(element => {
    let navComponent = element as HTMLElement;
    navComponent.innerHTML = "&#10148; " + navComponent.innerText;
    let navList = document.getElementById(navComponent.id + "-list");
    navComponent.innerText += " (" + navList.children.length + ")";

    toggleVisibility(navList, false);
    navComponent.onclick = (ev) => {
        let state = navList.getAttribute("state") as string;
        toggleVisibility(navList, state !== "expanded");
        // if (state === "expanded") {
        //     console.log("nav onclick collapse ");
        //     navList.setAttribute("state", "collapsed");
        //     navList.setAttribute("style", "display: none;");
        //     // navComponent.innerText = "+ " + navText
        // } else {
        //     console.log("nav onclick expanded ");
        //     navList.setAttribute("state", "expanded");
        //     navList.setAttribute("style", "display: block;");
        //     // navComponent.innerText = "- " + navText Visibility
        // }
        return false;
    }
});

function toggleVisibility(element: HTMLElement, isVisible: boolean) {

    element.setAttribute("state", isVisible ? "expanded" : "collapsed");
    element.setAttribute("style", isVisible ? "display: block;" : "display: none;");
}
// let navComp = document.getElementById("nav-comp-cc");
// let navList = document.getElementById("nav-list-cc");

// navComp.onclick = (ev) => {

//     let state = navList.getAttribute("state") as string;
//     if (state === "expanded") {
//         console.log("nav onclick collapse ");
//         // navList.classList.remove("nav-list-expanded");
//         // navList.classList.add("nav-list-collapsed");
//         navList.setAttribute("state", "collapsed");
//         navList.setAttribute("style", "display: none; background: red;");
//     } else {
//         console.log("nav onclick expanded ");
//         // navList.classList.remove("nav-list-collapsed");
//         // navList.classList.add("nav-list-expanded");
//         navList.setAttribute("state", "expanded");
//         navList.setAttribute("style", "display: block; background: green;");
//     }
//     return false;
// }
