<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow':!menuVisible
      || settingVisible>=0}" v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <span class="icon-menu "  @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress " @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright " @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-silde></ebook-silde>
  </div>
</template>
<script>
import {ebookMixin} from '@/utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSilde from './EbookSlide'
export default {
  name: "menubar",
  
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSilde
  },
  data() {
    return {
      ifSettingShow: false,
      showTag: 0,
      ifShowContent: false
    };
  },

    mixins:[ebookMixin],
  methods: {
    hideContent() {
      this.ifShowContent = false;
    },
    jumpTo(target) {
      this.$emit("jumpTo", target);
    },
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    onProgressChange(progress) {
      this.$emit("onProgressChange", progress);
    },
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    showSetting(key) {
        this.setSettingVisible(key)
    },
    hideSetting() {
      this.ifSettingShow = false;
    },
    setTheme(index) {
      this.$emit("setTheme", index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 151;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }


</style>