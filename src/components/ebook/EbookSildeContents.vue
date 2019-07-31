<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          :placeholder="$t('book.searchHint')"
          type="text"
          @click="showSearchPage()"
          class="slide-contents-search-input"
        >
      </div>
      <div
        v-if="searchVisible"
        class="slide-contents-search-cancel"
        @click="hideSearchPage()"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img
          :src="cover"
          class="slide-contents-book-img"
          srcset=""
        >
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title"> {{metadata.title}} </div>
        <div class="slide-contents-book-anthor">{{metadata.creator}} </div>

      </div>
        <div class="slide-contents-book-progress-wrapper">

          <div class="slide-contents-book-progress">
            <span class="progress">{{progress + '%'}}</span>
            <span class="progress-text">{{$t('book.haveRead2')}}</span>
          </div>
          <div class="slide-contents-book-time">
            {{getReadTimeText()}}
          </div>
        </div>
    </div>

  </div>
</template>
<script>
import { ebookMixin } from '../../utils/mixin';
export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchPage() {
      this.searchVisible = true;
    },
    hideSearchPage() {
      this.searchVisible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";

.ebook-slide-contents {
  width: 100%;
  // 去除 顶部空白
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
        .icon-search {
        }
      }
      .slide-contents-search-input {
        flex: 1;
        height: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
      width:100%;
      display: flex;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
    .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
      .slide-contents-book-img {
          width: px2rem(45);
            height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
      .slide-contents-book-title {
          /* 屏幕宽度* 左侧占据 - 左右边距 - 标题边距 - 图片 - 右侧进度  */
          width:px2rem(153.75);
          font-size: px2rem(14);
        line-height: px2rem(16);
          @include ellipsis2(3);

      }
      .slide-contents-book-anthor {
          font-size: px2rem(12);
          width:px2rem(153.75);
          @include ellipsis;

      }
    }
      .slide-contents-book-progress-wrapper {
          flex: 0 0 px2rem(70);
        .slide-contents-book-progress {
          .progress {
              font-size: px2rem(14)
          }
          .progress-text {
              font-size: px2rem(12)

          }
        }
        .slide-contents-book-time {
              font-size: px2rem(12);
              margin-top: px2rem(5)
        }
      }
  }
}
</style>
