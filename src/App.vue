<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
const getters ={
  a:()=>1,
  b:()=>12
}
function fn(keys){
  const data = {}
  keys.forEach(key => {
    if(getters.hasOwnProperty(key)){
      data[key]  = getters[key]
    }
  });
    return data
}
export default {
  name :'App',
  
  computed: {
    // 对映射到getters上的对象进行展开
    ...mapGetters(['test']),
    ...fn(['a','b','c'])
  },
  mounted() {
    // this.$store.dispatch('setTest',10)
    //   .then(() => {
    // console.log(this.$store.state.test)
    //     console.log(this.test)
    //   })
      console.log(this.a,this.b);
  },
}
document.addEventListener('DOMContentLoaded',()=>{
  const html = document.querySelector('html')
  let fontSize = window.innerWidth/10
  fontSize = fontSize>50?50:fontSize
  html.style.fontSize = fontSize +'px'


})

</script>
<style >

</style>

