<template>
    <div>
<transition name="slide-down">
        <div class="title-wrapper" v-show="ifTitieAndMenuShow">
          <div class="left">
            <span class="iconfont iconBack"></span>
          </div>
          <div class="right">
            <div class="icon-wrapper">
              <span class="iconfont iconcart"></span>
            </div>
            <div class="icon-wrapper">
              <span class="iconfont iconperson"></span>
            </div>
            <div class="icon-wrapper">
              <span class="iconfont iconmore"></span>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
export default {
    props:{
        ifTitieAndMenuShow:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";
    .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    display: flex;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
    .left {
      flex: 0 0 px2rem(60);
      @include center;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .iconcart {
          font-size: px2rem(22);
        }
      }
    }
  
  }
</style>