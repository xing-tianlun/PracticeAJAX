(function() {
  function go() {
    if (!xtl.getCookie('username')) {
      location.href = '../01_index.html'
    }
    setUserName()
  }
  function setUserName() {
    xtl.$qS('span[name=login]').innerText = xtl.getCookie('username')
  }
  /*
  * @描述 初始化数据
  */
  function getData() {
    xtl.send(xtl.service.subproduct, function(msg) {
      operateData(msg)
    })
  }
  /*
  * @描述 处理模板数据
  */
  function operateData(msg) {
    let odiv = xtl.$qS('.c-r')
    let child = odiv.childNodes
    let data = msg[xtl.methods.changeHashToObj('id')]
    let plugin = xtl.plugin
    let config = plugin.config
    let node
    let title, price, comment, sell, address, phone, store, count;
    for (let i = 0; i < child.length; i++) {
      if(child[i].nodeType == 8) {
        node = child[i].nodeValue
        break
      }
    }
    title = node.replace(/%title%/g, data.title)
    price = title.replace(/%price%/g, data.price)
    comment = price.replace(/%comment%/g, data.comment)
    sell = comment.replace(/%sell%/g, data.sell)
    address = sell.replace(/%address%/g, data.address)
    phone = address.replace(/%phone%/g, function () {
      let color = data.color
      let c_arr = []
      let id, store, name
      for (let i = 0; i < color.length; i++) {
        id = config.PHONE_COLOR.replace(/%id%/g, xtl.methods.changeHashToObj('id'))
        store = id.replace(/%store%/, color[i].store.join(';'))
        name = store.replace(/%name%/, color[i].name)
        c_arr.push(name)
      }
      return c_arr.join('')
    }())
    store = phone.replace(/%store%/g, function() {
      let store = data.store
      let s_arr = []
      let element
      for (let i = 0; i < store.length; i++) {
        element = config.STORE.replace(/%store%/g, store[i])
        s_arr.push(element)
      }
      return s_arr.join('')
    }())
    // count = store.replace(/%count%/g, data.count)
    odiv.innerHTML = store
  }
  /*
  * @描述 所有事件集合
  */
  function operateFn() {
    // 给ps-b添加委托 实现商品图片展示的切换
    xtl.$qS('.ps-b').onmouseover = function(e) {
      let target = e.target
      if(target.nodeName === 'IMG') {
        clearClass(xtl.$qSA('.ps-b span', this), 'on')
        addClass(target.parentNode, 'on', function(el) {
          xtl.$qS('.ps-t img').src = '../img/phone'+ el.getAttribute('name') +'.jpg'
        })
      }
    }
  }
  function clearClass(lists, css) {
    for (let i = 0; i < lists.length; i++) {
      lists[i].className = ''
    }
  }
  function addClass(target, css, callback) {
    target.className = css
    callback(target)
  }
  // @描述 初始化
  function init() {
    go()
    operateFn()
    getData()
  }
  init()
})();
