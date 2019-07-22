<template>
        <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible ===1">
      
        <div class="setting-theme">
          <div
            class="setting-theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :class="{'selected':item.name === defaultTheme}"
              :style="{background:item.style.body.background}"
            ></div>
            <div class="text" 
            :class="{'selected':item.name === defaultTheme}"
            >{{item.alias}}
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>
<script>
import { ebookMixin } from './../../utils/mixin'
import { themeList } from './../../utils/book'
import { saveTheme } from '../../utils/localStorage';
export default {
    mixins:[ebookMixin],
    computed: {
        themeList(){
            return themeList(this)
        }
    },
    methods:{
        setTheme(index){
            const theme = this.themeList[index]
            this.setDefaultTheme(theme.name).then(() => {
              this.currentBook.rendition.themes.select(this.defaultTheme)
              this.initGlobalStyle()
            })

            saveTheme(this.fileName,theme.name)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";
    .setting-wrapper {
    z-index: 101;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(90);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &.first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &.last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: #fff;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.selected{
              box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15)
          }
        }
        .text {
          @include center;
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #999;
          &.selected {
            color: #333;
          }
        }
      }
    }
   
  }
</style>