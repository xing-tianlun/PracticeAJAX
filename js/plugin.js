(function () {
  Object.assign(xtl.plugin, {
    // 配置常量
    config: {
      ARROW_A: '<span name="<span name="minus">-</span><input type="text" value="1" name="count" /><span name="add">+</span><span name="desc">件(库存<label name="num">%num%</label>件)</span>="num">12</label>件)</span>',
      ARROW_B: '<ul><li><input type="text" value="1" name="count" /></li><li><span name="add">︿</span><span name="minus">﹀</span></li><li><span name="desc">件(库存<label name="num">%num%</label>件)</span></li></ul>',
      PHONE_COLOR: '<span code="%id%" store="%store%">%name%</span>',
      STORE: '<span>%store%</span>'
    },
    /*
    * @描述 tab切换
    */
    switchTab(target, list, css) {
      [... new Set(list)].forEach(item => {
        if(item !== target) {
          item.className = ''
        }
      })
      target.className ? target.className='' : target.className = css
    },
    operateNumByCount() {

    }
  });
})();
