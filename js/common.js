/*
 * @描述 模板层
 *
*/
(function() {
  function $qS(css, el = document) {
    return el.querySelector(css)
  }
  function $qSA(css, el = document) {
    return el.querySelectorAll(css)
  }
  function getxmlhttp() {
    let xmlhttp
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return xmlhttp
  }
  function send(url, callback) {
    let xmlhttp = getxmlhttp()
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let data = JSON.parse(xmlhttp.responseText);
        callback(data);
      }
    }
    let time = new Date()
    xmlhttp.open('GET', url + '?time='+time.getTime(), true)
    xmlhttp.send()
  }
  function setCookie(key, value) {
    let date = new Date()
    let day = 2
    let expires
    date.setTime(date.getTime()+day*24*60*60*1000)
    expires = "expires="+date.toGMTString()
    document.cookie = key+'='+value+';'+expires;
  }
  function getCookie(key) {
    let arr = document.cookie.split(';')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      let ar = arr[i].split('=')
      obj[ar[0].trim()] = ar[1]
    }
    return obj[key]
  }
  function removeCookie(key) {
    let date = new Date()
    let day = -1
    let expires
    date.setTime(date.getTime()+day*24*60*60*1000)
    expires = "expires="+date.toGMTString()
    document.cookie = key+'='+getCookie(key)+';'+expires;
  }
  let obj = {
    $qS,
    $qSA,
    send,
    setCookie,
    getCookie,
    removeCookie,
    /*
    * @ 业务逻辑
    */
    methods: {},
    /*
    * @ 请求文件地址
    */
    service: {},
    /*
    * @ 组件和控件
    */
    plugin: {}
  }
  this.xtl = obj
})();
