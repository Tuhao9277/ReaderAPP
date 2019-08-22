<template>
  <div
    class="flap-card-wrapper"
    v-show="flapCardVisible"
  >
    <div class="flap-card-bg">
      <div
        class="flap-card"
        v-for="(item, index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <div class="flap-card-circle">
          <div
            class="flap-card-semi-circle flap-card-semi-circle-left"
            :style="semiCircleStyle(item,'left')"
            ref="left"
          >

          </div>
          <div
            class="flap-card-semi-circle flap-card-semi-circle-right"
            :style="semiCircleStyle(item,'right')"
            ref="right"
          >

          </div>
        </div>
      </div>
    </div>
    <div
      class="close-btn-wrapper"
      @click="close"
    >
      <div class="icon-close"></div>
    </div>
  </div>
</template>
<script>
import { storeHomeMixin } from '../../utils/mixin';
import { flapCardList } from "./../../utils/store";
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      flapCardList,
      front: 0,
      back: 1,
      inervalTime:25
    }
  },
  watch:{
    flapCardVisible(v){
      if(v){
        this.startFlapCardAnimation()
      }
    }
  },
  methods: {
    close() {
      this.setFlapCardVisible(false)
      this.stopFlapCardAnimation()
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    rotate(index, type) {
      let dom
      const item = this.flapCardList[index]
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`
    },
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCard.rotateDegree += 10
      frontFlapCard._g -= 5
      backFlapCard.rotateDegree -= 10
      if(backFlapCard.rotateDegree < 90){
        backFlapCard._g += 5
      }
      if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
        backFlapCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      if(frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0){
        this.next()
      }
    },
    next(){
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCard.rotateDegree = 0
      backFlapCard.rotateDegree = 0
      frontFlapCard._g = frontFlapCard.g
      backFlapCard._g = backFlapCard.g
      this.rotate(this.front,'front')
      this.rotate(this.back,'back')
      this.front++
      this.back++
      const len = this.flapCardList.length
      if(this.front>= len){
        this.front = 0
      }
      if(this.back >= len){
        this.back = 0
      }
      // 100 ->96
      // 99 -> 100
      // 98 ->99
      // 97 ->98
      // 96 ->97
      this.flapCardList.forEach((item,index)=>{
        item.zIndex = 100 - ((index - this.front +len)%len)
      })
      this.prepare()
      
    },
    prepare(){
      // 设置背面，先转180，背景色
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.back,'back')
    },
    reset(){
      this.front = 0
      this.abck =1
      this.flapCardList.forEach((item,index)=>{
          item.zIndex = 100 - index
          item._g = item.g
          item.rotateDegree = 0
          this.rotate(index,'front')
          this.rotate(index,'back')
      })
    },
    startFlapCardAnimation() {
      // 进行旋转之前先做一下预处理，准备工作
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.inervalTime)
    },
    stopFlapCardAnimation(){
      if(this.task){
        clearInterval(this.task)
      }
      this.reset()
    }
  },

}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";

.flap-card-wrapper {
  @include absCenter;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  @include center;
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    border-radius: px2rem(5);
    background: white;
    .flap-card {
      width: px2rem(48);
      height: px2rem(48);
      @include absCenter;
      margin: auto;
      .flap-card-circle {
        display: flex;
        width: 100%;
        height: 100%;
        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          // 转动到背面时隐藏
          backface-visibility: hidden;
          &.flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right;
            // 改变转动轴
            transform-origin: right;
          }
          &.flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            // 改变转动轴
            transform-origin: left;
          }
        }
      }
    }
  }
}
.close-btn-wrapper {
  position: absolute;
  left: 0;
  bottom: px2rem(30);
  z-index: 1100;
  width: 100%;
  @include center;

  .icon-close {
    width: px2rem(45);
    height: px2rem(45);
    font-size: px2rem(25);
    border-radius: 50%;
    background: #333;
    color: white;
    @include center;
  }
}
</style>