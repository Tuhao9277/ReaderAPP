# 阅读器开发原理
 Epub.js

 在DOM ContentLoaded事件中 动态设置根元素的值，
 html.style.fontSize = window.innerWidth /10 + 'px'

 
 包容性路由，排他性路由
 函数式编程（编程式导航
 
 同步隐藏问题

 目录组件化渲染

 树形结构转化为一维数组

 ```js
 function flatten(array){
     return [].concat( ...array.map(item=> [].concat(item,...flatten(item.subitems)) ))
 }
 ```

 书签算法： 监听offsetY
    epub cfi记录当前位置
    使用数组的filter方法 将书签筛选出来



  -webkit-tap-highlight-color: rgba(0,0,0,0)
  解决移动端高亮显示的问题，屏幕闪烁

      e.preventDefault() 
      解决屏幕向下滑动添加书签的滑动问题

点击事件兼容性问题
移动端 
touchmove
PC
mousemove

mixin 对组件进行解耦

正则匹配 ，提取地址信息