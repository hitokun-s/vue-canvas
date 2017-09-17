vue-canvas
===

A basic framework using vue.js, enabling **declarative markup** for canvas drawing.

# Requirements

- vue.js(ver2)

# 

# Usage

**vue-canvas.js only provides 'v-canvas' directive**, with functionalities:

- orderd rendering of child components
- callback after all rendering of child components
- automatic re-rendering on vue instance updated

You must/can define your components for your purpose.  

[Demo](https://hitokun-s.github.io/tool/vue-canvas.html)

HTML:  
```html
<canvas id="canvas" v-canvas:cb="onRendered" width="600" height="400">
    <v-bg path="img/world.svg" ord="1"></v-bg>
    <v-text ord="2" x="300" y="200" :message="message"></v-text>
</canvas>
```

Javascript(for main):  
```javascript
var vc = new Vue({
    el: '#canvas',
    data: {
      message: "Hello!"
    },
    methods: {
      onRendered: function (ctx) {
        ctx.textAlign = "start";
        ctx.fillStyle = "red";
        ctx.fillText("rendering done!", 10, 30);
      }
    }
});
// experiment
setTimeout(function () {
    vc.message = "Good-bye!";
}, 2000);
```

Javascript(for sample components):
```javascript
Vue.component('v-bg', Vue.extend({
    props: ["ord", "path"],
    methods: {
      draw: function (ctx, done) {
        var img = new Image();
        img.src = this.path;
        img.onload = function(){
          ctx.drawImage(img, 0, 0);
          done();
        }
      }
    }
}));

Vue.component('v-text', Vue.extend({
    props: ["ord", "message", "x", "y"],
    methods: {
      draw: function (ctx, done) {
        var canvas = ctx.canvas;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "bold 30pt Courier";
        ctx.fillText(this.message, parseInt(this.x), parseInt(this.y));
        done();
      }
    }
}));
``` 

Result canvas:  

![https://hitokun-s.github.io/tool/img/vue-canvas-sample.png](https://hitokun-s.github.io/tool/img/vue-canvas-sample.png)

# How to define your child component

```javascript
Vue.component('[component name]', Vue.extend({
    props: ["ord", ["prop1", "prop2",...]],
    methods: {
        draw: function (ctx, done) {
            ...(drawing using ctx(canvas context))
            done();
        }
    }
}));
```    
