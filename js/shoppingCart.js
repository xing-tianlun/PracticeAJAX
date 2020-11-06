(function () {
  function go() {
    if (!xtl.getCookie('username')) {
      location.href = '../01_index.html'
    }
    setUserName()
  }
  console.log(xtl.$qS('div.quit a'));
  xtl.$qS('div.quit a').onclick = function () {
    xtl.removeCookie('username', ';path=/2020-10/ajax')
    history.go(0)
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
    // xtl.$qS('ul.sc').onmouseup = function (e) {
    //   let target = e.target
    //   let ck = xtl.$qS('i[name=ck]')
    //   let chks = xtl.$qSA('i[name=chk]')
    //   let flag = true;
    //   if (target.nodeName == 'I') {
    //     if (target.getAttribute('name') === 'chk') {
    //       for (let i = 0; i < chks.length; i++) {
    //         if (chks[i].className == 'unchecked') {
    //           console.log(1);
    //           flag = false
    //           break
    //         }
    //       }
    //       ck.className = flag ? 'checked' : 'unchecked';
    //     }
    //   }
    // }
    xtl.$qS('ul.sc').onclick = function (e) {
      var target = e.target;
      var ck = xtl.$qS('i[name=ck]');
      var chks = xtl.$qSA('i[name=chk]');
      var arr = [];
      var flag = true
      if (target.nodeName === 'I') {
        if (target.getAttribute('name') === 'chk') {
          setTimeout(function () {
            if (target.className === 'checked') {
              target.parentNode.parentNode.className = 'sc-on';
            } else {
              target.parentNode.parentNode.className = ''
            }
            for (var i = 0; i < chks.length; i++) {
              if (chks[i].className !== 'checked') {
                flag = false;
                break;
              }
            }
            if (flag == true) {
              ck.className = 'checked';
            } else {
              ck.className = 'unchecked';
            }
          }, 1);
        }
      }
    }
  }
  // function loadPlaugin() { // plugin-count-a
  //   // ARROW_C
  //   let pluginCounts = xtl.$qSA('.plugin-count-a')
  //   let plugin = xtl.plugin
  //   let str = ''
  //   str = plugin.config.ARROW_C.replace(/%num%/g, 12);
  //   [... new Set(pluginCounts)].forEach(item => {
  //     item.innerHTML= str;
  //   })
  // }
  /*
  * @描述 加载购物车
  */
  function loadShopping() {
    let ul = xtl.$qS('ul.sc')
    let child = ul.childNodes;
    let shop = xtl.getCookie('shop_' + xtl.getCookie('username'))
    let obj = JSON.parse(shop)
    let node;
    for (let i = 0; i < child.length; i++) {
      if (child[i].nodeType == 8) {
        node = child[i].nodeValue
        break
      }
    }
    getJSON(obj, node)
  }
  function getJSON(param, s) {
    xtl.send(xtl.service.subproduct, function (msg) {
      let ul = xtl.$qS('ul.sc')
      let obj = {}
      let arr = []
      let id, title, price, plugin
      for (const index in param) {
        if (param.hasOwnProperty(index)) {
          obj[index] = {
            num: param[index].num,
            val: msg[index],
            id: index
          }
        }
      }
      for (const index in obj) {
        id = s.replace(/%id%/g, index)
        title = id.replace(/%title%/, obj[index].val.title)
        price = title.replace(/%price%/, obj[index].val.price)
        plugin = price.replace(/%plugin%/,function () {
          return xtl.plugin.config.ARROW_C.replace(/%num%/g, obj[index].val.inventory).replace(/%number%/, obj[index].num)
        }())
        arr.push(plugin)
      }
      ul.innerHTML = arr.join('')
    })
  }
  function init() {
    go()
    xtl.plugin.checkBoxStatus()
    operateFn()
    // loadPlaugin()
    loadShopping()
  }
  init()
})();
