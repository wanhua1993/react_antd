// 获取cookie
function getCookie(key) {
  const name = key + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// 设置cookie,默认是1天
function setCookie(key, value) {
  const d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toGMTString();
  document.cookie = key + "=" + value + "; " + expires;
}
// 设置 localstorage
function setStorage(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}
// 获取 localstorage
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export {
  getCookie,
  setCookie,
  setStorage,
  getStorage
}