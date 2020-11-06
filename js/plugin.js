(function () {
  Object.assign(xtl.plugin, {
    // 配置常量
    config: {
      ARROW_A: '<span name="minus">-</span><input type="text" value="1" name="count" /><span name="add">+</span><span name="desc">件(库存<label name="num">%num%</label>件)</span></span>',
      ARROW_B: '<ul><li><input type="text" value="1" name="count" /></li><li><span name="add">︿</span><span name="minus">﹀</span></li><li><span name="desc">件(库存<label name="num">%num%</label>件)</span></li></ul>',
      ARROW_C: '<span name="minus">-</span><input type="text" value="%number%" name="count" /><span name="add">+</span><span style="display:none" name="desc">件(库存<label name="num">%num%</label>件)</span>',
      PHONE_COLOR: '<span code="%id%" store="%store%">%name%</span>',
      STORE: '<span name="store">%store%</span>'
    },
    /*
    * @描述 tab切换
    */
    switchTab(target, list, css) {
      [... new Set(list)].forEach(item => {
        if (item !== target) {
          item.className = ''
        }
      })
      target.className ? target.className = '' : target.className = css
    },
    operateNumByCount() {

    },
    checkBoxStatus() {
      // document.body.onmousedown = function (e) {
      //   let target = e.target
      //   e.stopPropagation();
      //   if (target.nodeName == 'I') {
      //     if (target.className == 'checked') {
      //       target.className = 'unchecked'
      //       target.parentNode.parentNode.className = ''
      //       return
      //     }
      //     if (target.className == 'unchecked') {
      //       target.className = 'checked'
      //       target.parentNode.parentNode.className = 'sc-on'
      //       return
      //     }
      //   }
      // }

      document.body.onclick = function (e) {
        let target = e.target
        e.stopPropagation();
        if (target.nodeName == 'I') {
          if (target.className == 'checked') {
            target.className = 'unchecked'
            // target.parentNode.parentNode.className = ''
            return
          }
          if (target.className == 'unchecked') {
            target.className = 'checked'
            // target.parentNode.parentNode.className = 'sc-on'
            return
          }
        }
      }

    }
  });
})();
