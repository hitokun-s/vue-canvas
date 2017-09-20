(function (){

  var drawFuncs = {};

  VueCanvas = {
    draw: function(ctx, vnode, done){

      var uid = vnode.context._uid;

      var children = vnode.children;

      if(!drawFuncs[uid]){
        var children = children.filter(function(child){
          return child.componentOptions !== undefined && child.componentInstance !== undefined;
        });

        children.sort(function(child1, child2){
          return (parseInt(child1.componentOptions.propsData.ord) || 9999) - (parseInt(child2.componentOptions.propsData.ord) || 9999);
        });

        drawFuncs[uid] = children.map(function(child){
          return child.componentInstance.draw;
        });
      };

      var promises = drawFuncs[uid].map(function(draw){
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
      promise.then(done);
    }
  };

  Vue.directive('canvas', {
    bind: function (el, binding, vnode) {

      console.log("bind");
      console.log(vnode.children);

      var canvas = el;
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0,0,canvas.width, canvas.height);

      VueCanvas.draw(ctx, vnode, function(){
        binding.value ? binding.value(ctx) : null;
      });
    },

    update: function(el, binding, vnode){
      console.log("update");
      var bind = binding.def.bind;
      bind(el, binding, vnode);
    }
  });

})();