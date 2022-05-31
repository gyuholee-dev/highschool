import * as functions from "./functions.js";
import * as ui from "./ui.js";
window.HS = {}
Object.assign(HS, functions);
Object.assign(HS, ui);

const DOMLoaded = async()=>{
  // console.log("DOM LOADED");
  // HS.toggleMenu();
  // BLOG.UI.toggleMenu();

}
const WindowLoaded = async()=>{
  // console.log("WINDOW LOADED");

}

document.addEventListener("DOMContentLoaded", DOMLoaded);
window.addEventListener("load", WindowLoaded);
