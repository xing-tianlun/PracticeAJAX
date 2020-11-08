/*
 * @描述 业务逻辑层
*/
(function() {
  // let methods = xtl.methods;
  // methods.go = methods

  /*
   * @ 描述 页面初始化跳转
   * @参数 url 可选 跳转地址
   *
  */
  function go(url) {
    if(url) {
      if(xtl.getCookie('username')) {
        location.href = url
      }
    }else {
      if(!xtl.getCookie('username')) {
        location.href = './01_index.html'
      }
    }
  }
  xtl.methods = {
    go
  }
  Object.assign(xtl.methods, {
    // attrs: {
    //   // @描述 搜索出的数据
    //   array: []
    // },
    searchByLabel() {
      let span = xtl.$qS('.s-type span.s-on')
      this.getNews(span)
    },
    sortBYtime(target) {
      let articles = xtl.$qSA('div.article')
      let arr = []
      let fragment = document.createDocumentFragment() // 创建虚拟DOM节点
      let attr
      for (let i = 0; i < articles.length; i++) {
        attr = articles[i].getAttribute('time')
        arr.push({
          time: +attr.replace(/-|:|\s/g, ""),
          el: articles[i]
        })
      }
      if(target.value == 1) {
        arr.sort((a,b) => {
          return a.time - b.time
        })
      }
      if(target.value == 2) {
        arr.sort((a,b) => {
          return  b.time - a.time
        })
      }
      xtl.$qS('.content').innerHTML = ''
      arr.forEach(item => {
        frgment.appendChild(item.el)
      })
      xtl.$qS('.content').appendChild(fragment); // 将虚拟DOM节点添加到真实的节点中
    },
    getNews(param) {
      let self = this
      xtl.send(xtl.service.news, function (msg) {
        let data = msg.result.data
        let arr = [];
        let lists = [];
        let txt = xtl.$qS('input[name=search]')
        let element;
        if(!param) {
          lists = data
        }else {
          for (let i = 0; i < data.length; i++) {
            if(data[i][param.getAttribute('name')] === txt.value) {
              lists.push(data[i])
            }
          }
        }
        // self.attrs.array = lists;
				for(var i=0;i<lists.length;i++){
					element = lists[i];
					arr.push('<div time="'+element.date+'" class="article" key="' + element.uniquekey + '">' +
              '<div class="ac-l">' +
              '<img src="' + element['thumbnail_pic_s'] + '">'
              + '</div>' +
              '<div class="ac-r">' +
              '<a href="' + element.url + '"target="_blank">' + element.title + '</a>' +
              '<p>' + '作者:' + element.author_name + ' 来源:' + element.category + ' 时间:' + element.date + '</p>' +
              (element.thumbnail_pic_s02 ? '<img src="' + element.thumbnail_pic_s02 + '"/>' : '') +
              (element.thumbnail_pic_s03 ? '<img src="' + element.thumbnail_pic_s03 + '"/>' : '')
              + '</div>'
              + '</div>')
				}
				xtl.$qS('.content').innerHTML = arr.join('');
      })
    },
    /*
    * @ 将search或hash转换成键值对
    */
    changeHashToObj(key) {
      let hash = location.hash.substring(1)
      let arr = hash.split('&')
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        let ar = arr[i].split('=')
        obj[ar[0]] = ar[1]
      }
      return obj[key]
    },
    /*
    * @描述 去除字符串所有空格
    */
    trim(s) {
      let reg = /\s/g
      return s.replace(reg, "")
    }
  })

})();
