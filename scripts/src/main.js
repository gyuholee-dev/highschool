import * as functions from "./functions.js";
import * as ui from "./ui.js";
import { ImgSlide } from "./Imgslide.js";

window.HS = {}
Object.assign(HS, functions);
Object.assign(HS, ui);
HS.ImgSlide = ImgSlide;

const DOMLoaded = async()=>{
  // console.log("DOM LOADED");
  
  // 이미지슬라이드
  const slider = document.querySelector('#slider');
  const ImgSlide = new HS.ImgSlide(slider, 810, 20, 2500);
  ImgSlide.start();

}
const WindowLoaded = async()=>{
  // console.log("WINDOW LOADED");

}

document.addEventListener("DOMContentLoaded", DOMLoaded);
window.addEventListener("load", WindowLoaded);
