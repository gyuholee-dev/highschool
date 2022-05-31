// 쿠키 저장
function setCookie(key, value, maxAge=3600) {
  document.cookie = `${key}=${value}; path=/; max-age=${maxAge};`;
}
// 쿠키 삭제
function delCookie(key) {
  document.cookie = `${key}=; path=/; max-age=0;`;
}
// 쿠키 불러오기
function getCookie(key) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split('=');
    if (cookie[0].trim() === key) {
      return cookie[1];
    }
  }
  return null;
}

// 비동기 지연
// https://coder-question-ko.com/cq-ko-blog/81552
// await timeout(1000);
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 윈도우 스크롤탑
function scrollToTop(speed = 'smooth') {
  window.scroll({top: 0, behavior: speed});
}

function test() {
  console.log('test');
}

export { 
  setCookie, 
  delCookie, 
  getCookie, 
  timeout, 
  scrollToTop,
  test
};