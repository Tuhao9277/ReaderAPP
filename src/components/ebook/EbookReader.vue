<template>
  <div>
    <div class="ebook">
      <title-bar :ifTitieAndMenuShow="ifTitieAndMenuShow"></title-bar>
      <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
          <div class="left" @click="prevPage"></div>
          <div class="center" @click="toggleTitleAndMenu"></div>
          <div class="right" @click="nextPage"></div>
        </div>
      </div>
      <menu-bar
        :fontSizeList="fontSizeList"
        :bookAvailable="bookAvailable"
        :defaultFontSize="defaultFontSize"
        :themeList="themeList"
        :defaultTheme="defaultTheme"
        :navigation="navigation"
        :ifTitieAndMenuShow="ifTitieAndMenuShow"
        @onProgressChange="onProgressChange"
        @setTheme="setTheme"
        @jumpTo="jumpTo"
        @setFontSize="setFontSize"
        ref="menubar"
      ></menu-bar>
    </div>
  </div>
</template>
<script>
import Epub from "epubjs";
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";
global.ePub = Epub;
const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub";
export default {
  name: "ebook",
  data() {
    return {
      ifTitieAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#333A43"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgb(241,236,226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable:false,
      navigation:{}
    };
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    // 根据链接跳转指定位置
    jumpTo(href){
      this.rendition.display(href);
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu(){
      this.ifTitieAndMenuShow = false;
      this.$refs.menubar.hideSetting();
      this.$refs.menubar.hideContent()
    },
    // progress 进度条的数值
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    setTheme(index) {
      this.defaultTheme = index;
      this.themes.select(this.themeList[index].name);
    },
    registerName() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    showEpub() {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL);
      // 生成rendition 通过Book.renderTo
      this.rendition = this.book.renderTo("read", {
        witdh: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display();
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // this.themes.register(name,styles) 将主题注册到页面中
      this.registerName();
      this.setTheme(this.defaultTheme);
      // 获取locations对象
      // this.book.location
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation // 目录信息
          return this.book.locations.generate(); // 进度导航
        })
        .then(() => {
          this.locations = this.book.locations;
          this.bookAvailable = true
        });
    },
    prevPage() {
      // Rendition.prev
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      // Rendition.prev
      if (this.rendition) {
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      this.ifTitieAndMenuShow = !this.ifTitieAndMenuShow;
      if (!this.ifTitieAndMenuShow) {
        this.$refs.menubar.hideSetting();
      }
    }
  },
  mounted() {
   
    this.showEpub();
  }
};
</script>   
<style lang="scss" scoped>
@import "@styles/global.scss";
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .right {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
    }
  }
}
</style>
