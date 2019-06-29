import Vue from 'vue'
// 引入外部js
import './hammer.js'
// 在Windows Phone上的IE10和IE11里tap某元素时，会有一个小小的tap高亮效果，加上这个meta标签可以取消这种效果：

// <meta name="msapplication-tap-highlight" content="no" />

// 1、  Pan事件：在指定的dom区域内，一个手指放下并移动事件，即触屏中的拖动事件。这个事件在屏触开发中比较常用，如：左拖动、右拖动等，如手要上使用QQ时向右滑动出现功能菜单的效果。该事件还可以分别对以下事件进行监听并处理：

// Panstart：拖动开始、Panmove：拖动过程、Panend：拖动结束、Pancancel：拖动取消、Panleft：向左拖动、Panright：向右拖动、Panup：向上拖动、Pandown：向下拖动

// 2、  Pinch事件：在指定的dom区域内，两个手指（默认为两个手指，多指触控需要单独设置）或多个手指相对（越来越近）移动或相向（越来越远）移动时事件。该事件事以分别对以下事件进行监听并处理：

// Pinchstart：多点触控开始、Pinchmove：多点触控过程、Pinchend：多点触控结束、Pinchcancel：多点触控取消、Pinchin：多点触控时两手指距离越来越近、Pinchout：多点触控时两手指距离越来越远

// 3、  Press事件：在指定的dom区域内触屏版本的点击事件，这个事件相当于PC端的Click事件，该不能包含任何的移动，最小按压时间为500毫秒，常用于我们在手机上用的“复制、粘贴”等功能。该事件分别对以下事件进行监听并处理：

// Pressup：点击事件离开时触发

// 4、  Rotate事件：在指定的dom区域内，当两个手指或更多手指成圆型旋转时触发（就像两个手指拧螺丝一样）。该事件分别对以下事件进行监听并处理：

// Rotatestart：旋转开始、Rotatemove：旋转过程、Rotateend：旋转结束、Rotatecancel：旋转取消

// 5、  Swipe事件：在指定的dom区域内，一个手指快速的在触屏上滑动。即我们平时用到最多的滑动事件。

// Swipeleft：向左滑动、Swiperight：向右滑动、Swipeup：向上滑动、Swipedown：向下滑动

// 6、Tap事件：在指定的dom区域内，一个手指轻拍或点击时触发该事件(类似PC端的click)。该事件最大点击时间为250毫秒，如果超过250毫秒则按Press事件进行处理。
function vueTouch (el, type, binding) {
  this.el = el
  this.type = type
  this.binding = binding
  this.modifiers = binding.modifiers
  // 直接调用
  var hammertime = new Hammer(this.el)
  hammertime.on(this.type, this.binding.value)
  if (type === 'pan' && this.modifiers.move) { // 设置pan可以触发上下滑动
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL })
  }
  if (type === 'swipe' && this.modifiers.move) {
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
  }
  // el.setAttribute()
  el.addEventListener('touchend', function (e) { // 添加一个touchend阻止幽灵事件
    e.preventDefault()
    e.stopPropagation()
  }, false)
  return el
};

// 包装成指令
// addEventListener事件的第三个参数添加为false 并且 touchend事件一定要在hammerJs绑定的tap事件之后添加 否则无法解决tap点击穿透的问题
const tap = Vue.directive('tap', {
  bind: function (el, binding) {
    new vueTouch(el, 'tap', binding)
  }
})

const swipe = Vue.directive('swipe', {
  bind: function () {
    new vueTouch(el, 'swipe', binding)
  },
  modifiers: {
    move: true
  }
})
// (new Hammer(dom)).get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL}); //设置上下滑动
const swipeleft = Vue.directive('swipeleft', {
  bind: function (el, binding) {
    new vueTouch(el, 'swipeleft', binding)
  }
})

const swiperight = Vue.directive('swiperight', {
  bind: function (el, binding) {
    new vueTouch(el, 'swiperight', binding)
  }
})

const press = Vue.directive('press', {
  bind: function (el, binding) {
    new vueTouch(el, 'press', binding)
  }
})
const pan = Vue.directive('pan', {
  bind: function (el, binding) {
    new vueTouch(el, 'pan', binding)
  },
  modifiers: { // 修饰符 设置上下可滑动
    move: true
  }
})
const panmove = Vue.directive('panmove', {
  bind: function (el, binding) {
    new vueTouch(el, 'panmove', binding)
  }
})
const pressup = Vue.directive('pressup', {
  bind: function (el, binding) {
    new vueTouch(el, 'pressup', binding)
  }
})
const panend = Vue.directive('panend', {
  bind: function (el, binding) {
    new vueTouch(el, 'panend', binding)
  }
})

// 导出需要的指令
export {
  tap,
  swipe,
  swipeleft,
  swiperight,
  press,
  pressup,
  pan,
  panmove,
  panend
}
