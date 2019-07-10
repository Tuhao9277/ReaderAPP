<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>
<script>

import {ebookMixin} from '@/utils/mixin'
import Epub from "epubjs";

global.ePub = Epub;
export default {
  mixins:[ebookMixin],
  methods: {
    
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if(this.menuVisible){
        this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu(){
      this.setMenuVisible(false)
      this.setSettingVisible(-1) 
      this.setFontFamilyVisible(false)
    },
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`;
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      })
      this.rendition.display()
      // 手势操作实现翻页

      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        // 控制翻页
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < 0) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        event.preventDefault();
        event.stopPropagation();
      });
      this.rendition.hooks.content.register(contents=>{
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
    }
  },

  async mounted() {
    await this.setFileName(this.$route.params.filename.split("|").join("/"))
    this.initEpub()
  }
};
</script>
<style lang="scss" scoped>
</style>
