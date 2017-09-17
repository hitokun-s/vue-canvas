(function (){
  var drawFuncs = [];

  Vue.directive('canvas', {
    bind: function (el, binding, vnode) {

      console.log("bind");
      console.log(vnode.children);

      var children = vnode.children.filter(function(child){
        return child.componentOptions;
      });
      console.log("children count:" + children.length);

      children.sort(function(child1, child2){
        console.log("child1", child1);
        console.log("child2", child2);
        // console.log(child1.componentInstance.ord);
        // console.log(child2.componentInstance.ord);
        // return (parseInt(child1.componentInstance.ord) || 9999) - (parseInt(child2.componentInstance.ord) || 9999);
        return (parseInt(child1.componentOptions.propsData.ord) || 9999) - (parseInt(child2.componentOptions.propsData.ord) || 9999);

      });

      if(drawFuncs.length == 0){
        drawFuncs = children.map(function(child){
          console.log(child.componentInstance);
          return child.componentInstance.draw;
          // return child.componentOptions.propsData;
        });
      }

      // console.log(children.map(function(d){return d.ord}));

      var canvas = el;
      var ctx = canvas.getContext('2d');

      var promises = drawFuncs.map(function(draw){
        return function(){
          return new Promise(function(resolve){
            draw(ctx, resolve);
          });
        };
      });

      var promise = promises[0]();
      for (var i = 1; i < promises.length; i++){
        promise = promise.then(promises[i]);
      }

      promise.then(function(){
        binding.value(ctx);
      })
    },
    update: function(el, binding, vnode){
      console.log("update");
      var bind = binding.def.bind;
      bind(el, binding, vnode);
    }
  });
})();