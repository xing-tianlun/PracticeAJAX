(function () {
  function go() {
    if (!xtl.getCookie('username')) {
      location.href = '../01_index.html'
    }
    setUserName()
  }
  function setUserName() {
    xtl.$qS('span[name=login]').innerText = xtl.getCookie('username')
  }
  function operateFn() {
    /*
    * @描述 操作checkbox
    */
    xtl.$qS('i[name=ck]').onclick = function (e) {
      let chks = xtl.$qSA('i[name=chk]')
      for (let i = 0; i < chks.length; i++) {
        if (this.className === 'checked') {
          chks[i].className = 'unchecked'
          chks[i].parentNode.parentNode.className = ''
        }
        if (this.className === 'unchecked') {
          chks[i].className = 'checked'
          chks[i].parentNode.parentNode.className = 'sc-on'
        }
      }
    }
    xtl.$qS('ul.sc').onmouseup = function (e) {
      let target = e.target
      let ck = xtl.$qS('i[name=ck]')
      let chks = xtl.$qSA('i[name=chk]')
      let flag = true;
      if (target.nodeName == 'I') {
        if (target.getAttribute('name') === 'chk') {
          for (let i = 0; i < chks.length; i++) {
            if (chks[i].className == 'unchecked') {
              console.log(1);
              flag = false
              break
            }
          }
          ck.className = flag ? 'checked' : 'unchecked';
        }
      }
    }
  }
  function init() {
    go()
    xtl.plugin.checkBoxStatus()
    operateFn()
  }
  init()
})();
