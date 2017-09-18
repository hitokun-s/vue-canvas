![license](https://img.shields.io/github/license/mashape/apistatus.svg)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

vue-canvas
===

An universal framework using vue.js, enabling **declarative markup** for canvas drawing.

## Features

**vue-canvas.js provides 'v-canvas' directive**, with these functionalities:

- orderd rendering of child component
- callback after all rendering of child components
- automatic re-rendering on vue instance updated

You must/can define child components inside canvas for your purpose.  

## Requirements

- vue.js(ver2)

## Usage

Just load vue-canvas.js, something like:  
```html
<script type="text/javascript" src="js/vue-canvas.js"></script>
```
[Demo](https://hitokun-s.github.io/tool/vue-canvas.html)

HTML:  
```html
<canvas id="canvas" v-canvas:cb="onRendered" width="600" height="400">
    <v-bg path="img/world.svg" ord="1"></v-bg><!-- sample component -->
    <v-text ord="2" x="300" y="200" :message="message"></v-text><!-- sample component -->
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
// Let's update vue instance data
setTimeout(function () {
    vc.message = "Good-bye!"; // => re-draw canvas automatically!
}, 2000);
```

Javascript(for sample components):
```javascript
// sample component to draw background image of canvas 
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

// sample component to draw message with provided coordinates
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

## How to define your child component

```javascript
Vue.component('[component name]', Vue.extend({
    props: ["ord", ["prop1", "prop2",...]],
    methods: {
        draw: function (ctx, done) {
            ...// ctx is canvas context. draw with ctx as you like here.
            done(); // please call done() at the end of drawing.
        }
    }
}));
``` 

## Licence

[MIT](https://github.com/hitokun-s/vue-canvas/blob/master/LICENCE.txt)

## Author

[hitokun-s](https://github.com/hitokun-s)
   
