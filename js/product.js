/*
* @描述 淘宝页面
*/
(function () {
  /*
  * @描述 获取产品列表
  */
  function getProductLists() {
    let content = xtl.$qS('.content div')
    let child = content.childNodes
    let arr = []
    let product, val
    // 注释节点的nodeType是 8
    for (let i = 0; i < child.length; i++) {
      if (child[i].nodeType == 8) {
        product = child[i]
        break
      }
    }
    val = product.nodeValue
    getProductJson(val)
  }
  function getProductJson(v) {
    xtl.send(xtl.service.product, function (msg) {
      let content = xtl.$qS('.content div')
      let arr = []
      let template = xtl.$qS('script[name=template]')
      let id, pic, img, price, sell, url, shop, address, temp;
      for (let i = 0; i < msg.length; i++) {
        id = v.replace(/%id%/g, msg[i].id);
        pic = id.replace(/%pic%/g, msg[i].pic);
        img = pic.replace(/%img%/g, msg[i].pic);
        price = img.replace(/%price%/g, msg[i].price);
        sell = price.replace(/%sell%/g, msg[i].sell);
        url = sell.replace(/%url%/g, msg[i].url.title);
        shop = url.replace(/%shop%/g, msg[i].shop);
        address = shop.replace(/%address%/g, msg[i].address);
        temp = address.replace(/%template%/g, function() {
          let app = []
          for (let j = 0; j < msg[i].icon.length; j++) {
            app.push(template.innerText.replace(/%icon%/, msg[i].icon[j]))
          }
          return app.join('')
        }())
        arr.push(temp);
      }
      content.innerHTML = arr.join('')
    })
  }
  // console.log('source'+'数据源');
  function go() {
    if (!xtl.getCookie('username')) {
      location.href = '../01_index.html'
    }
    setUserName()
  }
  function setUserName() {
    xtl.$qS('span[name=login]').innerText = xtl.getCookie('username')
  }
  // @描述 初始化
  function init() {
    go()
    getProductLists()
  }
  init()
})();
