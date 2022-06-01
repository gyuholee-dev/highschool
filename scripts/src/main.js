import * as functions from "./functions.js";
import * as ui from "./ui.js";
import { ImgSlide } from "./Imgslide.js";
import { NewsSlide } from "./NewsSlide.js";

window.HS = {}
Object.assign(HS, functions);
Object.assign(HS, ui);
HS.ImgSlide = ImgSlide;
HS.NewsSlide = NewsSlide;

const DOMLoaded = async()=>{
  // console.log("DOM LOADED");
  
  // 이미지슬라이드
  const slider = document.querySelector('#slider');
  const ImgSlide = new HS.ImgSlide(slider, 810, 20, 2500);
  ImgSlide.start();

  // 뉴스슬라이드
  const caster = document.querySelector('#caster');
  const NewsSlide = new HS.NewsSlide(caster, 50, 0, 3500);
  NewsSlide.start();

  // 노티스슬라이드
  const notice = document.querySelector('#notice');
  const NoticeSlide = new HS.NewsSlide(notice, 210, 0, 3500);
  NoticeSlide.start();

}
const WindowLoaded = async()=>{
  // console.log("WINDOW LOADED");

}

document.addEventListener("DOMContentLoaded", DOMLoaded);
window.addEventListener("load", WindowLoaded);
