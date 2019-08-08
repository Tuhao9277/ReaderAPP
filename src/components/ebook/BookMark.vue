<template>
  <div class="bookmark" :style="style" ref="bookmark">

  </div>
</template>
<script>
export default {
  props:{
    width:Number,
    height:Number,
    color:String
  },
  computed:{
    style(){
      return {borderColor : `${this.color} ${this.color} transparent ${this.color}`}
    }
  },
  methods:{
    refresh(){
      if(this.height && this.width)
      this.$refs.bookmark.style.borderWidth = `${px2rem()}rem`
    }
  }
  
}
</script>
<style lang="scss" scoped>
.bookmark {
  width: 0;
  height: 0;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: white white transparent white;
}
</style>
